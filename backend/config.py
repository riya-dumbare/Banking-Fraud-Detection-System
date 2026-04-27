import os

DB_CONFIG = {
    "host": os.getenv("MYSQL_HOST", "localhost"),
    "user": os.getenv("MYSQL_USER", "root"),
    "password": os.getenv("MYSQL_PASSWORD", "Shreya@123"),
    "database": os.getenv("MYSQL_DATABASE", "fraudguard_bank"),
    "port": int(os.getenv("MYSQL_PORT", "3306")),
}
