from pydantic import BaseModel, Field


class MenstrualAIDay(BaseModel):
    lh: float | None = None
    estrogen: float | None = None
    pdg: float | None = None
    overall_score: float | None = None
    deep_sleep_in_minutes: float | None = None
    resting_hr_daily: float | None = None
    restlessness: float | None = None
    stress_score: float | None = None

    exerciselevel: float | None = None
    moodswing: float | None = None
    fatigue: float | None = None
    cramps: float | None = None
    headaches: float | None = None
    sleepissue: float | None = None
    foodcravings: float | None = None
    bloating: float | None = None


class MenstrualAIPredictionRequest(BaseModel):
    days: list[MenstrualAIDay] = Field(
        ...,
        min_length=7,
        max_length=7,
        description="Exactly seven chronological daily observations."
    )