import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG

def get_db_connection():
    # **DB_CONFIG unpacks the dictionary as keyword arguments to mysql.connect()
    # if mysql is not running or password is wrong, this raises a clear error message
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except Error as exc:
        raise RuntimeError(f"Database connection failed: {exc}")

def fetch_all(query, params=None):
    # dictionary=True means rows come back as {"column": value} instead of (value, value)
    # params tuple prevents SQL injection - user input is never directly put in the query string
    conn = get_db_connection()
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params or ())
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def execute_query(query, params=None):
    # commit() is essential - without it the change stays in a buffer and disappears when connection closes
    # lastrowid returns the auto-generated ID of the newly inserted row
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, params or ())
    conn.commit()
    last_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return last_id