drop table if exists User;
create table if not exists User (
    uid integer primary key autoincrement,
    email text unique,
    passwordHash text
);