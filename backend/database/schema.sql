CREATE DATABASE IF NOT EXISTS fraudguard_bank;
USE fraudguard_bank;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','analyst','customer') DEFAULT 'analyst',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_code VARCHAR(30) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  account_age_days INT NOT NULL,
  home_location VARCHAR(80) NOT NULL,
  trusted_device VARCHAR(80) NOT NULL,
  risk_history INT DEFAULT 0,
  kyc_status ENUM('verified','pending','review') DEFAULT 'verified'
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_ref VARCHAR(40) UNIQUE NOT NULL,
  customer_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  merchant VARCHAR(120) NOT NULL,
  merchant_category VARCHAR(80) NOT NULL,
  location VARCHAR(80) NOT NULL,
  device_id VARCHAR(80) NOT NULL,
  ip_risk INT DEFAULT 0,
  transaction_velocity INT DEFAULT 1,
  fraud_score DECIMAL(5,2) DEFAULT 0,
  risk_level ENUM('Low','Medium','High') DEFAULT 'Low',
  prediction ENUM('Fraud','Not Fraud') DEFAULT 'Not Fraud',
  status ENUM('Pending Review','Approved','Blocked','Sent for Review') DEFAULT 'Pending Review',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
