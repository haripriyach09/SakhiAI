from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class HealthTrackingCreate(BaseModel):
    cycle_day: Optional[int] = Field(
        default=None,
        ge=1,
        le=45,
        description="Cycle day, matching the tracking form's 1-45 range.",
    )
    mood: Optional[int] = Field(
        default=None,
        ge=1,
        le=5,
        description="Mood rating on the tracking form's 1-5 scale.",
    )
    sleep_hours: Optional[float] = Field(
        default=None,
        ge=0,
        le=24,
        multiple_of=0.5,
        description=(
            "Sleep duration in hours, from 0 to 24 in 0.5-hour increments."
        ),
    )
    activity_level: Optional[str] = None


class HealthTrackingResponse(BaseModel):
    id: int
    user_id: int
    cycle_day: Optional[int]
    mood: Optional[int]
    sleep_hours: Optional[float]
    activity_level: Optional[str]
    tracking_date: date

    class Config:
        from_attributes = True