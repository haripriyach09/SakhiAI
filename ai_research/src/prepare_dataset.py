from pathlib import Path
import pandas as pd


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[1]

RAW_DIR = BASE_DIR / "data" / "raw"
PROCESSED_DIR = BASE_DIR / "data" / "processed"

PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------
# Load data
# ---------------------------------------------------------

print("Loading mcPHASES files...")

hormones = pd.read_csv(
    RAW_DIR / "hormones_and_selfreport.csv"
)

sleep = pd.read_csv(
    RAW_DIR / "sleep_score.csv"
)

stress = pd.read_csv(
    RAW_DIR / "stress_score.csv"
)

heart_rate = pd.read_csv(
    RAW_DIR / "resting_heart_rate.csv"
)


# ---------------------------------------------------------
# Common key
# ---------------------------------------------------------

KEY = [
    "id",
    "study_interval",
    "day_in_study"
]


# ---------------------------------------------------------
# 1. Hormones + self-report
# ---------------------------------------------------------

# There should be one row per participant/day.
# Keep the original phase as our prediction target.

hormones = hormones.drop_duplicates(KEY)

print(
    f"Hormones/self-report rows: {len(hormones)}"
)


# ---------------------------------------------------------
# 2. Sleep aggregation
# ---------------------------------------------------------

sleep_numeric = [
    "overall_score",
    "composition_score",
    "revitalization_score",
    "duration_score",
    "deep_sleep_in_minutes",
    "resting_heart_rate",
    "restlessness"
]

sleep_daily = (
    sleep.groupby(KEY, as_index=False)[sleep_numeric]
    .mean()
)

print(
    f"Sleep participant-day rows: {len(sleep_daily)}"
)


# ---------------------------------------------------------
# 3. Stress aggregation
# ---------------------------------------------------------

stress_numeric = [
    "stress_score",
    "sleep_points",
    "max_sleep_points",
    "responsiveness_points",
    "max_responsiveness_points",
    "exertion_points",
    "max_exertion_points"
]

stress_daily = (
    stress.groupby(KEY, as_index=False)[stress_numeric]
    .mean()
)

print(
    f"Stress participant-day rows: {len(stress_daily)}"
)


# ---------------------------------------------------------
# 4. Resting heart-rate aggregation
# ---------------------------------------------------------

heart_rate_daily = (
    heart_rate
    .groupby(KEY, as_index=False)["value"]
    .mean()
    .rename(
        columns={
            "value": "resting_hr_daily"
        }
    )
)

print(
    f"Heart-rate participant-day rows: "
    f"{len(heart_rate_daily)}"
)


# ---------------------------------------------------------
# 5. Merge datasets
# ---------------------------------------------------------

dataset = hormones.merge(
    sleep_daily,
    on=KEY,
    how="left"
)

dataset = dataset.merge(
    stress_daily,
    on=KEY,
    how="left"
)

dataset = dataset.merge(
    heart_rate_daily,
    on=KEY,
    how="left"
)


# ---------------------------------------------------------
# 6. Remove the one missing target
# ---------------------------------------------------------

before = len(dataset)

dataset = dataset.dropna(
    subset=["phase"]
)

after = len(dataset)

print(
    f"Removed {before - after} rows "
    f"without a phase label."
)


# ---------------------------------------------------------
# 7. Sort chronologically
# ---------------------------------------------------------

dataset = dataset.sort_values(
    ["id", "study_interval", "day_in_study"]
).reset_index(drop=True)


# ---------------------------------------------------------
# 8. Save merged dataset
# ---------------------------------------------------------

output_file = (
    PROCESSED_DIR /
    "mcphases_daily_merged.csv"
)

dataset.to_csv(
    output_file,
    index=False
)


# ---------------------------------------------------------
# 9. Dataset summary
# ---------------------------------------------------------

print("\n----------------------------------------")
print("DATASET CREATED")
print("----------------------------------------")

print(f"Rows: {len(dataset)}")

print(
    f"Participants: "
    f"{dataset['id'].nunique()}"
)

print("\nPhase distribution:")

print(
    dataset["phase"]
    .value_counts()
)

print("\nMissing values:")

print(
    dataset.isna().sum()
    .sort_values(ascending=False)
    .head(15)
)

print(
    f"\nSaved to:\n{output_file}"
)