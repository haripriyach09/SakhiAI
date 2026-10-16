from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.models.notification_model import Notification
from app.utils.auth_dependency import get_current_patient

from app.models.menstrual_model import MenstrualCycle


router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/generate")
def generate_reminders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    cycle = (
        db.query(MenstrualCycle)
        .filter(
            MenstrualCycle.user_id == current_user.id
        )
        .order_by(
            MenstrualCycle.period_start.desc()
        )
        .first()
    )

    if not cycle:
        return {
            "message": "No menstrual data available.",
            "created": 0
        }

    created = 0

    # Example reminder based on cycle information
    if cycle.cycle_length:

        existing = (
            db.query(Notification)
            .filter(
                Notification.user_id == current_user.id,
                Notification.notification_type == "period"
            )
            .first()
        )

        if not existing:

            notification = Notification(
                user_id=current_user.id,
                title="🌸 Cycle Reminder",
                message=(
                    "Your menstrual cycle is being tracked. "
                    "Continue recording your cycle data for "
                    "better predictions."
                ),
                notification_type="period"
            )

            db.add(notification)
            created += 1

    db.commit()

    return {
        "message": "Reminders generated successfully.",
        "created": created
    }