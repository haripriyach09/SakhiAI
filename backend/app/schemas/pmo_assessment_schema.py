from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PMOSAssessmentResponse(BaseModel):
    id: int
    user_id: int
    score: int
    risk_level: str
    contributing_features: Optional[str] = None
    explanation: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True