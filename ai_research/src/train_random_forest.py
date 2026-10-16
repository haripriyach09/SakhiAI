import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
)
from sklearn.model_selection import GridSearchCV


BASE_DIR = Path(__file__).resolve().parents[1]

DATA_DIR = BASE_DIR / "data" / "processed"
MODEL_DIR = BASE_DIR / "models"
RESULTS_DIR = BASE_DIR / "results"

MODEL_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)


TRAIN_FILE = DATA_DIR / "lstm_train.csv"
VAL_FILE = DATA_DIR / "lstm_validation.csv"
TEST_FILE = DATA_DIR / "lstm_test.csv"

PREPROCESSING_FILE = DATA_DIR / "lstm_preprocessing_info.json"


print("Loading processed datasets...")

train_df = pd.read_csv(TRAIN_FILE)
val_df = pd.read_csv(VAL_FILE)
test_df = pd.read_csv(TEST_FILE)

with open(PREPROCESSING_FILE, "r", encoding="utf-8") as f:
    preprocessing_info = json.load(f)

feature_columns = preprocessing_info["features"]

print(f"Features: {len(feature_columns)}")
print(feature_columns)

X_train = train_df[feature_columns].values
y_train = train_df["phase"].values

X_val = val_df[feature_columns].values
y_val = val_df["phase"].values

X_test = test_df[feature_columns].values
y_test = test_df["phase"].values


# ---------------------------------------------------------
# Hyperparameter search using TRAIN + VALIDATION only
# ---------------------------------------------------------

print("\nPreparing validation-based model selection...")

X_train_val = np.concatenate([X_train, X_val], axis=0)
y_train_val = np.concatenate([y_train, y_val], axis=0)

# Keep the validation set separate during model selection.
# We use a small parameter grid to avoid unnecessary computation.

param_grid = {
    "n_estimators": [200, 400],
    "max_depth": [None, 12],
    "min_samples_leaf": [1, 3],
    "max_features": ["sqrt"],
}

print("\nRunning Random Forest grid search...")

rf = RandomForestClassifier(
    random_state=42,
    class_weight="balanced",
    n_jobs=-1,
)

grid_search = GridSearchCV(
    estimator=rf,
    param_grid=param_grid,
    scoring="f1_macro",
    cv=3,
    n_jobs=-1,
    verbose=1,
)

grid_search.fit(X_train_val, y_train_val)

print("\nBest parameters:")
print(grid_search.best_params_)

print(f"Best CV macro F1: {grid_search.best_score_:.4f}")


# ---------------------------------------------------------
# Train final Random Forest
# ---------------------------------------------------------

best_params = grid_search.best_params_

final_model = RandomForestClassifier(
    **best_params,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1,
)

print("\nTraining final Random Forest...")

final_model.fit(X_train_val, y_train_val)


# ---------------------------------------------------------
# Final test evaluation
# ---------------------------------------------------------

print("\nEvaluating on held-out TEST participants...")

y_pred = final_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
macro_f1 = f1_score(y_test, y_pred, average="macro")
weighted_f1 = f1_score(y_test, y_pred, average="weighted")

print("\n==============================")
print("RANDOM FOREST TEST RESULTS")
print("==============================")

print(f"Accuracy:    {accuracy:.4f}")
print(f"Macro F1:    {macro_f1:.4f}")
print(f"Weighted F1: {weighted_f1:.4f}")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        target_names=["Menstrual", "Follicular", "Fertility", "Luteal"],
        digits=4,
    )
)

print("\nConfusion Matrix:")
cm = confusion_matrix(
    y_test,
    y_pred,
    labels=["Menstrual", "Follicular", "Fertility", "Luteal"],
)

print(cm)


# ---------------------------------------------------------
# Feature importance
# ---------------------------------------------------------

importance = pd.DataFrame(
    {
        "feature": feature_columns,
        "importance": final_model.feature_importances_,
    }
).sort_values("importance", ascending=False)

print("\nFeature importance:")
print(importance.to_string(index=False))


# ---------------------------------------------------------
# Save model
# ---------------------------------------------------------

model_path = MODEL_DIR / "menstrual_phase_random_forest.joblib"

joblib.dump(final_model, model_path)

print(f"\nModel saved to:")
print(model_path)


# ---------------------------------------------------------
# Save metrics
# ---------------------------------------------------------

metrics = {
    "model": "Random Forest",
    "features": feature_columns,
    "best_parameters": best_params,
    "cv_macro_f1": float(grid_search.best_score_),
    "test_accuracy": float(accuracy),
    "test_macro_f1": float(macro_f1),
    "test_weighted_f1": float(weighted_f1),
    "confusion_matrix": cm.tolist(),
    "feature_importance": [
        {
            "feature": row["feature"],
            "importance": float(row["importance"]),
        }
        for _, row in importance.iterrows()
    ],
}

metrics_path = RESULTS_DIR / "random_forest_metrics.json"

with open(metrics_path, "w", encoding="utf-8") as f:
    json.dump(metrics, f, indent=2)

print(f"\nMetrics saved to:")
print(metrics_path)

print("\nRandom Forest experiment completed.")