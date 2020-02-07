-- SQLite
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    category VARCHAR(100)
);

INSERT INTO products (name, category)
VALUES ('jimmy nilsson', '1337');

SELECT * FROM products WHERE EXISTS (SELECT * FROM products WHERE art_nr = 3);

ALTER TABLE products 

DROP TABLE products;

SELECT * FROM products;