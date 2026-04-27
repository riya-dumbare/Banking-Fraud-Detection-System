from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.transaction_routes import transaction_bp
from routes.reports_route import report_bp

app = Flask(__name__)
app.config["SECRET_KEY"] = "change-this-secret-key"
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(transaction_bp)
app.register_blueprint(report_bp)

@app.get("/")
def health_check():
    return {"status": "running", "project": "AI-Assisted Banking Fraud Detection System"}

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
