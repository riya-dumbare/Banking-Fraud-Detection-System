from flask import Blueprint, request, jsonify
from database.connection import get_collection
from ml.fraud_model import predict_fraud

transaction_bp = Blueprint("transactions", __name__)


@transaction_bp.get("/get-transactions")
def get_transactions():
    transactions = get_collection("transactions")
    pipeline = [
        {"$lookup": {
            "from": "customers",
            "localField": "customer_id",
            "foreignField": "id",
            "as": "customer",
        }},
        {"$unwind": "$customer"},
        {"$sort": {"created_at": -1}},
        {"$limit": 200},
        {"$project": {
            "_id": 0,
            "id": 1, "transaction_ref": 1, "customer_id": 1, "amount": 1, "merchant": 1,
            "merchant_category": 1, "location": 1, "device_id": 1, "ip_risk": 1,
            "transaction_velocity": 1, "fraud_score": 1, "risk_level": 1,
            "prediction": 1, "status": 1, "created_at": 1,
            "customer_code": "$customer.customer_code",
            "full_name": "$customer.full_name",
            "home_location": "$customer.home_location",
            "trusted_device": "$customer.trusted_device",
            "account_age_days": "$customer.account_age_days",
            "risk_history": "$customer.risk_history",
            "kyc_status": "$customer.kyc_status",
        }},
    ]
    rows = list(transactions.aggregate(pipeline))
    return jsonify({"transactions": rows})


@transaction_bp.post("/predict-fraud")
def predict():
    payload = request.get_json(force=True)
    result = predict_fraud(payload)
    return jsonify(result)


@transaction_bp.post("/update-status")
def update_status():
    payload = request.get_json(force=True)
    transaction_id = payload.get("transaction_id")
    status = payload.get("status")
    allowed = {"Approved", "Blocked", "Sent for Review", "Pending Review"}
    if not transaction_id or status not in allowed:
        return jsonify({"message": "Invalid transaction id or status"}), 400

    transactions = get_collection("transactions")
    transactions.update_one({"id": int(transaction_id)}, {"$set": {"status": status}})
    return jsonify({"message": "Transaction status updated", "status": status})


@transaction_bp.get("/dashboard-stats")
def dashboard_stats():
    transactions = get_collection("transactions")
    return jsonify({
        "total_transactions": transactions.count_documents({}),
        "high_risk_count": transactions.count_documents({"risk_level": "High"}),
        "blocked_count": transactions.count_documents({"status": "Blocked"}),
        "pending_review_count": transactions.count_documents({"status": "Pending Review"}),
    })