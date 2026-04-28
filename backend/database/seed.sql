USE fraudguard_bank;
INSERT IGNORE INTO users (name, email, password_hash, role) VALUES
('Admin User','admin@fraudguard.com','scrypt:demo-hash-change-after-setup','admin'),
('Bank Analyst','analyst@fraudguard.com','scrypt:demo-hash-change-after-setup','analyst');

INSERT IGNORE INTO customers (customer_code, full_name, account_age_days, home_location, trusted_device, risk_history, kyc_status) VALUES
('CUS001','Vedant Sharma',820,'Mumbai','DEV-101',1,'verified'),
('CUS002','Riya Nair',1430,'Bengaluru','DEV-204',0,'verified'),
('CUS003','Rohan Mehta',95,'Delhi','DEV-388',5,'review'),
('CUS004','Aditi Khan',2200,'Chennai','DEV-490',2,'verified'),
('CUS005','Vikram Rao',310,'Kolkata','DEV-554',3,'pending'),
('CUS006','Shreyama',760,'Mumbai','DEV-612',1,'verified'),
('CUS007','Imran Ali',150,'Delhi','DEV-715',6,'review'),
('CUS008','Kavya Iyer',1880,'Bengaluru','DEV-823',0,'verified'),
('CUS009','Dev Patel',540,'Chennai','DEV-904',2,'verified'),
('CUS010','Sejal Das',1180,'Kolkata','DEV-978',1,'verified');
