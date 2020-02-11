-- SQLite
CREATE TABLE users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

DELETE from users;

DELETE FROM sqlite_sequence WHERE name='users';