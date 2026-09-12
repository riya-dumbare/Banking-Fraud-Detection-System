# Banking Fraud Detection System (SecureBank)

A banking fraud detection dashboard that flags suspicious transactions in real time using a Random Forest model, and gives an analyst a workflow to review, approve, or block them.

## What it does

- Scores incoming transactions for fraud risk (Low / Medium / High) using a trained Random Forest model
- Dashboard showing transaction volume, high-risk counts, blocked transactions, and pending reviews
- Analysts can review flagged transactions and update their status (Approved / Blocked / Sent for Review / Pending Review)
- Export transaction reports as CSV or PDF
- Simple signup/login for analysts

## Tech stack

**Backend:** Python, Flask, scikit-learn (Random Forest), pandas, MongoDB (via PyMongo)
**Frontend:** HTML, CSS, vanilla JavaScript
**Database:** MongoDB Atlas

## Project structure

```
backend/
  app.py                 # Flask entry point
  config.py               # Loads MongoDB URI/database from .env
  database/
    connection.py          # MongoDB client + id counter helper
  ml/
    fraud_model.py          # Trains and runs the Random Forest model
  routes/
    auth_routes.py          # signup / login
    transaction_routes.py   # transactions, fraud prediction, dashboard stats
    reports_route.py        # CSV/PDF export
  seed_database.py         # Seeds users, customers, and synthetic transactions
  data/
    synthetic_transactions.csv

frontend/
  index.html
  style.css
  js/
    api.js
    app.js
```

## Running it locally

### 1. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside `backend/` with your MongoDB connection details:

```
MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=Cluster0"
MONGO_DATABASE=fraudguard_bank
```

(You'll need a free MongoDB Atlas cluster, or a local MongoDB instance running on `mongodb://localhost:27017`.)

Seed the database with sample users, customers, and transactions:

```bash
python seed_database.py
```

Start the server:

```bash
python app.py
```

The API runs at `http://127.0.0.1:5000`.

### 2. Frontend setup

Open `frontend/index.html` in a browser, or serve it with any static file server. It talks to the backend through `frontend/js/api.js`.

## API endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/signup` | Register a new analyst |
| POST | `/login` | Log in |
| GET | `/get-transactions` | List recent transactions with customer details |
| POST | `/predict-fraud` | Score a transaction for fraud risk |
| POST | `/update-status` | Update a transaction's status |
| GET | `/dashboard-stats` | Transaction counts for the dashboard |
| GET | `/export-report?format=csv\|pdf` | Export transactions as CSV or PDF |

## Notes

- Transaction data used for training and demo purposes is synthetic (`data/synthetic_transactions.csv`), not real banking data.
- The `.env` file is git-ignored — never commit real database credentials.