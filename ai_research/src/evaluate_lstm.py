import os
import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
    accuracy_score,
    f1_score
)

# =========================================================
# Paths
# =========================================================

BASE_DIR = r"C:\projects\SakhiAI\ai_research"

DATA_DIR = os.path.join(BASE_DIR, "data", "processed")
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "menstrual_phase_lstm.keras"
)

RESULTS_DIR = os.path.join(
    BASE_DIR,
    "results"
)

os.makedirs(RESULTS_DIR, exist_ok=True)

TEST_PATH = os.path.join(
    DATA_DIR,
    "lstm_test.csv"
)

# =========================================================
# Configuration
# =========================================================

SEQUENCE_LENGTH = 7

FEATURES = [
    "lh",
    "estrogen",
    "pdg",
    "overall_score",
    "deep_sleep_in_minutes",
    "resting_hr_daily",
    "restlessness",
    "stress_score",
    "exerciselevel",
    "moodswing",
    "fatigue",
    "cramps",
    "headaches",
    "sleepissue",
    "foodcravings",
    "bloating",
]

PHASE_NAMES = [
    "Menstrual",
    "Follicular",
    "Fertility",
    "Luteal"
]

# =========================================================
# Load
# =========================================================

print("Loading test dataset...")
df = pd.read_csv(TEST_PATH)

print("Loading trained model...")
model = tf.keras.models.load_model(MODEL_PATH)

# =========================================================
# Create sequences
# =========================================================

def create_sequences(df, sequence_length=7):

    X = []
    y = []

    grouped = df.groupby(
        ["id", "study_interval"],
        sort=False
    )

    for (_, _), group in grouped:

        group = group.sort_values("day_in_study")

        values = group[FEATURES].values.astype(np.float32)
        labels = group["phase_label"].values.astype(np.int32)

        if len(group) < sequence_length:
            continue

        for i in range(sequence_length - 1, len(group)):

            X.append(
                values[
                    i - sequence_length + 1:i + 1
                ]
            )

            y.append(labels[i])

    return (
        np.array(X, dtype=np.float32),
        np.array(y, dtype=np.int32)
    )


X_test, y_test = create_sequences(df)

print(f"Test sequences: {len(X_test)}")

# =========================================================
# Predictions
# =========================================================

probabilities = model.predict(
    X_test,
    verbose=0
)

predictions = np.argmax(
    probabilities,
    axis=1
)

# =========================================================
# Metrics
# =========================================================

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
print("BASELINE LSTM EVALUATION")
print("=" * 60)

print(f"Accuracy:   {accuracy:.4f}")
print(f"Macro F1:   {macro_f1:.4f}")
print(f"Weighted F1:{weighted_f1:.4f}")

print("\nClassification Report:")

report = classification_report(
    y_test,
    predictions,
    target_names=PHASE_NAMES,
    digits=4
)

print(report)

# =========================================================
# Confusion Matrix
# =========================================================

cm = confusion_matrix(
    y_test,
    predictions
)

print("\nConfusion Matrix:")
print(cm)

fig, ax = plt.subplots(
    figsize=(8, 7)
)

display = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=PHASE_NAMES
)

display.plot(
    ax=ax,
    values_format="d"
)

plt.title(
    "SakhiAI Menstrual Phase LSTM - Test Confusion Matrix"
)

plt.tight_layout()

cm_path = os.path.join(
    RESULTS_DIR,
    "lstm_confusion_matrix.png"
)

plt.savefig(
    cm_path,
    dpi=200
)

plt.close()

# =========================================================
# Prediction confidence
# =========================================================

confidence = np.max(
    probabilities,
    axis=1
)

print("\nPrediction confidence:")
print(f"Mean:   {confidence.mean():.4f}")
print(f"Median: {np.median(confidence):.4f}")
print(f"Min:    {confidence.min():.4f}")
print(f"Max:    {confidence.max():.4f}")

# =========================================================
# Save predictions
# =========================================================

prediction_df = pd.DataFrame({
    "actual": [
        PHASE_NAMES[x]
        for x in y_test
    ],
    "predicted": [
        PHASE_NAMES[x]
        for x in predictions
    ],
    "confidence": confidence
})

prediction_path = os.path.join(
    RESULTS_DIR,
    "lstm_test_predictions.csv"
)

prediction_df.to_csv(
    prediction_path,
    index=False
)

# =========================================================
# Final
# =========================================================

print("\nSaved:")
print(cm_path)
print(prediction_path)

print("\nEvaluation complete.")
