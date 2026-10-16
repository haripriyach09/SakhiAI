from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class MentalWellnessAssessment(Base):
    __tablename__ = "mental_wellness_assessments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    assessment_type = Column(
        String(30),
        nullable=False
    )
    # PHQ9, GAD7, or EPDS

    score = Column(
        Integer,
        nullable=False
    )

    interpretation = Column(
        String(100),
        nullable=False
    )

    answers = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )