from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.doctor import Doctor
from app.models.user import User
from app.schemas.doctor_schema import (
    DoctorRegister,
    DoctorLogin,
    DoctorResponse,
)
from app.utils.auth_dependency import get_current_user
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token


router = APIRouter(
    prefix="/doctor",
    tags=["Doctor"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================
# DOCTOR REGISTER
# ============================================================

@router.post("/register")
def register_doctor(
    doctor_data: DoctorRegister,
    db: Session = Depends(get_db)
):
    existing_doctor = (
        db.query(Doctor)
        .filter(Doctor.email == doctor_data.email)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=400,
            detail="Doctor email already registered"
        )

    existing_user = (
        db.query(User)
        .filter(User.email == doctor_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered for a patient"
        )

    doctor = Doctor(
        full_name=doctor_data.full_name,
        email=doctor_data.email,
        password=hash_password(doctor_data.password),
        specialization=doctor_data.specialization,
        hospital=doctor_data.hospital,
        experience_years=doctor_data.experience_years,
        phone=doctor_data.phone,
        bio=doctor_data.bio,
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor registration successful",
        "doctor_id": doctor.id
    }


# ============================================================
# DOCTOR LOGIN
# ============================================================

@router.post("/login")
def login_doctor(
    login_data: DoctorLogin,
    db: Session = Depends(get_db)
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.email == login_data.email)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=401,
            detail="Invalid doctor email or password"
        )

    if not verify_password(
        login_data.password,
        doctor.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid doctor email or password"
        )

    try:
        token = create_access_token({
            "doctor_id": doctor.id,
            "email": doctor.email,
            "role": "doctor"
        })
    except RuntimeError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error)
        ) from error

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "doctor"
    }


# ============================================================
# GET ALL DOCTORS
# ============================================================

@router.get(
    "/list",
    response_model=list[DoctorResponse]
)
def get_doctors(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(Doctor).all()


# ============================================================
# GET SINGLE DOCTOR
# ============================================================

@router.get(
    "/{doctor_id}",
    response_model=DoctorResponse
)
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return doctor