from datetime import datetime
import json
from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import Field
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.mental_wellness import MentalWellnessAssessment
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/mental-wellness",
    tags=["Mental Wellness"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# SCORE INTERPRETATION
# --------------------------------------------------

def interpret_score(
    assessment_type: str,
    score: int
):
    if assessment_type == "PHQ9":

        if score <= 4:
            return "Minimal awareness level"
        elif score <= 9:
            return "Mild awareness level"
        elif score <= 14:
            return "Moderate awareness level"
        elif score <= 19:
            return "Moderately high awareness level"
        else:
            return "High awareness level"

    if assessment_type == "GAD7":

        if score <= 4:
            return "Minimal awareness level"
        elif score <= 9:
            return "Mild awareness level"
        elif score <= 14:
            return "Moderate awareness level"
        else:
            return "High awareness level"

    if assessment_type == "EPDS":

        if score <= 9:
            return "Lower awareness range"
        elif score <= 12:
            return "Possible concern range"
        else:
            return "Higher awareness range"

    return "Unknown"


# --------------------------------------------------
# SAVE ASSESSMENT
# --------------------------------------------------

@router.post("/assessment")
def save_assessment(
    assessment_type: str,
    answers: list[Annotated[
        int,
        Field(
            ge=0,
            le=3,
            description=(
                "Answer score from the displayed questionnaire options "
                "(0-3)."
            ),
        ),
    ]],
    current_user=Depends(get_current_patient),
    db: Session = Depends(get_db)
):

    assessment_type = assessment_type.upper()

    # Supported assessments
    if assessment_type not in ["PHQ9", "GAD7", "EPDS"]:
        return {
            "success": False,
            "message": "Invalid assessment type."
        }

    # Expected question counts
    expected_questions = {
        "PHQ9": 9,
        "GAD7": 7,
        "EPDS": 10
    }

    if len(answers) != expected_questions[assessment_type]:
        return {
            "success": False,
            "message": (
                f"{assessment_type} requires "
                f"{expected_questions[assessment_type]} answers."
            )
        }

    # Prevent invalid scores
    if any(answer < 0 for answer in answers):
        return {
            "success": False,
            "message": "Answers cannot be negative."
        }

    score = sum(answers)

    interpretation = interpret_score(
        assessment_type,
        score
    )

    assessment = MentalWellnessAssessment(
        user_id=current_user.id,
        assessment_type=assessment_type,
        score=score,
        interpretation=interpretation,
        answers=json.dumps(answers)
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return {
        "success": True,
        "message": "Mental wellness assessment saved.",
        "assessment": {
            "id": assessment.id,
            "assessment_type": assessment.assessment_type,
            "score": assessment.score,
            "interpretation": assessment.interpretation,
            "created_at": assessment.created_at
        },
        "disclaimer": (
            "This self-assessment is for awareness only "
            "and is not a medical diagnosis."
        )
    }


# --------------------------------------------------
# ASSESSMENT HISTORY
# --------------------------------------------------

@router.get("/history")
def get_assessment_history(
    current_user=Depends(get_current_patient),
    db: Session = Depends(get_db)
):

    assessments = (
        db.query(MentalWellnessAssessment)
        .filter(
            MentalWellnessAssessment.user_id
            == current_user.id
        )
        .order_by(
            MentalWellnessAssessment.created_at.desc()
        )
        .all()
    )

    return [
        {
            "id": assessment.id,
            "assessment_type": assessment.assessment_type,
            "score": assessment.score,
            "interpretation": assessment.interpretation,
            "created_at": assessment.created_at
        }
        for assessment in assessments
    ]