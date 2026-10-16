from pydantic import BaseModel


class ProfileCreate(BaseModel):

    date_of_birth: str

    height: float

    weight: float

    blood_group: str

    medical_history: str

    allergies: str

    menstrual_status: str

    pregnancy_status: str