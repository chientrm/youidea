CREATE TABLE User (
    uid integer PRIMARY KEY AUTOINCREMENT,
    email text UNIQUE,
    passwordHash text,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Idea(
    id integer PRIMARY KEY AUTOINCREMENT,
    uid integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    loves integer DEFAULT 0,
    comments integer DEFAULT 0,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Idea_Love(
    uid integer NOT NULL,
    ideaId integer NOT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uid, ideaId)
);

CREATE TABLE Idea_Comment(
    id integer PRIMARY KEY AUTOINCREMENT,
    uid integer NOT NULL,
    ideaId integer NOT NULL,
    content text NOT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP
);