from flask import Blueprint, Response, request
import csv
from io import StringIO
from database.connection import fetch_all

report_bp = Blueprint("reports", __name__)

@report_bp.get("/export-report")
def export_report():
    report_format = request.args.get("format", "csv").lower()
    rows = fetch_all("""
        SELECT t.transaction_ref, c.full_name, t.amount, t.merchant, t.merchant_category,
               t.location, t.fraud_score, t.risk_level, t.prediction, t.status, t.created_at
        FROM transactions t JOIN customers c ON c.id = t.customer_id
        ORDER BY t.created_at DESC
    """)
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=list(rows[0].keys()) if rows else ["message"])
    writer.writeheader()
    if rows:
        writer.writerows(rows)
    else:
        writer.writerow({"message": "No transactions available"})
    filename = "fraudguard_report.csv" if report_format == "csv" else "fraudguard_report.pdf.csv"
    return Response(output.getvalue(), mimetype="text/csv", headers={"Content-Disposition": f"attachment; filename={filename}"})
