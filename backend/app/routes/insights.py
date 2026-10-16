from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.health_tracking import HealthTracking
from app.models.menstrual_model import MenstrualCycle
from app.models.user import User
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/insights",
    tags=["AI Health Insights"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def build_today_insights(db: Session, user_id: int):

    # ==================================================
    # HEALTH HISTORY
    # ==================================================

    health_records = (
        db.query(HealthTracking)
        .filter(
            HealthTracking.user_id == user_id
        )
        .order_by(
            HealthTracking.tracking_date.desc()
        )
        .all()
    )

    # ==================================================
    # MENSTRUAL HISTORY
    # ==================================================

    menstrual_record = (
        db.query(MenstrualCycle)
        .filter(
            MenstrualCycle.user_id == user_id
        )
        .order_by(
            MenstrualCycle.period_start.desc()
        )
        .first()
    )

    # ==================================================
    # NO HEALTH DATA
    # ==================================================

    if not health_records and not menstrual_record:

        return {
            "user_id": user_id,

            "insights": [
                {
                    "type": "no_data"
                }
            ],

            "data_available": {
                "sleep": False,
                "mood": False,
                "activity": False,
                "cycle": False
            },

            "summary": {
                "health_records": 0,
                "average_sleep": None,
                "average_mood": None
            }
        }

    # ==================================================
    # EXTRACT AVAILABLE DATA
    # ==================================================

    sleep_values = [
        float(record.sleep_hours)
        for record in health_records
        if record.sleep_hours is not None
    ]

    mood_values = [
        int(record.mood)
        for record in health_records
        if record.mood is not None
    ]

    activity_values = [
        record.activity_level
        for record in health_records
        if record.activity_level
    ]

    # ==================================================
    # LATEST RECORD
    # ==================================================

    latest_record = (
        health_records[0]
        if health_records
        else None
    )

    # ==================================================
    # CALCULATE AVERAGES
    # ==================================================

    average_sleep = (
        sum(sleep_values) / len(sleep_values)
        if sleep_values
        else None
    )

    average_mood = (
        sum(mood_values) / len(mood_values)
        if mood_values
        else None
    )

    # ==================================================
    # GENERATE STRUCTURED INSIGHTS
    # ==================================================

    insights = []

    # ==================================================
    # SLEEP INSIGHT
    # ==================================================

    if average_sleep is not None:

        if average_sleep < 6:

            insights.append({
                "type": "sleep",
                "condition": "very_low",
                "value": round(average_sleep, 1)
            })

        elif average_sleep < 7:

            insights.append({
                "type": "sleep",
                "condition": "slightly_low",
                "value": round(average_sleep, 1)
            })

        else:

            insights.append({
                "type": "sleep",
                "condition": "positive",
                "value": round(average_sleep, 1)
            })

    # ==================================================
    # MOOD INSIGHT
    # ==================================================

    if average_mood is not None:

        if average_mood <= 2:

            insights.append({
                "type": "mood",
                "condition": "low",
                "value": round(average_mood, 1)
            })

        elif average_mood < 3.5:

            insights.append({
                "type": "mood",
                "condition": "variable",
                "value": round(average_mood, 1)
            })

        else:

            insights.append({
                "type": "mood",
                "condition": "positive",
                "value": round(average_mood, 1)
            })

    # ==================================================
    # MOOD VARIATION
    # ==================================================

    if len(mood_values) >= 2:

        mood_range = max(mood_values) - min(mood_values)

        if mood_range >= 3:

            insights.append({
                "type": "mood_variation",
                "range": mood_range
            })

    # ==================================================
    # ACTIVITY INSIGHT
    # ==================================================

    if activity_values:

        latest_activity = activity_values[0].lower()

        if latest_activity == "low":

            insights.append({
                "type": "activity",
                "condition": "low",
                "value": latest_activity
            })

        elif latest_activity == "moderate":

            insights.append({
                "type": "activity",
                "condition": "moderate",
                "value": latest_activity
            })

        elif latest_activity == "high":

            insights.append({
                "type": "activity",
                "condition": "high",
                "value": latest_activity
            })

    # ==================================================
    # CYCLE INSIGHT
    # ==================================================

    cycle_available = False

    if menstrual_record:

        cycle_available = True

        cycle_day = (
            date.today()
            - menstrual_record.period_start
        ).days + 1

        if cycle_day <= 5:

            insights.append({
                "type": "cycle",
                "condition": "menstrual",
                "value": cycle_day
            })

        elif cycle_day <= 14:

            insights.append({
                "type": "cycle",
                "condition": "early_cycle",
                "value": cycle_day
            })

        elif cycle_day <= 21:

            insights.append({
                "type": "cycle",
                "condition": "mid_cycle",
                "value": cycle_day
            })

        else:

            insights.append({
                "type": "cycle",
                "condition": "late_cycle",
                "value": cycle_day
            })

    # ==================================================
    # DATA SUMMARY INSIGHT
    # ==================================================

    if len(health_records) >= 3:

        insights.append({
            "type": "tracking",
            "value": len(health_records)
        })

    # ==================================================
    # FALLBACK
    # ==================================================

    if not insights:

        insights.append({
            "type": "continue_tracking"
        })

    # ==================================================
    # RETURN RESPONSE
    # ==================================================

    return {
        "user_id": user_id,

        "insights": insights,

        "data_available": {
            "sleep": bool(sleep_values),
            "mood": bool(mood_values),
            "activity": bool(activity_values),
            "cycle": cycle_available
        },

        "summary": {
            "health_records": len(health_records),

            "average_sleep": (
                round(average_sleep, 1)
                if average_sleep is not None
                else None
            ),

            "average_mood": (
                round(average_mood, 1)
                if average_mood is not None
                else None
            )
        }
    }


@router.get("/today")
def get_today_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):
    return build_today_insights(db, current_user.id)
