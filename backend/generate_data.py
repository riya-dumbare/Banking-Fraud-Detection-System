from pathlib import Path

import numpy as np
import pandas as pd

BASE = Path(__file__).resolve().parent
OUT = BASE / "data" / "synthetic_transactions_v2.csv"   # original file is not touched

rng = np.random.default_rng(42)
N = 1500
TARGET_FRAUD_RATE = 0.20     # change to taste

merchants = ["City ATM", "TechZone", "QuickFuel", "UPI Transfer", "Gold Palace",
             "Metro Mart", "GameHub", "SkyWays"]
categories = ["Travel", "Grocery", "Fuel", "Electronics", "Jewellery",
              "Online Transfer", "Gaming", "ATM Withdrawal"]
locations = ["Delhi", "Kolkata", "Mumbai", "Singapore", "Bengaluru", "London", "Dubai", "Chennai"]

# How much each category raises fraud risk (log-odds)
category_risk = {"Gaming": 0.5, "Online Transfer": 0.5, "ATM Withdrawal": 0.4,
                 "Jewellery": 0.3, "Electronics": 0.2, "Travel": 0.1,
                 "Grocery": -0.3, "Fuel": -0.3}

df = pd.DataFrame({
    "transaction_ref": [f"TXN{i:05d}" for i in range(1, N + 1)],
    "customer_id": rng.integers(1, 11, N),
    "amount": np.round(np.clip(rng.lognormal(7.1, 0.9, N), 50, 20000), 2),
    "merchant": rng.choice(merchants, N),
    "merchant_category": rng.choice(categories, N),
    "location": rng.choice(locations, N),
    "device_id": [f"DEV-{d}" for d in rng.integers(100, 1000, N)],
    "location_mismatch": (rng.random(N) < 0.20).astype(int),
    "device_mismatch": (rng.random(N) < 0.15).astype(int),
    "transaction_velocity": rng.integers(1, 10, N),
    "ip_risk": rng.integers(0, 100, N),
    "account_age_days": rng.integers(20, 2200, N),
    "risk_history": rng.integers(0, 9, N),
})

# Fraud probability depends on the features (log-odds model) plus random noise from sampling
base = (
    1.5 * df["location_mismatch"]
    + 1.3 * df["device_mismatch"]
    + 0.25 * df["transaction_velocity"]
    + 0.025 * df["ip_risk"]
    + 0.18 * df["risk_history"]
    - 0.0006 * df["account_age_days"]
    + 0.45 * np.log(df["amount"] / 1000)
    + df["merchant_category"].map(category_risk)
).to_numpy()

sigmoid = lambda z: 1 / (1 + np.exp(-z))

# Find the intercept that gives the target fraud rate
lo, hi = -20.0, 10.0
for _ in range(60):
    mid = (lo + hi) / 2
    if sigmoid(base + mid).mean() > TARGET_FRAUD_RATE:
        hi = mid
    else:
        lo = mid

df["is_fraud"] = (rng.random(N) < sigmoid(base + mid)).astype(int)

OUT.parent.mkdir(exist_ok=True)
df.to_csv(OUT, sep="\t", index=False)

print("Saved:", OUT)
print("Fraud rate:", round(df["is_fraud"].mean(), 3))
print(df.corr(numeric_only=True)["is_fraud"].sort_values().round(3))