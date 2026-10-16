from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.pmo_assessment import PMOSAssessment
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/prediction",
    tags=["PMOS History"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/pmo-history")
def get_pmo_history(
    current_user=Depends(get_current_patient),
    db: Session = Depends(get_db)
):

    assessments = (
        db.query(PMOSAssessment)
        .filter(
            PMOSAssessment.user_id == current_user.id
        )
        .order_by(
            PMOSAssessment.created_at.desc()
        )
        .all()
    )

    return assessments