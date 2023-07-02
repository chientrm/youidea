DROP TABLE IF EXISTS User;
CREATE TABLE User (
    uid integer PRIMARY KEY AUTOINCREMENT,
    email text UNIQUE,
    passwordHash text,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Idea;
CREATE TABLE Idea(
    id integer PRIMARY KEY AUTOINCREMENT,
    uid integer NOT NULL,
    description text NOT NULL,
    loves integer DEFAULT 0,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Idea_Love;
CREATE TABLE Idea_Love(
    uid integer NOT NULL,
    ideaId integer NOT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uid, ideaId)
);