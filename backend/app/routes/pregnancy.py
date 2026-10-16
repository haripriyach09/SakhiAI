from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.pregnancy import PregnancyRecord
from app.schemas.pregnancy_schema import PregnancyCreate
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/pregnancy",
    tags=["Pregnancy & Postpartum"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# SAVE PREGNANCY / POSTPARTUM RECORD
# --------------------------------------------------

@router.post("/record")
def save_pregnancy_record(
    data: PregnancyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):

    record = PregnancyRecord(
        user_id=current_user.id,

        pregnancy_status=data.pregnancy_status,
        pregnancy_week=data.pregnancy_week,
        due_date=data.due_date,

        postpartum_status=data.postpartum_status,
        postpartum_week=data.postpartum_week,
        postpartum_mood=data.postpartum_mood,

        wellbeing_notes=data.wellbeing_notes
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "message": "Pregnancy and postpartum record saved successfully",
        "id": record.id
    }


# --------------------------------------------------
# GET USER HISTORY
# --------------------------------------------------

@router.get("/history")
def get_pregnancy_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):

    records = (
        db.query(PregnancyRecord)
        .filter(
            PregnancyRecord.user_id == current_user.id
        )
        .order_by(
            PregnancyRecord.created_at.desc()
        )
        .all()
    )

    return records


# --------------------------------------------------
# GET LATEST RECORD
# --------------------------------------------------

@router.get("/latest")
def get_latest_pregnancy_record(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):

    record = (
        db.query(PregnancyRecord)
        .filter(
            PregnancyRecord.user_id == current_user.id
        )
        .order_by(
            PregnancyRecord.created_at.desc()
        )
        .first()
    )

    if not record:
        return {
            "data_available": False,
            "message": "No pregnancy or postpartum record found."
        }

    return {
        "data_available": True,
        "record": record
    }