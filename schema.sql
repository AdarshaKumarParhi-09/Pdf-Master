-- Database Schema for PDFMaster

CREATE DATABASE IF NOT EXISTS pdf_master;
USE pdf_master;

-- User accounts
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255), -- Not used if using social login
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Processed files history
CREATE TABLE IF NOT EXISTS file_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tool_id VARCHAR(50) NOT NULL,
    original_filename VARCHAR(255),
    result_filename VARCHAR(255),
    file_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
