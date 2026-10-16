from fastapi import APIRouter, Depends, HTTPException

from app.schemas.menstrual_ai_schema import (
    MenstrualAIPredictionRequest,
)
from app.services.menstrual_ai import predict_menstrual_phase
from app.utils.auth_dependency import get_current_patient


router = APIRouter(
    prefix="/menstrual",
    tags=["Menstrual AI"],
)


@router.post("/ai-predict")
def predict_phase(
    request: MenstrualAIPredictionRequest,
    current_user=Depends(get_current_patient),
):
    """
    Predict menstrual cycle phase using the trained LSTM model.

    This is an informational AI prediction and is not a
    medical diagnosis.
    """

    try:
        feature_rows = [
            day.model_dump()
            for day in request.days
        ]

        result = predict_menstrual_phase(feature_rows)

        return result

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Menstrual AI prediction failed.",
        )