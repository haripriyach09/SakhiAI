from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router
from app.database.database import Base, engine
from app.routes.insights import router as insights_router
from app.routes.chat import router as chat_router
from app.routes.notifications import router as notifications_router
from app.routes.mental_wellness import router as mental_wellness_router

# Models
import app.models.user
import app.models.profile_model
import app.models.menstrual_model
import app.models.community
import app.models.mental_wellness
import app.models.pregnancy
from app.models.health_tracking import HealthTracking
from app.models.pmo_assessment import PMOSAssessment
from app.routes.pmo_history import router as pmo_history_router
import app.models.notification_model
import app.models.doctor
import app.models.consultation

# Routes
from app.routes.auth import router as auth_router
from app.routes.profile import router as profile_router
from app.routes.menstrual import router as menstrual_router
from app.routes.health_tracking import router as health_tracking_router
from app.routes.prediction import router as prediction_router
from app.routes.insights import router as insights_router
from app.routes.chat import router as chat_router
from app.routes.notifications import router as notifications_router
from app.routes.doctor import router as doctor_router
from app.routes.consultation import router as consultation_router
from app.routes.pregnancy import router as pregnancy_router
from app.routes.community import router as community_router
from app.routes.menstrual_ai import router as menstrual_ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SakhiAI API",
    description="AI-Powered Women's Healthcare Management System",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(menstrual_router)
app.include_router(health_tracking_router)
app.include_router(prediction_router)
app.include_router(insights_router)
app.include_router(chat_router)
app.include_router(notifications_router)
app.include_router(doctor_router)
app.include_router(consultation_router)
app.include_router(pmo_history_router)
app.include_router(pregnancy_router)
app.include_router(mental_wellness_router)
app.include_router(community_router)
app.include_router(menstrual_ai_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "SakhiAI",
        "status": "Backend Running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "server": "Healthy",
        "database": "Not Connected Yet",
        "ai_models": "Not Loaded Yet"
    }