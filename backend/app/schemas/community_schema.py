from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class CommunityPostCreate(BaseModel):
    content: str = Field(
        ...,
        min_length=1,
        max_length=1000
    )

    category: str = Field(
        default="General Support",
        max_length=50
    )

    is_anonymous: bool = True


class CommunityPostResponse(BaseModel):
    id: int
    content: str
    category: str
    is_anonymous: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CommunityReportCreate(BaseModel):
    reason: str = Field(
        ...,
        min_length=1,
        max_length=100
    )