import os
import random
import numpy as np
import pandas as pd
import tensorflow as tf

from sklearn.metrics import (
    accuracy_score,
    f1_score,
    classification_report
)
from sklearn.utils.class_weight import compute_class_weight


# =========================================================
# Configuration
# =========================================================

BASE_DIR = r"C:\projects\SakhiAI\ai_research"

DATA_DIR = os.path.join(
    BASE_DIR,
    "data",
    "processed"
)

RESULTS_DIR = os.path.join(
    BASE_DIR,
    "results"
)

os.makedirs(RESULTS_DIR, exist_ok=True)


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


# Test several temporal windows
SEQUENCE_LENGTHS = [7, 14, 21, 28]

EPOCHS = 35
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

print("Loading datasets...")

train_df = pd.read_csv(
    os.path.join(DATA_DIR, "lstm_train.csv")
)

val_df = pd.read_csv(
    os.path.join(DATA_DIR, "lstm_validation.csv")
)

test_df = pd.read_csv(
    os.path.join(DATA_DIR, "lstm_test.csv")
)


# =========================================================
# Sequence creation
# =========================================================

def create_sequences(df, sequence_length):

    X = []
    y = []

    grouped = df.groupby(
        ["id", "study_interval"],
        sort=False
    )

    for (_, _), group in grouped:

        group = group.sort_values(
            "day_in_study"
        )

        values = group[
            FEATURES
        ].values.astype(np.float32)

        labels = group[
            "phase_label"
        ].values.astype(np.int32)

        if len(group) < sequence_length:
            continue

        for i in range(
            sequence_length - 1,
            len(group)
        ):

            X.append(
                values[
                    i - sequence_length + 1:i + 1
                ]
            )

            y.append(
                labels[i]
            )

    return (
        np.array(X, dtype=np.float32),
        np.array(y, dtype=np.int32)
    )


# =========================================================
# Model builder
# =========================================================

def build_model(sequence_length):

    model = tf.keras.Sequential([

        tf.keras.layers.Input(
            shape=(
                sequence_length,
                len(FEATURES)
            )
        ),

        tf.keras.layers.LSTM(
            64,
            return_sequences=True
        ),

        tf.keras.layers.Dropout(
            0.30
        ),

        tf.keras.layers.LSTM(
            32
        ),

        tf.keras.layers.Dropout(
            0.30
        ),

        tf.keras.layers.Dense(
            32,
            activation="relu"
        ),

        tf.keras.layers.Dropout(
            0.20
        ),

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

    return model


# =========================================================
# Results
# =========================================================

results = []


# =========================================================
# Run experiments
# =========================================================

for sequence_length in SEQUENCE_LENGTHS:

    print("\n")
    print("=" * 70)
    print(
        f"EXPERIMENT: {sequence_length}-DAY SEQUENCE"
    )
    print("=" * 70)

    # -----------------------------------------------------
    # Create sequences
    # -----------------------------------------------------

    X_train, y_train = create_sequences(
        train_df,
        sequence_length
    )

    X_val, y_val = create_sequences(
        val_df,
        sequence_length
    )

    X_test, y_test = create_sequences(
        test_df,
        sequence_length
    )

    print(
        f"Train: {X_train.shape}"
    )

    print(
        f"Validation: {X_val.shape}"
    )

    print(
        f"Test: {X_test.shape}"
    )

    # -----------------------------------------------------
    # Class weights
    # -----------------------------------------------------

    classes = np.unique(y_train)

    weights = compute_class_weight(
        class_weight="balanced",
        classes=classes,
        y=y_train
    )

    class_weights = {
        int(c): float(w)
        for c, w in zip(
            classes,
            weights
        )
    }

    # -----------------------------------------------------
    # Build model
    # -----------------------------------------------------

    model = build_model(
        sequence_length
    )

    # -----------------------------------------------------
    # Callbacks
    # -----------------------------------------------------

    callbacks = [

        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=6,
            restore_best_weights=True
        ),

        tf.keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=3,
            min_lr=1e-6
        )
    ]

    # -----------------------------------------------------
    # Train
    # -----------------------------------------------------

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

        callbacks=callbacks,

        verbose=1
    )

    # -----------------------------------------------------
    # Test
    # -----------------------------------------------------

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

    print("\nRESULT")

    print(
        f"Sequence length: {sequence_length}"
    )

    print(
        f"Accuracy: {accuracy:.4f}"
    )

    print(
        f"Macro F1: {macro_f1:.4f}"
    )

    print(
        f"Weighted F1: {weighted_f1:.4f}"
    )

    print("\nClassification report:")

    print(
        classification_report(
            y_test,
            predictions,
            target_names=PHASE_NAMES,
            digits=4
        )
    )

    # -----------------------------------------------------
    # Save result
    # -----------------------------------------------------

    results.append({

        "sequence_length": sequence_length,

        "train_sequences": len(X_train),

        "validation_sequences": len(X_val),

        "test_sequences": len(X_test),

        "accuracy": accuracy,

        "macro_f1": macro_f1,

        "weighted_f1": weighted_f1
    })


# =========================================================
# Comparison
# =========================================================

results_df = pd.DataFrame(
    results
)

results_df = results_df.sort_values(
    "macro_f1",
    ascending=False
)

print("\n")
print("=" * 70)
print("SEQUENCE EXPERIMENT COMPARISON")
print("=" * 70)

print(
    results_df.to_string(
        index=False
    )
)


results_path = os.path.join(
    RESULTS_DIR,
    "sequence_experiments.csv"
)

results_df.to_csv(
    results_path,
    index=False
)


print("\nSaved:")
print(results_path)

print("\nExperiment complete.")