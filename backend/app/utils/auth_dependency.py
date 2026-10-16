from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.models.doctor import Doctor
from app.utils.jwt import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/token"
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = verify_access_token(token)
    except RuntimeError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error)
        ) from error

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    role = payload.get("role")

    # -----------------------------
    # PATIENT
    # -----------------------------

    if role == "patient":
        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid patient token"
            )

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Patient account not found"
            )

        return user

    # -----------------------------
    # DOCTOR
    # -----------------------------

    if role == "doctor":
        doctor_id = payload.get("doctor_id")

        if not doctor_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid doctor token"
            )

        doctor = (
            db.query(Doctor)
            .filter(Doctor.id == doctor_id)
            .first()
        )

        if not doctor:
            raise HTTPException(
                status_code=401,
                detail="Doctor account not found"
            )

        return doctor

    raise HTTPException(
        status_code=401,
        detail="Invalid authentication role"
    )


def get_current_patient(
    current_user=Depends(get_current_user)
) -> User:
    if not isinstance(current_user, User):
        raise HTTPException(
            status_code=403,
            detail="Patient access required"
        )

    return current_user


def get_current_doctor(
    current_user=Depends(get_current_user)
) -> Doctor:
    if not isinstance(current_user, Doctor):
        raise HTTPException(
            status_code=403,
            detail="Doctor access required"
        )

    return current_user