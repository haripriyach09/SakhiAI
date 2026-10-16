from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.models.profile_model import Profile
from app.models.health_tracking import HealthTracking
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/chat",
    tags=["AI Health Assistant"]
)


# --------------------------------------------------
# Database
# --------------------------------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# Request schema
# --------------------------------------------------

class ChatRequest(BaseModel):
    message: str


# --------------------------------------------------
# AI Health Assistant
# --------------------------------------------------

@router.post("/message")
def chat_message(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    message = request.message.strip().lower()

    # ----------------------------------------------
    # Get user's profile
    # ----------------------------------------------

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    # ----------------------------------------------
    # Get latest health record
    # ----------------------------------------------

    health_record = (
        db.query(HealthTracking)
        .filter(
            HealthTracking.user_id == current_user.id
        )
        .order_by(HealthTracking.id.desc())
        .first()
    )

    # ----------------------------------------------
    # Prepare user health information
    # ----------------------------------------------

    sleep = None
    mood = None
    activity = None
    cycle_day = None

    if health_record:
        sleep = health_record.sleep_hours
        mood = health_record.mood
        activity = health_record.activity_level
        cycle_day = health_record.cycle_day

    # ----------------------------------------------
    # Default response
    # ----------------------------------------------

    response = (
        "I'm SakhiAI, your women's health assistant. "
        "I can help you understand your menstrual cycle, "
        "sleep, mood, activity and general wellness. "
        "Please remember that my responses are informational "
        "and are not a medical diagnosis."
    )

    # ----------------------------------------------
    # Greeting
    # ----------------------------------------------

    if any(
        word in message
        for word in ["hello", "hi", "hey", "hii"]
    ):
        response = (
            f"Hello {current_user.full_name}! 🌸 "
            "I'm SakhiAI. I can help you understand your "
            "cycle, mood, sleep, activity and wellness. "
            "What would you like to know?"
        )

    # ----------------------------------------------
    # Sleep
    # ----------------------------------------------

    elif any(
        word in message
        for word in ["sleep", "sleeping", "tired", "insomnia"]
    ):

        if sleep is not None:

            if sleep < 6:
                response = (
                    f"Your latest recorded sleep is "
                    f"{sleep} hours. This is below the commonly "
                    "recommended amount for most adults. "
                    "Try maintaining a consistent sleep schedule "
                    "and reducing screen exposure before bedtime."
                )

            elif sleep < 7:
                response = (
                    f"Your latest recorded sleep is "
                    f"{sleep} hours. Getting a little more sleep "
                    "may help support your energy and overall "
                    "wellness."
                )

            else:
                response = (
                    f"Your latest recorded sleep is "
                    f"{sleep} hours. That's a reasonable amount "
                    "of sleep. Continue maintaining a consistent "
                    "sleep routine."
                )

        else:
            response = (
                "I don't have a recent sleep record for you. "
                "Add your sleep information in the Tracking page "
                "so I can provide a more personalized insight."
            )

    # ----------------------------------------------
    # Mood
    # ----------------------------------------------

    elif any(
        word in message
        for word in ["mood", "sad", "stress", "stressed", "anxiety"]
    ):

        if mood is not None:

            if mood <= 2:
                response = (
                    f"Your latest recorded mood is {mood}/5. "
                    "It may be helpful to give yourself some rest "
                    "and pay attention to how your mood changes "
                    "over the next few days."
                )

            elif mood == 3:
                response = (
                    "Your latest recorded mood is 3/5. "
                    "Keep monitoring your mood and consider "
                    "activities that help you relax and feel supported."
                )

            else:
                response = (
                    f"Your latest recorded mood is {mood}/5. "
                    "That's a positive indication in your latest "
                    "tracking record. Continue monitoring your "
                    "mood over time."
                )

        else:
            response = (
                "I don't have a recent mood record. "
                "You can record your mood in the Tracking page "
                "so I can provide personalized insights."
            )

    # ----------------------------------------------
    # Activity
    # ----------------------------------------------

    elif any(
        word in message
        for word in ["activity", "exercise", "workout", "fitness"]
    ):

        if activity:
            response = (
                f"Your latest recorded activity level is "
                f"{activity}. Maintaining regular physical activity "
                "that is appropriate for your fitness level can "
                "support overall health and wellbeing."
            )

        else:
            response = (
                "I don't have a recent activity record. "
                "Add your activity information in the Tracking page "
                "for personalized feedback."
            )

    # ----------------------------------------------
    # Menstrual cycle
    # ----------------------------------------------

    elif any(
        word in message
        for word in [
            "period",
            "menstrual",
            "menstruation",
            "cycle",
            "periods"
        ]
    ):

        if cycle_day is not None:
            response = (
                f"Your latest recorded cycle day is Day {cycle_day}. "
                "Cycle patterns can vary between individuals and "
                "from month to month. Continue tracking your cycle "
                "regularly so SakhiAI can identify patterns over time."
            )

        else:
            response = (
                "I don't have a recent cycle-day record. "
                "Please add your menstrual information in the "
                "Menstrual Tracking page."
            )

    # ----------------------------------------------
    # PMOS
    # ----------------------------------------------

    elif any(
        word in message
        for word in ["pmos", "risk", "prediction", "predict"]
    ):

        response = (
            "Your PMOS risk score is an informational estimate "
            "generated from the health information you provide. "
            "It should not be considered a medical diagnosis. "
            "You can view your current estimate on the dashboard."
        )

    # ----------------------------------------------
    # Profile
    # ----------------------------------------------

    elif any(
        word in message
        for word in ["profile", "age", "weight", "height", "allergy"]
    ):

        if profile:
            response = (
                "Your SakhiAI profile contains information such as "
                "your height, weight, blood group, allergies and "
                "health history. You can update these details from "
                "your Profile page."
            )

        else:
            response = (
                "Your health profile has not been completed yet. "
                "Please complete your profile so SakhiAI can "
                "provide more personalized information."
            )

    # ----------------------------------------------
    # Emergency / serious symptoms
    # ----------------------------------------------

    elif any(
        word in message
        for word in [
            "severe pain",
            "heavy bleeding",
            "fainting",
            "unconscious",
            "chest pain",
            "difficulty breathing"
        ]
    ):

        response = (
            "Some symptoms can require prompt medical attention. "
            "If you are experiencing severe or rapidly worsening "
            "symptoms, seek medical care from a qualified healthcare "
            "professional or emergency service immediately. "
            "SakhiAI cannot diagnose or treat emergencies."
        )

    # ----------------------------------------------
    # Return response
    # ----------------------------------------------

    return {
        "user_id": current_user.id,
        "message": request.message,
        "response": response,
        "health_data_available": {
            "profile": profile is not None,
            "sleep": sleep is not None,
            "mood": mood is not None,
            "activity": activity is not None,
            "cycle": cycle_day is not None
        }
    }