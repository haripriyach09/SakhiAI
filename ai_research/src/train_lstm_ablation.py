import json
from pathlib import Path

import numpy as np
import pandas as pd
import tensorflow as tf

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
)
from sklearn.utils.class_weight import compute_class_weight

from tensorflow.keras import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau,
    ModelCheckpoint,
)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATA_DIR = BASE_DIR / "data" / "processed"
MODEL_DIR = BASE_DIR / "models"
RESULTS_DIR = BASE_DIR / "results"

MODEL_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)


# =========================================================
# SETTINGS
# =========================================================

SEQUENCE_LENGTH = 7
RANDOM_SEED = 42

tf.random.set_seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)


# =========================================================
# LOAD DATA
# =========================================================

print("Loading processed datasets...")

train_df = pd.read_csv(DATA_DIR / "lstm_train.csv")
val_df = pd.read_csv(DATA_DIR / "lstm_validation.csv")
test_df = pd.read_csv(DATA_DIR / "lstm_test.csv")

with open(
    DATA_DIR / "lstm_preprocessing_info.json",
    "r",
    encoding="utf-8"
) as f:
    preprocessing_info = json.load(f)

all_features = preprocessing_info["features"]

print(f"Total features: {len(all_features)}")


# =========================================================
# FEATURE SETS
# =========================================================

hormone_features = [
    "lh",
    "estrogen",
    "pdg",
]

wellness_features = [
    feature
    for feature in all_features
    if feature not in hormone_features
]

print("\nHormone-informed features:")
print(all_features)

print("\nWellness-only features:")
print(wellness_features)


# =========================================================
# PHASE MAPPING
# =========================================================

phase_mapping = {
    "Menstrual": 0,
    "Follicular": 1,
    "Fertility": 2,
    "Luteal": 3,
}


# =========================================================
# SEQUENCE CREATION
# =========================================================

def create_sequences(df, features, sequence_length=7):

    X = []
    y = []

    grouped = df.sort_values(
        ["id", "study_interval", "day_in_study"]
    ).groupby(
        ["id", "study_interval"]
    )

    for _, group in grouped:

        values = group[features].values
        labels = group["phase"].map(phase_mapping).values

        if len(group) <= sequence_length:
            continue

        for i in range(sequence_length, len(group)):

            X.append(
                values[i - sequence_length:i]
            )

            y.append(labels[i])

    return np.array(X, dtype=np.float32), np.array(y, dtype=np.int64)


# =========================================================
# MODEL
# =========================================================

def build_model(input_shape):

    model = Sequential([
        LSTM(
            64,
            return_sequences=True,
            input_shape=input_shape
        ),

        Dropout(0.30),

        LSTM(32),

        Dropout(0.30),

        Dense(32, activation="relu"),

        Dropout(0.20),

        Dense(4, activation="softmax")
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(
            learning_rate=0.001
        ),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )

    return model


# =========================================================
# TRAIN + EVALUATE
# =========================================================

def run_experiment(name, features):

    print("\n")
    print("=" * 60)
    print(f"RUNNING: {name}")
    print("=" * 60)

    print(f"Number of features: {len(features)}")

    # Create sequences
    X_train, y_train = create_sequences(
        train_df,
        features,
        SEQUENCE_LENGTH
    )

    X_val, y_val = create_sequences(
        val_df,
        features,
        SEQUENCE_LENGTH
    )

    X_test, y_test = create_sequences(
        test_df,
        features,
        SEQUENCE_LENGTH
    )

    print("\nSequence shapes:")
    print("Train:", X_train.shape)
    print("Validation:", X_val.shape)
    print("Test:", X_test.shape)

    # Class weights
    classes = np.unique(y_train)

    weights = compute_class_weight(
        class_weight="balanced",
        classes=classes,
        y=y_train
    )

    class_weights = {
        int(cls): float(weight)
        for cls, weight in zip(classes, weights)
    }

    print("\nClass weights:")
    print(class_weights)

    # Model
    model = build_model(
        (
            X_train.shape[1],
            X_train.shape[2]
        )
    )

    model_path = (
        MODEL_DIR /
        f"menstrual_phase_lstm_7d_{name}.keras"
    )

    callbacks = [

        EarlyStopping(
            monitor="val_loss",
            patience=8,
            restore_best_weights=True,
            verbose=1
        ),

        ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=4,
            min_lr=1e-6,
            verbose=1
        ),

        ModelCheckpoint(
            model_path,
            monitor="val_loss",
            save_best_only=True,
            verbose=1
        )
    ]

    print("\nTraining...")

    history = model.fit(
        X_train,
        y_train,
        validation_data=(X_val, y_val),
        epochs=35,
        batch_size=32,
        class_weight=class_weights,
        callbacks=callbacks,
        verbose=1
    )

    # Test predictions
    print("\nEvaluating TEST set...")

    probabilities = model.predict(
        X_test,
        verbose=0
    )

    predictions = np.argmax(
        probabilities,
        axis=1
    )

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    macro_f1 = f1_score(
        y_test,
        predictions,
        average="macro"
    )

    weighted_f1 = f1_score(
        y_test,
        predictions,
        average="weighted"
    )

    print("\n" + "=" * 60)
    print(f"{name.upper()} RESULTS")
    print("=" * 60)

    print(f"Accuracy:    {accuracy:.4f}")
    print(f"Macro F1:    {macro_f1:.4f}")
    print(f"Weighted F1: {weighted_f1:.4f}")

    print("\nClassification Report:")

    report = classification_report(
        y_test,
        predictions,
        target_names=[
            "Menstrual",
            "Follicular",
            "Fertility",
            "Luteal"
        ],
        digits=4
    )

    print(report)

    print("Confusion Matrix:")

    cm = confusion_matrix(
        y_test,
        predictions
    )

    print(cm)

    # Confidence
    confidence = np.max(
        probabilities,
        axis=1
    )

    print("\nConfidence:")
    print(f"Mean:   {confidence.mean():.4f}")
    print(f"Median: {np.median(confidence):.4f}")
    print(f"Min:    {confidence.min():.4f}")
    print(f"Max:    {confidence.max():.4f}")

    # Save predictions
    prediction_df = pd.DataFrame({
        "true_phase": [
            list(phase_mapping.keys())[x]
            for x in y_test
        ],
        "predicted_phase": [
            list(phase_mapping.keys())[x]
            for x in predictions
        ],
        "confidence": confidence
    })

    prediction_file = (
        RESULTS_DIR /
        f"lstm_{name}_7d_test_predictions.csv"
    )

    prediction_df.to_csv(
        prediction_file,
        index=False
    )

    # Metrics
    metrics = {
        "model": f"LSTM 7-day {name}",
        "sequence_length": SEQUENCE_LENGTH,
        "features": features,
        "train_sequences": int(len(X_train)),
        "validation_sequences": int(len(X_val)),
        "test_sequences": int(len(X_test)),
        "accuracy": float(accuracy),
        "macro_f1": float(macro_f1),
        "weighted_f1": float(weighted_f1),
        "confusion_matrix": cm.tolist(),
        "mean_confidence": float(confidence.mean()),
        "median_confidence": float(np.median(confidence)),
        "min_confidence": float(confidence.min()),
        "max_confidence": float(confidence.max()),
    }

    metrics_file = (
        RESULTS_DIR /
        f"lstm_{name}_7d_metrics.json"
    )

    with open(
        metrics_file,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            metrics,
            f,
            indent=2
        )

    print("\nSaved model:")
    print(model_path)

    print("\nSaved metrics:")
    print(metrics_file)

    print("\nSaved predictions:")
    print(prediction_file)

    return metrics


# =========================================================
# RUN BOTH
# =========================================================

hormone_results = run_experiment(
    "hormone_informed",
    all_features
)

wellness_results = run_experiment(
    "wellness_only",
    wellness_features
)


# =========================================================
# COMPARISON
# =========================================================

comparison = pd.DataFrame([
    {
        "model": "Hormone-informed LSTM",
        "accuracy": hormone_results["accuracy"],
        "macro_f1": hormone_results["macro_f1"],
        "weighted_f1": hormone_results["weighted_f1"],
    },
    {
        "model": "Wellness-only LSTM",
        "accuracy": wellness_results["accuracy"],
        "macro_f1": wellness_results["macro_f1"],
        "weighted_f1": wellness_results["weighted_f1"],
    }
])

print("\n")
print("=" * 60)
print("FINAL FEATURE ABLATION COMPARISON")
print("=" * 60)

print(
    comparison.to_string(index=False)
)

comparison.to_json(
    RESULTS_DIR /
    "lstm_feature_ablation_comparison.json",
    orient="records",
    indent=2
)

print("\nComparison saved.")

print("\nExperiment completed successfully.")