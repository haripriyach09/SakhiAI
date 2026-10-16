from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.database.database import SessionLocal
from app.models.menstrual_model import MenstrualCycle
from app.schemas.menstrual_schema import MenstrualCreate, MenstrualResponse
from app.models.user import User
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/menstrual",
    tags=["Menstrual Tracking"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()



@router.post("/add")
def add_cycle(
    cycle: MenstrualCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    new_cycle = MenstrualCycle(
        user_id=current_user.id,
        **cycle.model_dump()
    )


    db.add(new_cycle)
    db.commit()
    db.refresh(new_cycle)


    return {
        "message": "Cycle data saved",
        "cycle_id": new_cycle.id
    }
    
@router.get("/history", response_model=list[MenstrualResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    cycles = db.query(MenstrualCycle).filter(
        MenstrualCycle.user_id == current_user.id
    ).all()

    return cycles

@router.put("/update/{cycle_id}")
def update_cycle(
    cycle_id: int,
    cycle: MenstrualCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    existing_cycle = db.query(MenstrualCycle).filter(
        MenstrualCycle.id == cycle_id,
        MenstrualCycle.user_id == current_user.id
    ).first()

    if not existing_cycle:
        raise HTTPException(
            status_code=404,
            detail="Cycle not found"
        )

    existing_cycle.period_start = cycle.period_start
    existing_cycle.period_end = cycle.period_end
    existing_cycle.cycle_length = cycle.cycle_length
    existing_cycle.symptoms = cycle.symptoms
    existing_cycle.flow_level = cycle.flow_level

    db.commit()
    db.refresh(existing_cycle)

    return {
        "message": "Cycle updated successfully"
    }
    
@router.delete("/delete/{cycle_id}")
def delete_cycle(
    cycle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):

    cycle = db.query(MenstrualCycle).filter(
        MenstrualCycle.id == cycle_id,
        MenstrualCycle.user_id == current_user.id
    ).first()

    if not cycle:
        raise HTTPException(
            status_code=404,
            detail="Cycle not found"
        )

    db.delete(cycle)
    db.commit()

    return {
        "message": "Cycle deleted successfully"
    }
@router.get("/insights")
def get_cycle_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_patient)
):
    from datetime import date, timedelta

    cycles = (
        db.query(MenstrualCycle)
        .filter(MenstrualCycle.user_id == current_user.id)
        .order_by(MenstrualCycle.period_start.asc())
        .all()
    )

    # No cycle data
    if not cycles:
        return {
            "average_cycle_length": None,
            "average_period_length": None,
            "current_cycle_day": None,
            "next_period_date": None,
            "fertile_window_start": None,
            "fertile_window_end": None,
            "cycle_regularity": "No Data"
        }

    # --------------------------------------------------
    # Average cycle length
    # --------------------------------------------------

    cycle_lengths = [
        cycle.cycle_length
        for cycle in cycles
        if cycle.cycle_length is not None
    ]

    if cycle_lengths:
        average_cycle_length = round(
            sum(cycle_lengths) / len(cycle_lengths)
        )
    else:
        average_cycle_length = 28

    # --------------------------------------------------
    # Average period length
    # --------------------------------------------------

    period_lengths = []

    for cycle in cycles:
        if cycle.period_start and cycle.period_end:
            duration = (
                cycle.period_end - cycle.period_start
            ).days + 1

            if duration > 0:
                period_lengths.append(duration)

    if period_lengths:
        average_period_length = round(
            sum(period_lengths) / len(period_lengths)
        )
    else:
        average_period_length = None

    # --------------------------------------------------
    # Latest cycle
    # --------------------------------------------------

    latest_cycle = cycles[-1]
    latest_start = latest_cycle.period_start

    today = date.today()

    # --------------------------------------------------
    # Current cycle day
    # --------------------------------------------------

    if latest_start <= today:
        current_cycle_day = (
            today - latest_start
        ).days + 1

        # Keep it within the predicted cycle
        if current_cycle_day > average_cycle_length:
            current_cycle_day = (
                current_cycle_day % average_cycle_length
            )

            if current_cycle_day == 0:
                current_cycle_day = average_cycle_length

    else:
        current_cycle_day = None

    # --------------------------------------------------
    # Next period prediction
    # --------------------------------------------------

    next_period_date = (
        latest_start +
        timedelta(days=average_cycle_length)
    )

    while next_period_date < today:
        next_period_date += timedelta(
            days=average_cycle_length
        )

    # --------------------------------------------------
    # Fertile window
    # --------------------------------------------------

    # Approximate ovulation:
    # cycle length - 14 days

    ovulation_day = max(
        average_cycle_length - 14,
        1
    )

    fertile_window_start = (
        latest_start +
        timedelta(days=ovulation_day - 5)
    )

    fertile_window_end = (
        latest_start +
        timedelta(days=ovulation_day + 1)
    )

    # If the fertile window has already passed,
    # calculate it for the next cycle.
    if fertile_window_end < today:
        next_cycle_start = next_period_date

        fertile_window_start = (
            next_cycle_start +
            timedelta(days=ovulation_day - 5)
        )

        fertile_window_end = (
            next_cycle_start +
            timedelta(days=ovulation_day + 1)
        )

    # --------------------------------------------------
    # Cycle regularity
    # --------------------------------------------------

    if len(cycle_lengths) < 2:
        cycle_regularity = "Insufficient Data"

    else:
        difference = max(cycle_lengths) - min(cycle_lengths)

        if difference <= 3:
            cycle_regularity = "Regular"
        elif difference <= 7:
            cycle_regularity = "Slightly Irregular"
        else:
            cycle_regularity = "Irregular"

    return {
        "average_cycle_length": average_cycle_length,
        "average_period_length": average_period_length,
        "current_cycle_day": current_cycle_day,
        "next_period_date": next_period_date.isoformat(),
        "fertile_window_start": fertile_window_start.isoformat(),
        "fertile_window_end": fertile_window_end.isoformat(),
        "cycle_regularity": cycle_regularity
    }