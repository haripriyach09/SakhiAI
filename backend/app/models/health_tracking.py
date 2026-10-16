from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class HealthTracking(Base):
    __tablename__ = "health_tracking"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    cycle_day = Column(Integer, nullable=True)

    mood = Column(Integer, nullable=True)

    sleep_hours = Column(Float, nullable=True)

    activity_level = Column(String(30), nullable=True)

    tracking_date = Column(
        Date,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )