import csv
from pathlib import Path
from werkzeug.security import generate_password_hash
from database.connection import get_collection, get_next_id
from ml.fraud_model import predict_fraud, train_model

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "synthetic_transactions.csv"

CUSTOMERS = [
    ("CUS001", "Vedant Sharma", 820, "Mumbai", "DEV-101", 1, "verified"),
    ("CUS002", "Riya Nair", 1430, "Bengaluru", "DEV-204", 0, "verified"),
    ("CUS003", "Rohan Mehta", 95, "Delhi", "DEV-388", 5, "review"),
    ("CUS004", "Aditi Khan", 2200, "Chennai", "DEV-490", 2, "verified"),
    ("CUS005", "Vikram Rao", 310, "Kolkata", "DEV-554", 3, "pending"),
    ("CUS006", "Shreyama", 760, "Mumbai", "DEV-612", 1, "verified"),
    ("CUS007", "Imran Ali", 150, "Delhi", "DEV-715", 6, "review"),
    ("CUS008", "Kavya Iyer", 1880, "Bengaluru", "DEV-823", 0, "verified"),
    ("CUS009", "Dev Patel", 540, "Chennai", "DEV-904", 2, "verified"),
    ("CUS010", "Sejal Das", 1180, "Kolkata", "DEV-978", 1, "verified"),
]


def seed_users():
    users = get_collection("users")
    defaults = [
        ("Admin User", "admin@fraudguard.com", "admin"),
        ("Bank Analyst", "analyst@fraudguard.com", "analyst"),
    ]
    for name, email, role in defaults:
        if users.find_one({"email": email}):
            continue
        users.insert_one({
            "id": get_next_id("users"),
            "name": name,
            "email": email,
            "password_hash": generate_password_hash("changeme123"),
            "role": role,
        })
    print("Users seeded.")


def seed_customers():
    customers = get_collection("customers")
    for code, name, age, location, device, risk, kyc in CUSTOMERS:
        if customers.find_one({"customer_code": code}):
            continue
        customers.insert_one({
            "id": get_next_id("customers"),
            "customer_code": code,
            "full_name": name,
            "account_age_days": age,
            "home_location": location,
            "trusted_device": device,
            "risk_history": risk,
            "kyc_status": kyc,
        })
    print("Customers seeded.")


def seed_transactions():
    train_model()
    customers = get_collection("customers")
    transactions = get_collection("transactions")

    code_by_old_id = {i + 1: CUSTOMERS[i][0] for i in range(len(CUSTOMERS))}
    id_by_code = {c["customer_code"]: c["id"] for c in customers.find()}

    with DATA_FILE.open() as file:
        reader = csv.DictReader(file, delimiter="\t")
        for row in reader:
            if transactions.find_one({"transaction_ref": row["transaction_ref"]}):
                continue
            prediction = predict_fraud(row)
            status = (
                "Blocked" if prediction["risk_level"] == "High"
                else "Pending Review" if prediction["risk_level"] == "Medium"
                else "Approved"
            )
            new_customer_id = id_by_code[code_by_old_id[int(row["customer_id"])]]
            transactions.insert_one({
                "id": get_next_id("transactions"),
                "transaction_ref": row["transaction_ref"],
                "customer_id": new_customer_id,
                "amount": float(row["amount"]),
                "merchant": row["merchant"],
                "merchant_category": row["merchant_category"],
                "location": row["location"],
                "device_id": row["device_id"],
                "ip_risk": int(row["ip_risk"]),
                "transaction_velocity": int(row["transaction_velocity"]),
                "fraud_score": prediction["fraud_score"],
                "risk_level": prediction["risk_level"],
                "prediction": prediction["prediction"],
                "status": status,
            })
    print("Synthetic banking transaction records imported successfully.")


if __name__ == "__main__":
    seed_users()
    seed_customers()
    seed_transactions()