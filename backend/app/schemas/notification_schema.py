from pydantic import BaseModel
from datetime import datetime


class NotificationCreate(BaseModel):
    title: str
    message: str
    notification_type: str = "general"


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    notification_type: str
    is_read: bool
    created_at: datetime

    model_config = {
        "from_attributes": True
    }