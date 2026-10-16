from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.consultation import Consultation
from app.models.doctor import Doctor
from app.models.user import User
from app.models.notification_model import Notification
from app.models.health_tracking import HealthTracking
from app.models.menstrual_model import MenstrualCycle
from app.models.pregnancy import PregnancyRecord
from app.models.mental_wellness import MentalWellnessAssessment
from app.models.pmo_assessment import PMOSAssessment
from app.routes.insights import build_today_insights

from app.schemas.consultation_schema import (
    ConsultationCreate,
    ConsultationResponse,
    ConsultationStatusUpdate,
    ConsultationNotesUpdate,
)

from app.utils.auth_dependency import (
    get_current_doctor,
    get_current_patient,
)


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


# ============================================================
# PATIENT - SEND CONSULTATION REQUEST
# ============================================================

@router.post(
    "/request",
    response_model=ConsultationResponse
)
def request_consultation(
    consultation_data: ConsultationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == consultation_data.doctor_id
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    consultation = Consultation(
        user_id=current_user.id,
        doctor_id=consultation_data.doctor_id,
        reason=consultation_data.reason,
        status="Pending"
    )

    db.add(consultation)
    db.commit()
    db.refresh(consultation)

    return consultation


# ============================================================
# PATIENT - MY CONSULTATION REQUESTS
# ============================================================

@router.get(
    "/my-requests",
    response_model=list[ConsultationResponse]
)
def my_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    requests = (
        db.query(Consultation, User.full_name)
        .join(
            User,
            User.id == Consultation.user_id
        )
        .filter(
            Consultation.user_id == current_user.id
        )
        .order_by(
            Consultation.id.desc()
        )
        .all()
    )

    return [
        {
            "id": consultation.id,
            "user_id": consultation.user_id,
            "patient_name": full_name,
            "doctor_id": consultation.doctor_id,
            "reason": consultation.reason,
            "status": consultation.status,
            "doctor_notes": consultation.doctor_notes,
            "created_at": consultation.created_at,
        }
        for consultation, full_name in requests
    ]


# ============================================================
# PATIENT - CANCEL CONSULTATION
# ============================================================

@router.put(
    "/{consultation_id}/cancel"
)
def cancel_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    consultation = (
        db.query(Consultation)
        .filter(
            Consultation.id == consultation_id,
            Consultation.user_id == current_user.id
        )
        .first()
    )

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


# ============================================================
# DOCTOR - GET INCOMING REQUESTS
# ============================================================

@router.get(
    "/doctor-requests",
    response_model=list[ConsultationResponse]
)
def doctor_requests(
    db: Session = Depends(get_db),
    current_user: Doctor = Depends(get_current_doctor)
):

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == current_user.id
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=403,
            detail="Doctor profile not found"
        )

    requests = (
        db.query(Consultation, User.full_name)
        .join(
            User,
            User.id == Consultation.user_id
        )
        .filter(
            Consultation.doctor_id == doctor.id
        )
        .order_by(
            Consultation.id.desc()
        )
        .all()
    )

    return [
        {
            "id": consultation.id,
            "user_id": consultation.user_id,
            "patient_name": patient_name,
            "doctor_id": consultation.doctor_id,
            "reason": consultation.reason,
            "status": consultation.status,
            "doctor_notes": consultation.doctor_notes,
            "created_at": consultation.created_at,
        }
        for consultation, patient_name in requests
    ]


@router.get("/doctor/{consultation_id}/patient-report")
def doctor_patient_report(
    consultation_id: int,
    db: Session = Depends(get_db),
    current_user: Doctor = Depends(get_current_doctor)
):
    consultation = (
        db.query(Consultation)
        .filter(
            Consultation.id == consultation_id,
            Consultation.doctor_id == current_user.id
        )
        .first()
    )

    if not consultation:
        raise HTTPException(
            status_code=404,
            detail="Consultation request not found"
        )

    patient = (
        db.query(User)
        .filter(User.id == consultation.user_id)
        .first()
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    health_records = (
        db.query(HealthTracking)
        .filter(HealthTracking.user_id == patient.id)
        .order_by(HealthTracking.tracking_date.asc())
        .all()
    )
    menstrual_records = (
        db.query(MenstrualCycle)
        .filter(MenstrualCycle.user_id == patient.id)
        .order_by(MenstrualCycle.period_start.asc())
        .all()
    )
    pregnancy_records = (
        db.query(PregnancyRecord)
        .filter(PregnancyRecord.user_id == patient.id)
        .order_by(PregnancyRecord.created_at.asc())
        .all()
    )
    mental_assessments = (
        db.query(MentalWellnessAssessment)
        .filter(MentalWellnessAssessment.user_id == patient.id)
        .order_by(MentalWellnessAssessment.created_at.asc())
        .all()
    )
    pmos_assessments = (
        db.query(PMOSAssessment)
        .filter(PMOSAssessment.user_id == patient.id)
        .order_by(PMOSAssessment.created_at.asc())
        .all()
    )

    return {
        "patient": {
            "id": patient.id,
            "full_name": patient.full_name,
            "age": patient.age,
            "life_stage": patient.life_stage
        },
        "consultation": {
            "id": consultation.id,
            "reason": consultation.reason,
            "status": consultation.status,
            "doctor_notes": consultation.doctor_notes,
            "created_at": consultation.created_at
        },
        "health_tracking": [
            {
                "tracking_date": record.tracking_date,
                "cycle_day": record.cycle_day,
                "mood": record.mood,
                "sleep_hours": record.sleep_hours,
                "activity_level": record.activity_level
            }
            for record in health_records
        ],
        "menstrual_history": [
            {
                "period_start": record.period_start,
                "period_end": record.period_end,
                "cycle_length": record.cycle_length,
                "symptoms": record.symptoms,
                "flow_level": record.flow_level
            }
            for record in menstrual_records
        ],
        "pregnancy_history": [
            {
                "pregnancy_status": record.pregnancy_status,
                "pregnancy_week": record.pregnancy_week,
                "due_date": record.due_date,
                "postpartum_status": record.postpartum_status,
                "postpartum_week": record.postpartum_week,
                "postpartum_mood": record.postpartum_mood,
                "wellbeing_notes": record.wellbeing_notes,
                "created_at": record.created_at
            }
            for record in pregnancy_records
        ],
        "mental_wellness_history": [
            {
                "assessment_type": record.assessment_type,
                "score": record.score,
                "interpretation": record.interpretation,
                "created_at": record.created_at
            }
            for record in mental_assessments
        ],
        "pmos_history": [
            {
                "score": record.score,
                "risk_level": record.risk_level,
                "explanation": record.explanation,
                "created_at": record.created_at
            }
            for record in pmos_assessments
        ],
        "health_insights": {
            "insights": build_today_insights(db, patient.id).get(
                "insights",
                []
            )
        },
        "period": {
            "start": (
                health_records[0].tracking_date
                if health_records
                else None
            ),
            "end": (
                health_records[-1].tracking_date
                if health_records
                else None
            )
        }
    }


# ============================================================
# DOCTOR - UPDATE REQUEST STATUS
# ============================================================

@router.put(
    "/doctor/{consultation_id}/status",
    response_model=ConsultationResponse
)
def update_status(
    consultation_id: int,
    status_data: ConsultationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: Doctor = Depends(get_current_doctor)
):

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == current_user.id
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=403,
            detail="Doctor profile not found"
        )

    consultation = (
        db.query(Consultation)
        .filter(
            Consultation.id == consultation_id,
            Consultation.doctor_id == doctor.id
        )
        .first()
    )

    if not consultation:
        raise HTTPException(
            status_code=404,
            detail="Consultation request not found"
        )

    allowed_statuses = {
        "Pending",
        "Accepted",
        "Completed",
        "Cancelled"
    }

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid consultation status"
        )

    allowed_transitions = {
        "Pending": {"Accepted", "Cancelled"},
        "Accepted": {"Completed"},
    }

    if status_data.status not in allowed_transitions.get(
        consultation.status,
        set()
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                f"Cannot change consultation status from "
                f"{consultation.status} to {status_data.status}"
            )
        )

    consultation.status = status_data.status

    db.commit()
    db.refresh(consultation)

    return consultation


# ============================================================
# DOCTOR - UPDATE CONSULTATION NOTES
# AND NOTIFY THE PATIENT
# ============================================================

@router.put(
    "/doctor/{consultation_id}/notes",
    response_model=ConsultationResponse
)
def update_notes(
    consultation_id: int,
    notes_data: ConsultationNotesUpdate,
    db: Session = Depends(get_db),
    current_user: Doctor = Depends(get_current_doctor)
):

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == current_user.id
        )
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=403,
            detail="Doctor profile not found"
        )

    consultation = (
        db.query(Consultation)
        .filter(
            Consultation.id == consultation_id,
            Consultation.doctor_id == doctor.id
        )
        .first()
    )

    if not consultation:
        raise HTTPException(
            status_code=404,
            detail="Consultation request not found"
        )

    notes_changed = notes_data.doctor_notes != consultation.doctor_notes
    consultation.doctor_notes = notes_data.doctor_notes

    # Notify the patient when the doctor adds or updates notes.
    if (
        notes_changed
        and notes_data.doctor_notes
        and notes_data.doctor_notes.strip()
    ):

        notification = Notification(
            user_id=consultation.user_id,
            title="New Doctor's Notes",
            message=(
                f"Your doctor, {doctor.full_name}, "
                "has added or updated notes for your consultation. "
                "Log in to SakhiAI and open your consultation page "
                "to view them."
            ),
            notification_type="consultation"
        )

        db.add(notification)

    db.commit()
    db.refresh(consultation)

    return consultation