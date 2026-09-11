from flask import Blueprint, Response, request, send_file
import csv
from io import StringIO, BytesIO
from database.connection import get_collection
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

report_bp = Blueprint("reports", __name__)


@report_bp.get("/export-report")
def export_report():
    report_format = request.args.get("format", "csv").lower()
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
        {"$project": {
            "_id": 0,
            "transaction_ref": 1,
            "full_name": "$customer.full_name",
            "amount": 1, "merchant": 1, "merchant_category": 1, "location": 1,
            "fraud_score": 1, "risk_level": 1, "prediction": 1, "status": 1, "created_at": 1,
        }},
    ]
    rows = list(transactions.aggregate(pipeline))

    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=list(rows[0].keys()) if rows else ["message"])
    writer.writeheader()
    if rows:
        writer.writerows(rows)
    else:
        writer.writerow({"message": "No transactions available"})

    if report_format == "pdf":
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        headers = ["Transaction Ref", "Customer", "Amount", "Merchant", "Category",
                   "Location", "Fraud Score", "Risk Level", "Prediction", "Status", "Date"]
        table_data = [headers]
        for row in rows:
            table_data.append([
                row["transaction_ref"], row["full_name"], row["amount"], row["merchant"],
                row["merchant_category"], row["location"], row["fraud_score"],
                row["risk_level"], row["prediction"], row["status"], str(row["created_at"])
            ])
        table = Table(table_data, repeatRows=1)
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e293b")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTSIZE", (0, 0), (-1, -1), 7),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        doc.build([table])
        buffer.seek(0)
        return send_file(buffer, mimetype="application/pdf",
                          download_name="fraudguard_report.pdf", as_attachment=True)

    filename = "fraudguard_report.csv"
    return Response(output.getvalue(), mimetype="text/csv",
                     headers={"Content-Disposition": f"attachment; filename={filename}"})