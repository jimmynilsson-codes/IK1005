-- SQLite
CREATE TABLE products (
    art_nr INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    category VARCHAR(100)
);

INSERT INTO products (name, category)
VALUES ('jimmy nilsson', '1337');

