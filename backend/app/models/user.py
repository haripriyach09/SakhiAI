from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, index=True)

    password = Column(String(255), nullable=False)

    age = Column(Integer)

    language = Column(String(30), default="English")

    life_stage = Column(String(50))

    created_at = Column(DateTime(timezone=True), server_default=func.now())