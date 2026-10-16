import sys
from pathlib import Path

import pandas as pd


# Allow importing backend modules from the project root
PROJECT_ROOT = Path(__file__).resolve().parents[2]

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


from backend.app.services.menstrual_ai import predict_menstrual_phase


DATA_PATH = (
    PROJECT_ROOT
    / "ai_research"
    / "data"
    / "processed"
    / "mcphases_daily_merged.csv"
)


def main():
    print("=" * 60)
    print("SAKHIAI MENSTRUAL AI INFERENCE TEST")
    print("=" * 60)

    df = pd.read_csv(DATA_PATH)

    # Keep observations in chronological order
    df = df.sort_values(
        ["id", "study_interval", "day_in_study"]
    )

    # Find one participant/interval containing at least 7 days
    selected_rows = None

    for (_, _), group in df.groupby(
        ["id", "study_interval"]
    ):
        if len(group) >= 7:
            selected_rows = group.head(7).copy()
            break

    if selected_rows is None:
        raise RuntimeError(
            "Could not find a seven-day sequence."
        )

    feature_rows = selected_rows.to_dict(
        orient="records"
    )

    result = predict_menstrual_phase(
        feature_rows
    )

    print("\nActual phases in selected sequence:")
    print(
        selected_rows["phase"].tolist()
    )

    print("\nAI predicted phase:")
    print(
        result["predicted_phase"]
    )

    print("\nAI confidence:")
    print(
        f"{result['confidence'] * 100:.2f}%"
    )

    print("\nPhase probabilities:")

    for phase, probability in result[
        "probabilities"
    ].items():
        print(
            f"  {phase:<12} "
            f"{probability * 100:.2f}%"
        )

    print("\nSequence length:")
    print(result["sequence_length"])

    print("\nNumber of features:")
    print(len(result["features_used"]))

    print("\n" + "=" * 60)
    print("INFERENCE TEST COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    main()