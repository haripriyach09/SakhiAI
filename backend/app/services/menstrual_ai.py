import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import tensorflow as tf


# =========================================================
# Paths
# =========================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = (
    PROJECT_ROOT
    / "ai_research"
    / "models"
    / "menstrual_phase_lstm.keras"
)

SCALER_PATH = (
    PROJECT_ROOT
    / "ai_research"
    / "data"
    / "processed"
    / "lstm_scaler.joblib"
)

PREPROCESSING_PATH = (
    PROJECT_ROOT
    / "ai_research"
    / "data"
    / "processed"
    / "lstm_preprocessing_info.json"
)


# =========================================================
# Model configuration
# =========================================================

SEQUENCE_LENGTH = 7

SEVERITY_MAP = {
    "Not at all": 0,
    "Very Low": 1,
    "Very Low/Little": 1,
    "Low": 2,
    "Somewhat Light": 2,
    "Moderate": 3,
    "Somewhat Heavy": 4,
    "High": 4,
    "Very High": 5,
}

CATEGORICAL_FEATURES = [
    "exerciselevel",
    "moodswing",
    "fatigue",
    "cramps",
    "headaches",
    "sleepissue",
    "foodcravings",
    "bloating",
]

PHASE_NAMES = {
    0: "Menstrual",
    1: "Follicular",
    2: "Fertility",
    3: "Luteal",
}


# =========================================================
# Cached artifacts
# =========================================================

_model = None
_scaler = None
_preprocessing_info = None


# =========================================================
# Load artifacts
# =========================================================

def load_artifacts():
    """
    Load the trained LSTM model, scaler and preprocessing
    information only once.
    """

    global _model
    global _scaler
    global _preprocessing_info

    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"LSTM model not found: {MODEL_PATH}"
            )

        _model = tf.keras.models.load_model(MODEL_PATH)

    if _scaler is None:
        if not SCALER_PATH.exists():
            raise FileNotFoundError(
                f"LSTM scaler not found: {SCALER_PATH}"
            )

        _scaler = joblib.load(SCALER_PATH)

    if _preprocessing_info is None:
        if not PREPROCESSING_PATH.exists():
            raise FileNotFoundError(
                f"Preprocessing information not found: "
                f"{PREPROCESSING_PATH}"
            )

        with open(
            PREPROCESSING_PATH,
            "r",
            encoding="utf-8"
        ) as file:
            _preprocessing_info = json.load(file)

    return _model, _scaler, _preprocessing_info


# =========================================================
# Validation
# =========================================================

def validate_features(feature_rows):
    """
    Validate that exactly seven chronological observations
    are supplied.

    Individual model features are allowed to be missing.
    Missing values are handled using training-set medians.
    """

    _, _, preprocessing_info = load_artifacts()

    features = preprocessing_info["features"]

    if len(feature_rows) != SEQUENCE_LENGTH:
        raise ValueError(
            f"The LSTM requires exactly {SEQUENCE_LENGTH} "
            f"days of observations."
        )

    for index, row in enumerate(feature_rows):

        if not isinstance(row, dict):
            raise ValueError(
                f"Observation {index + 1} must be an object."
            )

    return features


# =========================================================
# Convert categorical values
# =========================================================

def convert_feature_value(feature, value, median):
    """
    Convert an individual feature to a numeric value.

    Missing values and NaN values are replaced with the
    corresponding training-set median.
    """

    # -----------------------------------------------------
    # Missing value
    # -----------------------------------------------------

    if value is None:
        return float(median)

    # -----------------------------------------------------
    # Categorical feature
    # -----------------------------------------------------

    if feature in CATEGORICAL_FEATURES:

        if isinstance(value, str):

            if value not in SEVERITY_MAP:
                raise ValueError(
                    f"Unknown value '{value}' for "
                    f"feature '{feature}'."
                )

            value = SEVERITY_MAP[value]

    # -----------------------------------------------------
    # Numeric conversion
    # -----------------------------------------------------

    try:
        value = float(value)
    except (TypeError, ValueError):

        raise ValueError(
            f"Feature '{feature}' must be numeric "
            f"or a recognized categorical value."
        )

    # -----------------------------------------------------
    # NaN / infinite values
    # -----------------------------------------------------

    if not np.isfinite(value):
        return float(median)

    return value


# =========================================================
# Prepare input
# =========================================================

def prepare_input(feature_rows):
    """
    Convert seven daily observations into the exact scaled
    tensor expected by the trained LSTM.

    Missing model features are imputed using training-set
    medians.
    """

    _, scaler, preprocessing_info = load_artifacts()

    features = validate_features(feature_rows)

    medians = preprocessing_info["feature_medians"]

    rows = []

    provided_features = set()

    for row in feature_rows:

        row_values = {}

        for feature in features:

            value = row.get(feature)

            if value is not None:
                provided_features.add(feature)

            row_values[feature] = convert_feature_value(
                feature,
                value,
                medians[feature]
            )

        rows.append(row_values)

    # -----------------------------------------------------
    # Preserve exact feature order
    # -----------------------------------------------------

    dataframe = pd.DataFrame(
        rows,
        columns=features
    )

    # -----------------------------------------------------
    # Apply the exact scaler used during training
    # -----------------------------------------------------

    scaled_values = scaler.transform(dataframe)

    scaled_values = np.asarray(
        scaled_values,
        dtype=np.float32
    )

    # -----------------------------------------------------
    # LSTM input:
    #
    # (batch_size, sequence_length, features)
    # -----------------------------------------------------

    input_tensor = np.expand_dims(
        scaled_values,
        axis=0
    )

    return input_tensor, sorted(provided_features)


# =========================================================
# Prediction
# =========================================================

def predict_menstrual_phase(feature_rows):
    """
    Predict menstrual phase using seven chronological
    observations.
    """

    model, _, preprocessing_info = load_artifacts()

    input_tensor, provided_features = prepare_input(
        feature_rows
    )

    probabilities = model.predict(
        input_tensor,
        verbose=0
    )[0]

    predicted_index = int(
        np.argmax(probabilities)
    )

    predicted_phase = PHASE_NAMES[
        predicted_index
    ]

    phase_probabilities = {
        PHASE_NAMES[index]: float(
            probabilities[index]
        )
        for index in range(len(probabilities))
    }

    confidence = float(
        probabilities[predicted_index]
    )

    all_features = preprocessing_info["features"]

    imputed_features = [
        feature
        for feature in all_features
        if feature not in provided_features
    ]

    return {
        "predicted_phase": predicted_phase,

        "confidence": confidence,

        "confidence_percentage": round(
            confidence * 100,
            2
        ),

        "probabilities": phase_probabilities,

        "sequence_length": SEQUENCE_LENGTH,

        "features_used": all_features,

        "features_provided": provided_features,

        "features_imputed": imputed_features,

        "research_note": (
            "This research LSTM was trained using "
            "mcPHASES data containing menstrual, "
            "hormonal, wearable and self-reported "
            "features. Features not collected by "
            "SakhiAI are filled using training-set "
            "medians."
        ),

        "disclaimer": (
            "This AI prediction is for informational "
            "and wellness support only. It is not a "
            "medical diagnosis and should not replace "
            "professional medical advice."
        ),
    }