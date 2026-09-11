from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.connection import get_collection, get_next_id

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/signup")
def signup():
    payload = request.get_json(force=True)
    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")
    if not name or not email or len(password) < 6:
        return jsonify({"message": "Name, valid email and 6 character password are required"}), 400
    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"message": "Please enter a properly formatted email address"}), 400

    users = get_collection("users")
    if users.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 409

    user_id = get_next_id("users")
    users.insert_one({
        "id": user_id,
        "name": name,
        "email": email,
        "password_hash": generate_password_hash(password),
        "role": "analyst",
    })
    return jsonify({"message": "Signup successful", "user": {"id": user_id, "name": name, "email": email, "role": "analyst"}})


@auth_bp.post("/login")
def login():
    payload = request.get_json(force=True)
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")

    users = get_collection("users")
    user = users.find_one({"email": email})
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    user.pop("password_hash", None)
    user.pop("_id", None)
    return jsonify({"message": "Login successful", "user": user})