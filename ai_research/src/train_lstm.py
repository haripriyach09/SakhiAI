import os
import random
import numpy as np
import pandas as pd
import tensorflow as tf

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score
)
from sklearn.utils.class_weight import compute_class_weight

# =========================================================
# Configuration
# =========================================================

BASE_DIR = r"C:\projects\SakhiAI\ai_research"

DATA_DIR = os.path.join(BASE_DIR, "data", "processed")
MODEL_DIR = os.path.join(BASE_DIR, "models")
RESULTS_DIR = os.path.join(BASE_DIR, "results")

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

TRAIN_PATH = os.path.join(DATA_DIR, "lstm_train.csv")
VAL_PATH = os.path.join(DATA_DIR, "lstm_validation.csv")
TEST_PATH = os.path.join(DATA_DIR, "lstm_test.csv")

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "menstrual_phase_lstm.keras"
)

# Sequence length
SEQUENCE_LENGTH = 7

# Training parameters
EPOCHS = 50
BATCH_SIZE = 32
RANDOM_STATE = 42

# =========================================================
# Reproducibility
# =========================================================

np.random.seed(RANDOM_STATE)
random.seed(RANDOM_STATE)
tf.random.set_seed(RANDOM_STATE)

# =========================================================
# Load datasets
# =========================================================

print("Loading processed datasets...")

train_df = pd.read_csv(TRAIN_PATH)
val_df = pd.read_csv(VAL_PATH)
test_df = pd.read_csv(TEST_PATH)

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

TARGET = "phase_label"

print(f"Training rows:   {len(train_df)}")
print(f"Validation rows: {len(val_df)}")
print(f"Testing rows:    {len(test_df)}")

# =========================================================
# Sequence creation
# =========================================================

def create_sequences(df, sequence_length=7):
    """
    Creates chronological sequences separately for each participant
    and study interval.

    Each sequence contains the previous `sequence_length` days.
    The target is the phase of the final day.
    """

    X = []
    y = []

    grouped = df.groupby(
        ["id", "study_interval"],
        sort=False
    )

    for (_, _), group in grouped:

        group = group.sort_values("day_in_study")

        values = group[FEATURES].values.astype(np.float32)
        labels = group[TARGET].values.astype(np.int32)

        if len(group) < sequence_length:
            continue

        for i in range(sequence_length - 1, len(group)):

            sequence = values[
                i - sequence_length + 1:i + 1
            ]

            target = labels[i]

            X.append(sequence)
            y.append(target)

    return np.array(X, dtype=np.float32), np.array(y, dtype=np.int32)


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

# =========================================================
# Class weights
# =========================================================

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

# =========================================================
# Build LSTM
# =========================================================

print("\nBuilding LSTM model...")

model = tf.keras.Sequential([
    tf.keras.layers.Input(
        shape=(SEQUENCE_LENGTH, len(FEATURES))
    ),

    tf.keras.layers.LSTM(
        64,
        return_sequences=True
    ),

    tf.keras.layers.Dropout(0.30),

    tf.keras.layers.LSTM(
        32
    ),

    tf.keras.layers.Dropout(0.30),

    tf.keras.layers.Dense(
        32,
        activation="relu"
    ),

    tf.keras.layers.Dropout(0.20),

    tf.keras.layers.Dense(
        4,
        activation="softmax"
    )
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# =========================================================
# Callbacks
# =========================================================

callbacks = [

    tf.keras.callbacks.EarlyStopping(
        monitor="val_loss",
        patience=8,
        restore_best_weights=True
    ),

    tf.keras.callbacks.ReduceLROnPlateau(
        monitor="val_loss",
        factor=0.5,
        patience=4,
        min_lr=1e-6
    ),

    tf.keras.callbacks.ModelCheckpoint(
        MODEL_PATH,
        monitor="val_loss",
        save_best_only=True
    )
]

# =========================================================
# Train
# =========================================================

print("\n" + "=" * 60)
print("STARTING LSTM TRAINING")
print("=" * 60)

history = model.fit(
    X_train,
    y_train,
    validation_data=(X_val, y_val),
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    class_weight=class_weights,
    callbacks=callbacks,
    verbose=1
)

# =========================================================
# Load best model
# =========================================================

print("\nLoading best model...")

model = tf.keras.models.load_model(MODEL_PATH)

# =========================================================
# Evaluate
# =========================================================

print("\n" + "=" * 60)
print("TEST EVALUATION")
print("=" * 60)

test_loss, test_accuracy = model.evaluate(
    X_test,
    y_test,
    verbose=0
)

probabilities = model.predict(
    X_test,
    verbose=0
)

predictions = np.argmax(
    probabilities,
    axis=1
)

weighted_f1 = f1_score(
    y_test,
    predictions,
    average="weighted"
)

macro_f1 = f1_score(
    y_test,
    predictions,
    average="macro"
)

accuracy = accuracy_score(
    y_test,
    predictions
)

print(f"\nTest Loss:       {test_loss:.4f}")
print(f"Test Accuracy:   {accuracy:.4f}")
print(f"Weighted F1:     {weighted_f1:.4f}")
print(f"Macro F1:        {macro_f1:.4f}")

# =========================================================
# Classification report
# =========================================================

phase_names = [
    "Menstrual",
    "Follicular",
    "Fertility",
    "Luteal"
]

report = classification_report(
    y_test,
    predictions,
    target_names=phase_names,
    digits=4
)

print("\nClassification Report:")
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

# =========================================================
# Save results
# =========================================================

results_path = os.path.join(
    RESULTS_DIR,
    "lstm_results.txt"
)

with open(results_path, "w") as f:

    f.write("SakhiAI Menstrual Phase LSTM Results\n")
    f.write("=" * 50 + "\n\n")

    f.write(f"Sequence length: {SEQUENCE_LENGTH}\n")
    f.write(f"Features: {len(FEATURES)}\n")

    f.write(f"\nTraining sequences: {len(X_train)}")
    f.write(f"\nValidation sequences: {len(X_val)}")
    f.write(f"\nTest sequences: {len(X_test)}")

    f.write("\n\nMetrics\n")
    f.write("-" * 30 + "\n")

    f.write(f"Test Loss: {test_loss:.4f}\n")
    f.write(f"Test Accuracy: {accuracy:.4f}\n")
    f.write(f"Weighted F1: {weighted_f1:.4f}\n")
    f.write(f"Macro F1: {macro_f1:.4f}\n")

    f.write("\nClassification Report\n")
    f.write("-" * 30 + "\n")
    f.write(report)

    f.write("\nConfusion Matrix\n")
    f.write("-" * 30 + "\n")
    f.write(str(cm))

print("\n" + "=" * 60)
print("TRAINING COMPLETE")
print("=" * 60)

print("\nModel saved:")
print(MODEL_PATH)

print("\nResults saved:")
print(results_path)