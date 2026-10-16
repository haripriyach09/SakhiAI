from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime

from app.database.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    message = Column(
        String(500),
        nullable=False
    )

    notification_type = Column(
        String(50),
        nullable=False,
        default="general"
    )

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )