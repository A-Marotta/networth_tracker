CREATE DATABASE net_tracker;
\c net_tracker

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    username VARCHAR(200) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL
);

CREATE TABLE asset(
    asset_id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    asset_type VARCHAR(200) NOT NULL,
    asset_purchase_date VARCHAR(10) NOT NULL,
    asset_purchase_value NUMERIC NOT NULL,
    asset_purchase_qty NUMERIC,
    asset_current_value NUMERIC
);

CREATE TABLE liability(
    liability_id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    liability_type VARCHAR(200) NOT NULL,
    liability_purchase_date VARCHAR(10) NOT NULL,
    liability_purchase_value NUMERIC NOT NULL,
    liability_purchase_qty NUMERIC,
    liability_current_value NUMERIC
);