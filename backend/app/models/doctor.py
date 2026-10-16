from sqlalchemy import Column, Integer, String, Text
from app.database.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        unique=True,
        index=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=False
    )

    specialization = Column(
        String(100),
        nullable=False
    )

    hospital = Column(
        String(150),
        nullable=True
    )

    experience_years = Column(
        Integer,
        nullable=True
    )

    phone = Column(
        String(20),
        nullable=True
    )

    bio = Column(
        Text,
        nullable=True
    )