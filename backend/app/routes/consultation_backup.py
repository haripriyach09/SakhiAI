from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.consultation import Consultation
from app.models.doctor import Doctor
from app.models.user import User
from app.schemas.consultation_schema import (
    ConsultationCreate,
    ConsultationResponse
)
from app.utils.auth_dependency import get_current_user


router = APIRouter(
    prefix="/consultation",
    tags=["Consultation"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "/request",
    response_model=ConsultationResponse
)
def request_consultation(
    consultation_data: ConsultationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    doctor = db.query(Doctor).filter(
        Doctor.id == consultation_data.doctor_id
    ).first()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    consultation = Consultation(
        patient_id=current_user.id,
        doctor_id=consultation_data.doctor_id,
        reason=consultation_data.reason,
        status="Pending"
    )

    db.add(consultation)
    db.commit()
    db.refresh(consultation)

    return consultation


@router.get(
    "/my-requests",
    response_model=list[ConsultationResponse]
)
def get_my_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    requests = db.query(Consultation).filter(
        Consultation.patient_id == current_user.id
    ).order_by(
        Consultation.id.desc()
    ).all()

    return requests


@router.put("/{consultation_id}/cancel")
def cancel_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    consultation = db.query(Consultation).filter(
        Consultation.id == consultation_id,
        Consultation.patient_id == current_user.id
    ).first()

    if not consultation:
        raise HTTPException(
            status_code=404,
            detail="Consultation not found"
        )

    if consultation.status != "Pending":
        raise HTTPException(
            status_code=400,
            detail="Only pending consultations can be cancelled"
        )

    consultation.status = "Cancelled"

    db.commit()

    return {
        "message": "Consultation cancelled successfully"
    }