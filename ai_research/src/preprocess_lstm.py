import os
import json
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

DATA_PATH = r"C:\projects\SakhiAI\ai_research\data\processed\mcphases_daily_merged.csv"

OUTPUT_DIR = r"C:\projects\SakhiAI\ai_research\data\processed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Loading processed mcPHASES dataset...")

df = pd.read_csv(DATA_PATH)

# ---------------------------------------------------------
# 1. Selected features
# ---------------------------------------------------------

NUMERIC_FEATURES = [
    "lh",
    "estrogen",
    "pdg",
    "overall_score",
    "deep_sleep_in_minutes",
    "resting_hr_daily",
    "restlessness",
    "stress_score",
]

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

TARGET = "phase"

print(f"Initial rows: {len(df)}")

# ---------------------------------------------------------
# 2. Convert categorical severity variables to numbers
# ---------------------------------------------------------

severity_map = {
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

for col in CATEGORICAL_FEATURES:
    df[col] = df[col].map(severity_map)

# ---------------------------------------------------------
# 3. Keep only required columns
# ---------------------------------------------------------

FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES

model_df = df[
    ["id", "study_interval", "day_in_study", TARGET] + FEATURES
].copy()

# ---------------------------------------------------------
# 4. Remove rows without target
# ---------------------------------------------------------

model_df = model_df.dropna(subset=[TARGET])

print(f"Rows after target cleaning: {len(model_df)}")

# ---------------------------------------------------------
# 5. Participant-level split
# ---------------------------------------------------------

participants = model_df["id"].unique()

train_ids, temp_ids = train_test_split(
    participants,
    test_size=0.30,
    random_state=42
)

val_ids, test_ids = train_test_split(
    temp_ids,
    test_size=0.50,
    random_state=42
)

train_df = model_df[model_df["id"].isin(train_ids)].copy()
val_df = model_df[model_df["id"].isin(val_ids)].copy()
test_df = model_df[model_df["id"].isin(test_ids)].copy()

print("\nParticipant split:")
print(f"Training participants:   {len(train_ids)}")
print(f"Validation participants: {len(val_ids)}")
print(f"Test participants:       {len(test_ids)}")

print("\nRows:")
print(f"Training:   {len(train_df)}")
print(f"Validation: {len(val_df)}")
print(f"Test:       {len(test_df)}")

# ---------------------------------------------------------
# 6. Missing value handling
# ---------------------------------------------------------
# IMPORTANT:
# Medians are calculated ONLY from training data.
# This prevents data leakage.

medians = train_df[FEATURES].median()

train_df[FEATURES] = train_df[FEATURES].fillna(medians)
val_df[FEATURES] = val_df[FEATURES].fillna(medians)
test_df[FEATURES] = test_df[FEATURES].fillna(medians)

# ---------------------------------------------------------
# 7. Feature scaling
# ---------------------------------------------------------

scaler = StandardScaler()

train_df[FEATURES] = scaler.fit_transform(
    train_df[FEATURES]
)

val_df[FEATURES] = scaler.transform(
    val_df[FEATURES]
)

test_df[FEATURES] = scaler.transform(
    test_df[FEATURES]
)

# Save the exact scaler fitted on training participants.
# This will be reused during model inference.
scaler_path = os.path.join(
    OUTPUT_DIR,
    "lstm_scaler.joblib"
)

joblib.dump(scaler, scaler_path)

print(f"\nSaved scaler: {scaler_path}")

# ---------------------------------------------------------
# 8. Encode phase labels
# ---------------------------------------------------------

phase_mapping = {
    "Menstrual": 0,
    "Follicular": 1,
    "Fertility": 2,
    "Luteal": 3,
}

for dataset in [train_df, val_df, test_df]:
    dataset["phase_label"] = dataset[TARGET].map(phase_mapping)

# ---------------------------------------------------------
# 9. Sort chronologically
# ---------------------------------------------------------

for dataset in [train_df, val_df, test_df]:
    dataset.sort_values(
        ["id", "study_interval", "day_in_study"],
        inplace=True
    )

# ---------------------------------------------------------
# 10. Save processed splits
# ---------------------------------------------------------

train_path = os.path.join(
    OUTPUT_DIR,
    "lstm_train.csv"
)

val_path = os.path.join(
    OUTPUT_DIR,
    "lstm_validation.csv"
)

test_path = os.path.join(
    OUTPUT_DIR,
    "lstm_test.csv"
)

train_df.to_csv(train_path, index=False)
val_df.to_csv(val_path, index=False)
test_df.to_csv(test_path, index=False)

# ---------------------------------------------------------
# 11. Save preprocessing information
# ---------------------------------------------------------

preprocessing_info = {
    "features": FEATURES,
    "numeric_features": NUMERIC_FEATURES,
    "categorical_features": CATEGORICAL_FEATURES,
    "phase_mapping": phase_mapping,
    "train_participants": train_ids.tolist(),
    "validation_participants": val_ids.tolist(),
    "test_participants": test_ids.tolist(),
    "feature_medians": medians.to_dict(),
}

info_path = os.path.join(
    OUTPUT_DIR,
    "lstm_preprocessing_info.json"
)

with open(info_path, "w") as f:
    json.dump(preprocessing_info, f, indent=4)

# ---------------------------------------------------------
# 12. Final verification
# ---------------------------------------------------------

print("\n" + "=" * 60)
print("LSTM PREPROCESSING COMPLETE")
print("=" * 60)

print("\nFeatures:")
for feature in FEATURES:
    print(f"  - {feature}")

print("\nPhase distribution:")

print("\nTraining:")
print(train_df[TARGET].value_counts())

print("\nValidation:")
print(val_df[TARGET].value_counts())

print("\nTesting:")
print(test_df[TARGET].value_counts())

print("\nRemaining missing values:")

print(
    "Train:",
    train_df[FEATURES].isna().sum().sum()
)

print(
    "Validation:",
    val_df[FEATURES].isna().sum().sum()
)

print(
    "Test:",
    test_df[FEATURES].isna().sum().sum()
)

print("\nSaved files:")
print(train_path)
print(val_path)
print(test_path)
print(info_path)
print(scaler_path)