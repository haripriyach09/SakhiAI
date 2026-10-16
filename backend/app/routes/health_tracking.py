from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.health_tracking import HealthTracking
from app.schemas.health_tracking_schema import HealthTrackingCreate
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/health",
    tags=["Health Tracking"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/tracking")
def save_health_tracking(
    data: HealthTrackingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):
    tracking = HealthTracking(
        user_id=current_user.id,
        cycle_day=data.cycle_day,
        mood=data.mood,
        sleep_hours=data.sleep_hours,
        activity_level=data.activity_level,
        tracking_date=date.today()
    )

    db.add(tracking)
    db.commit()
    db.refresh(tracking)

    return {
        "message": "Health data saved successfully",
        "id": tracking.id
    }
@router.get("/tracking")
def get_health_tracking(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_patient)
):
    records = (
        db.query(HealthTracking)
        .filter(HealthTracking.user_id == current_user.id)
        .order_by(HealthTracking.tracking_date.desc())
        .all()
    )

    return records