import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.health_tracking import HealthTracking
from app.models.pmo_assessment import PMOSAssessment
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/prediction",
    tags=["AI Prediction"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/pmo-risk")
def calculate_pmo_risk(
    current_user=Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    return _calculate_pmo_risk(current_user, db, persist=False)


@router.post("/pmo-risk")
def create_pmo_assessment(
    current_user=Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    return _calculate_pmo_risk(current_user, db, persist=True)


def _calculate_pmo_risk(current_user, db: Session, persist: bool):

    # ==================================================
    # GET LATEST HEALTH RECORD
    # ==================================================

    record = (
        db.query(HealthTracking)
        .filter(
            HealthTracking.user_id == current_user.id
        )
        .order_by(
            HealthTracking.id.desc()
        )
        .first()
    )


    # ==================================================
    # NO HEALTH DATA
    # ==================================================

    if not record:

        return {
            "risk_percentage": 0,
            "risk_level": "No Data",
            "contributing_factors": [],
            "explanation": (
                "There is not enough recorded wellness "
                "information to calculate an awareness score."
            ),
            "message": (
                "Please record your health information first."
            )
        }


    # ==================================================
    # SCORE + FACTORS
    # ==================================================

    score = 0

    contributing_factors = []


    # ==================================================
    # MOOD
    # ==================================================

    if record.mood is not None:

        if record.mood <= 2:

            contribution = 30

            score += contribution

            contributing_factors.append({
                "factor": "Mood",
                "value": f"{record.mood} / 5",
                "contribution": contribution,
                "impact": "High",
                "explanation": (
                    "Your recorded mood rating is relatively "
                    "low and contributes more strongly to the "
                    "current awareness score."
                )
            })

        elif record.mood == 3:

            contribution = 15

            score += contribution

            contributing_factors.append({
                "factor": "Mood",
                "value": f"{record.mood} / 5",
                "contribution": contribution,
                "impact": "Medium",
                "explanation": (
                    "Your recorded mood is around the middle "
                    "of the selected scale and contributes "
                    "moderately to the awareness score."
                )
            })


    # ==================================================
    # SLEEP
    # ==================================================

    if record.sleep_hours is not None:

        if record.sleep_hours < 6:

            contribution = 30

            score += contribution

            contributing_factors.append({
                "factor": "Sleep",
                "value": f"{record.sleep_hours} hours",
                "contribution": contribution,
                "impact": "High",
                "explanation": (
                    "Your recorded sleep duration is below "
                    "6 hours and contributes strongly to the "
                    "current awareness score."
                )
            })

        elif record.sleep_hours < 7:

            contribution = 15

            score += contribution

            contributing_factors.append({
                "factor": "Sleep",
                "value": f"{record.sleep_hours} hours",
                "contribution": contribution,
                "impact": "Medium",
                "explanation": (
                    "Your recorded sleep duration is below "
                    "7 hours and contributes moderately to "
                    "the current awareness score."
                )
            })


    # ==================================================
    # ACTIVITY
    # ==================================================

    if record.activity_level:

        activity = record.activity_level.lower()

        if activity == "low":

            contribution = 20

            score += contribution

            contributing_factors.append({
                "factor": "Activity",
                "value": record.activity_level,
                "contribution": contribution,
                "impact": "Medium",
                "explanation": (
                    "Your recorded activity level is low "
                    "and contributes to the awareness score."
                )
            })


    # ==================================================
    # CYCLE
    # ==================================================

    if record.cycle_day is not None:

        if record.cycle_day >= 21:

            contribution = 20

            score += contribution

            contributing_factors.append({
                "factor": "Cycle",
                "value": f"Day {record.cycle_day}",
                "contribution": contribution,
                "impact": "Medium",
                "explanation": (
                    "The recorded cycle day is 21 or later "
                    "and contributes to the current awareness "
                    "score."
                )
            })


    # ==================================================
    # LIMIT SCORE
    # ==================================================

    score = min(score, 100)


    # ==================================================
    # DETERMINE AWARENESS LEVEL
    # ==================================================

    if score >= 70:

        risk_level = "High"

    elif score >= 40:

        risk_level = "Moderate"

    else:

        risk_level = "Low"


    # ==================================================
    # GENERATE HUMAN-READABLE EXPLANATION
    # ==================================================

    if contributing_factors:

        factor_names = ", ".join(
            factor["factor"]
            for factor in contributing_factors
        )

        explanation = (
            f"The current awareness score is based on "
            f"your latest recorded wellness information. "
            f"The factors contributing to this score are: "
            f"{factor_names}. Each factor contributes a "
            f"predefined amount according to the current "
            f"transparent awareness rules."
        )

    else:

        explanation = (
            "None of the currently recorded wellness "
            "factors added points to the awareness score."
        )

    if persist:
        assessment = PMOSAssessment(
            user_id=current_user.id,
            score=score,
            risk_level=risk_level,
            contributing_features=json.dumps(
                contributing_factors
            ),
            explanation=explanation
        )

        db.add(assessment)
        db.commit()
        db.refresh(assessment)
    
    # ==================================================
    # RESPONSE
    # ==================================================

    return {

        "risk_percentage": score,

        "risk_level": risk_level,

        "contributing_factors":
            contributing_factors,

        "explanation":
            explanation,

        "message": (
            "This is an informational wellness estimate "
            "and not a medical diagnosis."
        )
    }