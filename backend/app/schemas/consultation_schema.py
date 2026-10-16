from pydantic import BaseModel
from datetime import datetime


class ConsultationCreate(BaseModel):
    doctor_id: int
    reason: str


class ConsultationStatusUpdate(BaseModel):
    status: str

class ConsultationNotesUpdate(BaseModel):
    doctor_notes: str
    
class ConsultationResponse(BaseModel):
    id: int
    user_id: int
    patient_name: str | None = None
    doctor_id: int
    reason: str
    status: str
    doctor_notes: str | None = None
    created_at: datetime | None = None

    model_config = {
        "from_attributes": True
    }