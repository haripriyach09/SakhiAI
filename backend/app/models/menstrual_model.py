from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.database.database import Base


class MenstrualCycle(Base):

    __tablename__ = "menstrual_cycles"


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


    period_start = Column(
        Date,
        nullable=False
    )


    period_end = Column(
        Date
    )


    cycle_length = Column(
        Integer
    )


    symptoms = Column(
        String(500)
    )


    flow_level = Column(
        String(50)
    )