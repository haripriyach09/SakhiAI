import pandas as pd

DATA_PATH = r"C:\projects\SakhiAI\ai_research\data\processed\mcphases_daily_merged.csv"

print("Loading processed dataset...")
df = pd.read_csv(DATA_PATH)

print("\n" + "=" * 60)
print("DATASET OVERVIEW")
print("=" * 60)

print(f"Rows: {len(df)}")
print(f"Columns: {len(df.columns)}")
print(f"Participants: {df['id'].nunique()}")

print("\nColumns:")
for col in df.columns:
    print(f"- {col}: {df[col].dtype}")

print("\n" + "=" * 60)
print("MISSING VALUES")
print("=" * 60)

missing = df.isna().sum()

for col, count in missing.items():
    if count > 0:
        percentage = (count / len(df)) * 100
        print(f"{col}: {count} ({percentage:.2f}%)")

print("\n" + "=" * 60)
print("NUMERIC FEATURE SUMMARY")
print("=" * 60)

numeric_cols = df.select_dtypes(include="number").columns

print(df[numeric_cols].describe().T)

print("\n" + "=" * 60)
print("CATEGORICAL / TEXT VALUES")
print("=" * 60)

categorical_cols = df.select_dtypes(include=["object"]).columns

for col in categorical_cols:
    print(f"\n{col}")
    print(df[col].value_counts(dropna=False).head(20))

print("\n" + "=" * 60)
print("PHASE DISTRIBUTION BY PARTICIPANT")
print("=" * 60)

participant_phase = pd.crosstab(
    df["id"],
    df["phase"]
)

print(participant_phase)

print("\nInspection complete.")