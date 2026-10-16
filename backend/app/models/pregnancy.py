from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Text, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class PregnancyRecord(Base):
    __tablename__ = "pregnancy_records"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    # Pregnancy information
    pregnancy_status = Column(
        String(30),
        nullable=False
    )

    pregnancy_week = Column(
        Integer,
        nullable=True
    )

    due_date = Column(
        Date,
        nullable=True
    )

    # Postpartum information
    postpartum_status = Column(
        String(30),
        nullable=True
    )

    postpartum_week = Column(
        Integer,
        nullable=True
    )

    postpartum_mood = Column(
        Integer,
        nullable=True
    )

    # General wellbeing
    wellbeing_notes = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )