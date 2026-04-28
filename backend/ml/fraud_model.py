from pathlib import Path
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

BASE_DIR = Path(__file__).parent
MODEL_PATH = BASE_DIR / "fraud_model.pkl"
DATA_PATH = BASE_DIR.parent / "data" / "synthetic_transactions.csv"

FEATURES = [
    "amount", "location_mismatch", "device_mismatch", "transaction_velocity",
    "ip_risk", "merchant_category", "account_age_days", "risk_history",
    "is_weekend"
]

def train_model():
    df = pd.read_csv(DATA_PATH, sep="\t")
    df.columns = df.columns.str.strip()
    print(df.columns)
    X = df[FEATURES]
    y = df["is_fraud"]
    preprocessor = ColumnTransformer(
        transformers=[("category", OneHotEncoder(handle_unknown="ignore"), ["merchant_category"])],
        remainder="passthrough"
    )
    model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(
        n_estimators=150,
        max_depth=8,
        random_state=42,
        class_weight="balanced"
    ))
    ])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    joblib.dump(model, MODEL_PATH)
    return accuracy

def load_model():
    if not MODEL_PATH.exists():
        train_model()
    return joblib.load(MODEL_PATH)

def predict_fraud(payload):
    model = load_model()
    row = pd.DataFrame([{feature: payload.get(feature, 0) for feature in FEATURES}])
    
    # calculating is_weekend from current day - weekday() returns 5 for Saturday, 6 for Sunday
    from datetime import datetime
    row.loc[0, "is_weekend"] = 1 if datetime.now().weekday() >= 5 else 0
    if not row.loc[0, "merchant_category"]:
        row.loc[0, "merchant_category"] = "Online Transfer"
    probability = float(model.predict_proba(row)[0][1])
    score = round(probability * 100, 2)
    if score >= 75:
        level = "High"
        label = "Fraud"
    elif score >= 45:
        level = "Medium"
        label = "Fraud"
    else:
        level = "Low"
        label = "Not Fraud"
    return {"prediction": label, "fraud_score": score, "risk_level": level}

if __name__ == "__main__":
    print(f"Model trained. Accuracy: {train_model():.2%}")