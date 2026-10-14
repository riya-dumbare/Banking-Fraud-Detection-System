import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_recall_curve
from sklearn.model_selection import StratifiedKFold, cross_val_predict, cross_validate
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from ml.transformers import AnomalyScore

BASE_DIR = Path(__file__).resolve().parent            
DATA_PATH = BASE_DIR / "data" / "synthetic_transactions_v2.csv"
ML_DIR = BASE_DIR / "ml"

FEATURES = [
    "amount", "location_mismatch", "device_mismatch", "transaction_velocity",
    "ip_risk", "merchant_category", "account_age_days", "risk_history",
]
CATEGORICAL = ["merchant_category"]
NUMERIC = [f for f in FEATURES if f not in CATEGORICAL]

df = pd.read_csv(DATA_PATH, sep="\t")
df.columns = df.columns.str.strip()
X = df[FEATURES]
y = df["is_fraud"]
print("Class counts:\n", y.value_counts(), "\n")


def make_pre(scale=False):
    return ColumnTransformer(
        [
            ("category", OneHotEncoder(handle_unknown="ignore", sparse_output=False), CATEGORICAL),
            ("numeric", StandardScaler() if scale else "passthrough", NUMERIC),
        ]
    )


def make_rf():
    return RandomForestClassifier(
        n_estimators=150, max_depth=8, random_state=42, class_weight="balanced"
    )


def make_gb():
    return GradientBoostingClassifier(random_state=42)


def make_lr():
    return LogisticRegression(class_weight="balanced", max_iter=1000)


def pipe(clf, anomaly=False, scale=False):
    steps = [("pre", make_pre(scale))]
    if anomaly:
        steps.append(("anomaly", AnomalyScore()))
    steps.append(("clf", clf))
    return Pipeline(steps)


models = {
    "baseline_random_forest": pipe(make_rf()),
    "logistic_regression": pipe(make_lr(), scale=True),
    "rf_plus_anomaly": pipe(make_rf(), anomaly=True),
    "gradient_boosting_plus_anomaly": pipe(make_gb(), anomaly=True),
    "stacking_plus_anomaly": pipe(
        StackingClassifier(
            estimators=[
                ("rf", make_rf()),
                ("gb", make_gb()),
                ("lr", make_pipeline(StandardScaler(), make_lr())),
            ],
            final_estimator=LogisticRegression(max_iter=1000),
            cv=3,
        ),
        anomaly=True,
    ),
}

n_splits = min(5, int(y.value_counts().min()))
cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
scoring = ["precision", "recall", "f1", "roc_auc", "average_precision"]

rows = []
for name, model in models.items():
    r = cross_validate(model, X, y, cv=cv, scoring=scoring)
    row = {"model": name}
    for s in scoring:
        row[s] = f"{r['test_' + s].mean():.3f} +/- {r['test_' + s].std():.3f}"
        row[s + "_mean"] = r["test_" + s].mean()
    rows.append(row)

results = pd.DataFrame(rows)
show_cols = ["model"] + scoring
print(f"{n_splits}-fold stratified cross-validation (mean +/- std):\n")
print(results[show_cols].to_string(index=False))
results[show_cols].to_csv(ML_DIR / "model_comparison.csv", index=False)

best_name = results.loc[results["average_precision_mean"].idxmax(), "model"]
best = models[best_name]
print("\nBest model by F1:", best_name)

# Decision threshold that favours recall (F2), from out-of-fold probabilities
proba = cross_val_predict(best, X, y, cv=cv, method="predict_proba")[:, 1]
p, r, t = precision_recall_curve(y, proba)
f2 = 5 * p[:-1] * r[:-1] / (4 * p[:-1] + r[:-1] + 1e-9)
threshold = float(t[np.argmax(f2)])
print("Suggested threshold (F2):", round(threshold, 3))

best.fit(X, y)
joblib.dump(best, ML_DIR / "fraud_model_v2.pkl")
(ML_DIR / "model_info.json").write_text(
    json.dumps({"model": best_name, "threshold": threshold, "features": FEATURES}, indent=2)
)
print("Saved: ml/fraud_model_v2.pkl, ml/model_comparison.csv, ml/model_info.json")