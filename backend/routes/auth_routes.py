from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.connection import fetch_all, execute_query

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/signup")
def signup():
    payload = request.get_json(force=True)
    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")
    if not name or not email or len(password) < 6:
        return jsonify({"message": "Name, valid email and 6 character password are required"}), 400
    existing = fetch_all("SELECT id FROM users WHERE email=%s", (email,))
    if existing:
        return jsonify({"message": "Email already registered"}), 409
    user_id = execute_query(
        "INSERT INTO users (name, email, password_hash, role) VALUES (%s,%s,%s,%s)",
        (name, email, generate_password_hash(password), "analyst")
    )
    return jsonify({"message": "Signup successful", "user": {"id": user_id, "name": name, "email": email, "role": "analyst"}})

@auth_bp.post("/login")
def login():
    payload = request.get_json(force=True)
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")
    users = fetch_all("SELECT id, name, email, password_hash, role FROM users WHERE email=%s", (email,))
    if not users or not check_password_hash(users[0]["password_hash"], password):
        return jsonify({"message": "Invalid email or password"}), 401
    user = users[0]
    user.pop("password_hash", None)
    return jsonify({"message": "Login successful", "user": user})