from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.notification_model import Notification
from app.models.user import User
from app.schemas.notification_schema import (
    NotificationCreate,
    NotificationResponse
)
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Get all notifications
@router.get(
    "/",
    response_model=list[NotificationResponse]
)
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id
        )
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications


# Create notification
@router.post("/create")
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    new_notification = Notification(
        user_id=current_user.id,
        title=notification.title,
        message=notification.message,
        notification_type=notification.notification_type
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)

    return {
        "message": "Notification created successfully",
        "notification_id": new_notification.id
    }


# Mark notification as read
@router.put("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == current_user.id
        )
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = True

    db.commit()

    return {
        "message": "Notification marked as read"
    }


# Delete notification
@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == current_user.id
        )
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    db.delete(notification)
    db.commit()

    return {
        "message": "Notification deleted successfully"
    }