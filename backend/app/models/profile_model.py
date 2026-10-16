from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.database import Base


class Profile(Base):

    __tablename__ = "profiles"

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

    date_of_birth = Column(String(20))

    height = Column(Float)

    weight = Column(Float)

    blood_group = Column(String(10))

    medical_history = Column(String(500))

    allergies = Column(String(500))

    menstrual_status = Column(String(100))

    pregnancy_status = Column(String(100))