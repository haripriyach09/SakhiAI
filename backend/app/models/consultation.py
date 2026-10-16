from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class Consultation(Base):
    __tablename__ = "consultations"

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

    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id"),
        nullable=False
    )

    reason = Column(
        String(500),
        nullable=False
    )

    status = Column(
        String(30),
        default="Pending",
        nullable=False
    )
    
    doctor_notes = Column(
        Text,
        nullable=True
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )