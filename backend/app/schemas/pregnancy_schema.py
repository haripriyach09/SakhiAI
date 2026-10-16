from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class PregnancyCreate(BaseModel):
    pregnancy_status: str
    pregnancy_week: Optional[int] = None
    due_date: Optional[date] = None

    postpartum_status: Optional[str] = None
    postpartum_week: Optional[int] = None
    postpartum_mood: Optional[int] = None

    wellbeing_notes: Optional[str] = None


class PregnancyResponse(BaseModel):
    id: int
    user_id: int

    pregnancy_status: str
    pregnancy_week: Optional[int]
    due_date: Optional[date]

    postpartum_status: Optional[str]
    postpartum_week: Optional[int]
    postpartum_mood: Optional[int]

    wellbeing_notes: Optional[str]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True