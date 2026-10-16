from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class PMOSAssessment(Base):
    __tablename__ = "pmo_assessments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    score = Column(
        Integer,
        nullable=False
    )

    risk_level = Column(
        String(30),
        nullable=False
    )

    contributing_features = Column(
        Text,
        nullable=True
    )

    explanation = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )