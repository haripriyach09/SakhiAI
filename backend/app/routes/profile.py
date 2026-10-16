from app.schemas.profile_schema import ProfileCreate
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.utils.auth_dependency import get_current_patient
from app.models.user import User
from app.database.database import SessionLocal
from app.models.profile_model import Profile
from app.schemas.profile_schema import ProfileCreate


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/create")
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    new_profile = Profile(
        user_id=current_user.id,
        **profile.dict()
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully",
        "profile_id": new_profile.id
    }
    
@router.get("/me")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()


    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    return profile
@router.put("/update")
def update_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    profile = db.query(Profile).filter(
        Profile.user_id == current_user.id
    ).first()


    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    profile.date_of_birth = profile_data.date_of_birth
    profile.height = profile_data.height
    profile.weight = profile_data.weight
    profile.blood_group = profile_data.blood_group
    profile.medical_history = profile_data.medical_history
    profile.allergies = profile_data.allergies
    profile.menstrual_status = profile_data.menstrual_status
    profile.pregnancy_status = profile_data.pregnancy_status


    db.commit()
    db.refresh(profile)


    return {
        "message": "Profile updated successfully"
    }