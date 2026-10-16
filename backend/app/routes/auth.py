
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserRegister, UserLogin
from app.utils.jwt import create_access_token, verify_access_token
from app.utils.security import hash_password, verify_password
from app.models.doctor import Doctor

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/token"
)


# Database session
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def _login_response(email: str, password: str, db: Session):
    db_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )
    doctor = (
        db.query(Doctor)
        .filter(Doctor.email == email)
        .first()
    )

    patient_password_matches = bool(
        db_user and verify_password(password, db_user.password)
    )
    doctor_password_matches = bool(
        doctor and verify_password(password, doctor.password)
    )

    if patient_password_matches and doctor_password_matches:
        raise HTTPException(
            status_code=409,
            detail=(
                "This email and password match both a patient and doctor "
                "account. Contact support to resolve the duplicate account."
            )
        )

    if patient_password_matches:
        token_data = {
            "user_id": db_user.id,
            "email": db_user.email,
            "role": "patient",
        }
    elif doctor_password_matches:
        token_data = {
            "doctor_id": doctor.id,
            "email": doctor.email,
            "role": "doctor",
        }
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    try:
        token = create_access_token(token_data)
    except RuntimeError as error:
        raise HTTPException(
            status_code=503,
            detail=str(error)
        ) from error

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": token_data["role"],
    }


# --------------------------------------------------
# REGISTER
# --------------------------------------------------

@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_doctor = (
        db.query(Doctor)
        .filter(Doctor.email == user.email)
        .first()
    )

    if existing_doctor:
        raise HTTPException(
            status_code=400,
            detail="Email already registered for a doctor"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        age=user.age,
        language=user.language,
        life_stage=user.life_stage,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration Successful",
        "user_id": new_user.id
    }


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    return _login_response(user.email, user.password, db)

# --------------------------------------------------
# SWAGGER LOGIN
# --------------------------------------------------

@router.post("/token")
def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return _login_response(
        form_data.username,
        form_data.password,
        db,
    )
    
# --------------------------------------------------
# CURRENT USER / DOCTOR
# --------------------------------------------------

@router.get("/me")
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

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    role = payload.get("role")

    # ==============================================
    # PATIENT
    # ==============================================

    if role == "patient":

        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid patient token"
            )

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "age": user.age,
            "language": user.language,
            "life_stage": user.life_stage,
            "role": "patient"
        }

    # ==============================================
    # DOCTOR
    # ==============================================

    if role == "doctor":

        doctor_id = payload.get("doctor_id")

        if doctor_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid doctor token"
            )

        doctor = (
            db.query(Doctor)
            .filter(Doctor.id == doctor_id)
            .first()
        )

        if doctor is None:
            raise HTTPException(
                status_code=404,
                detail="Doctor not found"
            )

        return {
            "id": doctor.id,
            "full_name": doctor.full_name,
            "email": doctor.email,
            "specialization": doctor.specialization,
            "hospital": doctor.hospital,
            "experience_years": doctor.experience_years,
            "phone": doctor.phone,
            "bio": doctor.bio,
            "role": "doctor"
        }

    # ==============================================
    # INVALID ROLE
    # ==============================================

    raise HTTPException(
        status_code=401,
        detail="Invalid account role"
    )
# --------------------------------------------------
# UPDATE CURRENT USER
# --------------------------------------------------

@router.put("/me")
def update_current_user(
    full_name: str | None = None,
    email: str | None = None,
    age: int | None = None,
    language: str | None = None,
    life_stage: str | None = None,
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

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token: user_id missing"
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Update only fields that were provided
    if full_name is not None:
        user.full_name = full_name

    if email is not None:
        # Prevent duplicate email
        existing_user = (
            db.query(User)
            .filter(
                User.email == email,
                User.id != user.id
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        user.email = email

    if age is not None:
        user.age = age

    if language is not None:
        user.language = language

    if life_stage is not None:
        user.life_stage = life_stage

    db.commit()
    db.refresh(user)

    return {
        "message": "Account information updated successfully",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "age": user.age,
            "language": user.language,
            "life_stage": user.life_stage,
        }
    }