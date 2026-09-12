# Backend — Banking Fraud Detection System

Flask API for fraud scoring, transaction management, and report exports. Uses a Random Forest model (scikit-learn) and MongoDB Atlas for storage.

See the [project README](../README.md) for full setup instructions, API endpoints, and tech stack.

## Quick start

\`\`\`bash
pip install -r requirements.txt
python seed_database.py
python app.py
\`\`\`

Runs on `http://127.0.0.1:5000`. Requires a `.env` file with `MONGO_URI` and `MONGO_DATABASE` — see the root README for details.