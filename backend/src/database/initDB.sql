/*
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS publication;
DROP TABLE IF EXISTS participation;
*/

CREATE TABLE IF NOT EXISTS role (
    id INTEGER primary key generated always as identity,
    label VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER primary key generated always as identity,
    RoleId INTEGER REFERENCES role (id) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordHash VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    searchRadiusKm INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
    id INTEGER primary key generated always as identity,
    label VARCHAR(50) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS publication (
    id INTEGER primary key generated always as identity,
    userId INTEGER REFERENCES "user" (id) NOT NULL,
    categoryId INTEGER REFERENCES category (id) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    createdAt DATE NOT NULL,
    eventStartAt DATE NOT NULL,
    eventEndAt DATE NOT NULL,
    maxParticipants INTEGER NOT NULL,
    coverImage VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS participation (
    id INTEGER primary key generated always as identity,
    userId INTEGER REFERENCES "user" (id) NOT NULL,
    publicationId INTEGER REFERENCES publication (id) NOT NULL,
    joinedAt DATE NOT NULL
);