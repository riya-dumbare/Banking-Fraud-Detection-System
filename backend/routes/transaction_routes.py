from flask import Blueprint, request, jsonify
from database.connection import fetch_all, execute_query
from ml.fraud_model import predict_fraud

transaction_bp = Blueprint("transactions", __name__)

@transaction_bp.get("/get-transactions")
def get_transactions():
    # JOIN is used here to get customer name and details alongside each transaction
    # without JOIN we would need a separate API call for every transaction's customer info
    rows = fetch_all("""
        SELECT t.*, c.customer_code, c.full_name, c.home_location, c.trusted_device,
               c.account_age_days, c.risk_history, c.kyc_status
        FROM transactions t
        JOIN customers c ON c.id = t.customer_id
        ORDER BY t.created_at DESC
        LIMIT 200
    """)
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
    execute_query("UPDATE transactions SET status=%s WHERE id=%s", (status, transaction_id))
    return jsonify({"message": "Transaction status updated", "status": status})

def dashboard_stats():
    total = fetch_all("SELECT COUNT(*) as cnt FROM transactions")[0]["cnt"]
    high_risk = fetch_all(
        "SELECT COUNT(*) as cnt FROM transactions WHERE risk_level = 'High'"
    )[0]["cnt"]
    blocked = fetch_all(
        "SELECT COUNT(*) as cnt FROM transactions WHERE status = 'Blocked'"
    )[0]["cnt"]
    pending = fetch_all(
        "SELECT COUNT(*) as cnt FROM transactions WHERE status = 'Pending Review'"
    )[0]["cnt"]
    return jsonify({
        "total_transactions": total,
        "high_risk_count": high_risk,
        "blocked_count": blocked,
        "pending_review_count": pending
    })