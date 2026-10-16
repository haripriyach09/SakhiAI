from pathlib import Path
import json
import random

import numpy as np
import pandas as pd
import tensorflow as tf

from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score

from tensorflow.keras import Sequential, regularizers
from tensorflow.keras.layers import (
    Input,
    LSTM,
    Dense,
    Dropout,
    LayerNormalization,
)
from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau,
    ModelCheckpoint,
)


# ============================================================
# Reproducibility
# ============================================================

SEED = 42

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)


# ============================================================
# Paths
# ============================================================

BASE_DIR = Path(r"C:\projects\SakhiAI\ai_research")

DATA_DIR = BASE_DIR / "data" / "processed"
MODEL_DIR = BASE_DIR / "models"
RESULT_DIR = BASE_DIR / "results"

MODEL_DIR.mkdir(parents=True, exist_ok=True)
RESULT_DIR.mkdir(parents=True, exist_ok=True)


TRAIN_FILE = DATA_DIR / "lstm_train.csv"
VAL_FILE = DATA_DIR / "lstm_validation.csv"
TEST_FILE = DATA_DIR / "lstm_test.csv"

PREPROCESSING_FILE = DATA_DIR / "lstm_preprocessing_info.json"

MODEL_FILE = MODEL_DIR / "menstrual_phase_lstm_regularized_14d.keras"


# ============================================================
# Configuration
# ============================================================

SEQUENCE_LENGTH = 14

BATCH_SIZE = 32
EPOCHS = 40

LEARNING_RATE = 0.0005


# ============================================================
# Load preprocessing information
# ============================================================

with open(PREPROCESSING_FILE, "r", encoding="utf-8") as f:
    preprocessing_info = json.load(f)


feature_columns = preprocessing_info["features"]

phase_mapping = preprocessing_info["phase_mapping"]

print("\nFeature columns:")
for feature in feature_columns:
    print(" -", feature)

print("\nPhase mapping:")
print(phase_mapping)


# ============================================================
# Load datasets
# ============================================================

train_df = pd.read_csv(TRAIN_FILE)
val_df = pd.read_csv(VAL_FILE)
test_df = pd.read_csv(TEST_FILE)

print("\nLoaded datasets:")
print("Train:", train_df.shape)
print("Validation:", val_df.shape)
print("Test:", test_df.shape)


# ============================================================
# Sort chronologically
# ============================================================

sort_columns = [
    "id",
    "study_interval",
    "day_in_study",
]

train_df = train_df.sort_values(sort_columns).reset_index(drop=True)
val_df = val_df.sort_values(sort_columns).reset_index(drop=True)
test_df = test_df.sort_values(sort_columns).reset_index(drop=True)


# ============================================================
# Create sequences
# ============================================================

def create_sequences(df, sequence_length):
    X = []
    y = []

    grouped = df.groupby(
        ["id", "study_interval"],
        sort=False
    )

    for _, group in grouped:

        group = group.sort_values("day_in_study")

        features = group[feature_columns].values
        targets = group["phase"].values

        if len(group) <= sequence_length:
            continue

        for i in range(sequence_length, len(group)):

            X.append(
                features[i - sequence_length:i]
            )

            y.append(
                phase_mapping[targets[i]]
            )

    return np.asarray(X, dtype=np.float32), np.asarray(y, dtype=np.int32)


print("\nCreating sequences...")

X_train, y_train = create_sequences(
    train_df,
    SEQUENCE_LENGTH
)

X_val, y_val = create_sequences(
    val_df,
    SEQUENCE_LENGTH
)

X_test, y_test = create_sequences(
    test_df,
    SEQUENCE_LENGTH
)


print("\nSequence shapes:")
print("X_train:", X_train.shape)
print("y_train:", y_train.shape)

print("X_val:", X_val.shape)
print("y_val:", y_val.shape)

print("X_test:", X_test.shape)
print("y_test:", y_test.shape)


# ============================================================
# Class weights
# ============================================================

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


# ============================================================
# Build regularized LSTM
# ============================================================

model = Sequential(
    [
        Input(
            shape=(
                SEQUENCE_LENGTH,
                len(feature_columns)
            )
        ),

        LSTM(
            48,
            return_sequences=True,
            kernel_regularizer=regularizers.l2(1e-4),
            recurrent_regularizer=regularizers.l2(1e-4),
        ),

        LayerNormalization(),

        Dropout(0.40),

        LSTM(
            24,
            kernel_regularizer=regularizers.l2(1e-4),
            recurrent_regularizer=regularizers.l2(1e-4),
        ),

        Dropout(0.40),

        Dense(
            24,
            activation="relu",
            kernel_regularizer=regularizers.l2(1e-4),
        ),

        Dropout(0.30),

        Dense(
            len(phase_mapping),
            activation="softmax"
        ),
    ]
)


# ============================================================
# Compile
# ============================================================

optimizer = tf.keras.optimizers.Adam(
    learning_rate=LEARNING_RATE
)

model.compile(
    optimizer=optimizer,
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)


print("\nModel summary:")
model.summary()


# ============================================================
# Callbacks
# ============================================================

early_stopping = EarlyStopping(
    monitor="val_loss",
    patience=8,
    restore_best_weights=True,
    verbose=1,
)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=3,
    min_lr=1e-6,
    verbose=1,
)

checkpoint = ModelCheckpoint(
    MODEL_FILE,
    monitor="val_loss",
    save_best_only=True,
    verbose=1,
)


# ============================================================
# Train
# ============================================================

print("\nStarting regularized 14-day LSTM training...\n")

history = model.fit(
    X_train,
    y_train,

    validation_data=(
        X_val,
        y_val
    ),

    epochs=EPOCHS,
    batch_size=BATCH_SIZE,

    class_weight=class_weights,

    callbacks=[
        early_stopping,
        reduce_lr,
        checkpoint,
    ],

    verbose=1,
)


# ============================================================
# Load best checkpoint
# ============================================================

print("\nLoading best model...")

model = tf.keras.models.load_model(
    MODEL_FILE
)


# ============================================================
# Validation evaluation
# ============================================================

val_loss, val_accuracy = model.evaluate(
    X_val,
    y_val,
    verbose=0
)

val_probabilities = model.predict(
    X_val,
    verbose=0
)

val_predictions = np.argmax(
    val_probabilities,
    axis=1
)

val_macro_f1 = f1_score(
    y_val,
    val_predictions,
    average="macro"
)

val_weighted_f1 = f1_score(
    y_val,
    val_predictions,
    average="weighted"
)


print("\n======================================")
print("VALIDATION RESULTS")
print("======================================")

print(f"Validation Loss      : {val_loss:.4f}")
print(f"Validation Accuracy  : {val_accuracy:.4f}")
print(f"Validation Macro F1  : {val_macro_f1:.4f}")
print(f"Validation Weighted F1: {val_weighted_f1:.4f}")


# ============================================================
# Test evaluation
# ============================================================

test_loss, test_accuracy = model.evaluate(
    X_test,
    y_test,
    verbose=0
)

test_probabilities = model.predict(
    X_test,
    verbose=0
)

test_predictions = np.argmax(
    test_probabilities,
    axis=1
)


test_macro_f1 = f1_score(
    y_test,
    test_predictions,
    average="macro"
)

test_weighted_f1 = f1_score(
    y_test,
    test_predictions,
    average="weighted"
)


# ============================================================
# Classification report
# ============================================================

reverse_mapping = {
    value: key
    for key, value in phase_mapping.items()
}

target_names = [
    reverse_mapping[i]
    for i in range(len(reverse_mapping))
]


report = classification_report(
    y_test,
    test_predictions,
    target_names=target_names,
    digits=4
)

print("\n======================================")
print("TEST RESULTS")
print("======================================")

print(f"Test Loss            : {test_loss:.4f}")
print(f"Test Accuracy        : {test_accuracy:.4f}")
print(f"Test Macro F1        : {test_macro_f1:.4f}")
print(f"Test Weighted F1     : {test_weighted_f1:.4f}")

print("\nClassification Report:")
print(report)


# ============================================================
# Confusion matrix
# ============================================================

cm = confusion_matrix(
    y_test,
    test_predictions
)

print("\nConfusion Matrix:")
print(cm)


# ============================================================
# Confidence analysis
# ============================================================

confidence = np.max(
    test_probabilities,
    axis=1
)

print("\nConfidence statistics:")

print(
    f"Mean confidence   : {confidence.mean():.4f}"
)

print(
    f"Median confidence : {np.median(confidence):.4f}"
)

print(
    f"Minimum confidence: {confidence.min():.4f}"
)

print(
    f"Maximum confidence: {confidence.max():.4f}"
)


# ============================================================
# Save predictions
# ============================================================

prediction_df = pd.DataFrame(
    {
        "true_phase": [
            reverse_mapping[int(x)]
            for x in y_test
        ],

        "predicted_phase": [
            reverse_mapping[int(x)]
            for x in test_predictions
        ],

        "confidence": confidence,
    }
)

prediction_file = (
    RESULT_DIR /
    "lstm_regularized_14d_test_predictions.csv"
)

prediction_df.to_csv(
    prediction_file,
    index=False
)


# ============================================================
# Save metrics
# ============================================================

metrics = {
    "sequence_length": SEQUENCE_LENGTH,

    "features": feature_columns,

    "validation": {
        "loss": float(val_loss),
        "accuracy": float(val_accuracy),
        "macro_f1": float(val_macro_f1),
        "weighted_f1": float(val_weighted_f1),
    },

    "test": {
        "loss": float(test_loss),
        "accuracy": float(test_accuracy),
        "macro_f1": float(test_macro_f1),
        "weighted_f1": float(test_weighted_f1),
    },

    "confidence": {
        "mean": float(confidence.mean()),
        "median": float(np.median(confidence)),
        "minimum": float(confidence.min()),
        "maximum": float(confidence.max()),
    },

    "class_weights": class_weights,
}


metrics_file = (
    RESULT_DIR /
    "lstm_regularized_14d_metrics.json"
)

with open(
    metrics_file,
    "w",
    encoding="utf-8"
) as f:
    json.dump(
        metrics,
        f,
        indent=4
    )


print("\n======================================")
print("FILES SAVED")
print("======================================")

print("Model:")
print(MODEL_FILE)

print("\nPredictions:")
print(prediction_file)

print("\nMetrics:")
print(metrics_file)

print("\nTraining completed successfully.")