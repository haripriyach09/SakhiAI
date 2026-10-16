from pydantic import BaseModel
from datetime import date


class MenstrualCreate(BaseModel):
    period_start: date
    period_end: date | None = None
    cycle_length: int | None = None
    symptoms: str | None = None
    flow_level: str | None = None


class MenstrualResponse(BaseModel):
    id: int
    user_id: int
    period_start: date
    period_end: date | None = None
    cycle_length: int | None = None
    symptoms: str | None = None
    flow_level: str | None = None

    model_config = {
        "from_attributes": True
    }