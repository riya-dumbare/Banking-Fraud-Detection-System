from flask import Blueprint, Response, request
import csv
from io import StringIO
from database.connection import fetch_all
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from io import BytesIO
from flask import Blueprint, Response, request, send_file

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