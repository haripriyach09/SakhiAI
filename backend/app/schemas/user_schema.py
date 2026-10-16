from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    age: int
    language: str
    life_stage: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str