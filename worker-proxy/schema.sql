DROP TABLE IF EXISTS User;
CREATE TABLE if NOT EXISTS User (
    uid integer PRIMARY KEY AUTOINCREMENT,
    email text UNIQUE,
    passwordHash text,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Idea;
CREATE TABLE if NOT EXISTS Idea(
    id integer PRIMARY KEY AUTOINCREMENT,
    uid integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);