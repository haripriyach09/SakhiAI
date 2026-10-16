from pydantic import BaseModel, EmailStr


class DoctorRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    specialization: str
    hospital: str | None = None
    experience_years: int | None = None
    phone: str | None = None
    bio: str | None = None


class DoctorLogin(BaseModel):
    email: EmailStr
    password: str


class DoctorCreate(BaseModel):
    full_name: str
    email: EmailStr
    specialization: str
    hospital: str | None = None
    experience_years: int | None = None
    phone: str | None = None
    bio: str | None = None


class DoctorResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    specialization: str
    hospital: str | None = None
    experience_years: int | None = None
    phone: str | None = None
    bio: str | None = None

    model_config = {
        "from_attributes": True
    }