import csv
from pathlib import Path
from database.connection import execute_query, fetch_all
from ml.fraud_model import predict_fraud, train_model

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "synthetic_transactions.csv"

def seed_transactions():
    train_model()
    with DATA_FILE.open() as file:
        reader = csv.DictReader(file)
        for row in reader:
            existing = fetch_all("SELECT id FROM transactions WHERE transaction_ref=%s", (row["transaction_ref"],))
            if existing:
                continue
            prediction = predict_fraud(row)
            status = "Blocked" if prediction["risk_level"] == "High" else "Pending Review" if prediction["risk_level"] == "Medium" else "Approved"
            execute_query("""
                INSERT INTO transactions
                (transaction_ref, customer_id, amount, merchant, merchant_category, location, device_id,
                 ip_risk, transaction_velocity, fraud_score, risk_level, prediction, status)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """, (
                row["transaction_ref"], row["customer_id"], row["amount"], row["merchant"],
                row["merchant_category"], row["location"], row["device_id"], row["ip_risk"],
                row["transaction_velocity"], prediction["fraud_score"], prediction["risk_level"],
                prediction["prediction"], status
            ))
    print("Synthetic banking transaction records imported successfully.")

if __name__ == "__main__":
    seed_transactions()
