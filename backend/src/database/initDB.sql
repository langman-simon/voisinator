/*
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS publication;
DROP TABLE IF EXISTS participation;
*/

CREATE TABLE IF NOT EXISTS role (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(30)
);

INSERT INTO role (id, label) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'moderator'),
(4, 'guest')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    roleId INTEGER REFERENCES role (id) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordHash VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    searchRadiusKm INTEGER NOT NULL
);

INSERT INTO "user" (id, roleId, pseudo, firstName, name, email, passwordHash, city, searchRadiusKm) VALUES
(1, 1, 'UserPseudo', 'UserFirstName', 'UserName', 'user@example.com', '5f4e5f4e5d', 'Toronto', 23),
(2, 2, 'adminPseudo', 'AdminFirstName', 'AdminName', 'admin@example.com', '5f4e5f4e5d', 'Bruxelles', 1),
(3, 3, 'moderatorPseudo', 'ModeratorFirstName', 'ModeratorName', 'moderator@example.com', '5f4e5f4e5d', 'Malines', 1),
(4, 4, 'guestPseudo', 'GuestFirstName', 'GuestName', 'guest@example.com', '5f4e5f4e5d', 'Gent', 5)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(50) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL
);

INSERT INTO category (id, label, icon, color) VALUES
(1, 'Sport', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', '#FF0000'),
(2, 'Music', 'https://cdn-icons-png.flaticon.com/512/727/727218.png', '#00FF00'),
(3, 'Food', 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', '#0000FF'),
(4, 'Art', 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', '#FFFF00'),
(5, 'Technology', 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png', '#FF00FF'),
(6, 'Travel', 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', '#00FFFF')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS publication (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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

INSERT INTO publication (id, userId, categoryId, title, description, createdAt, eventStartAt, eventEndAt, maxParticipants, coverImage) VALUES
(1, 1, 1, 'Soccer Match', 'Join us for a friendly soccer match!', '2024-06-01', '2024-06-10', '2024-06-10', 20, 'https://example.com/soccer.jpg'),
(2, 2, 2, 'Live Concert', 'Experience an amazing live concert!', '2024-06-02', '2024-06-15', '2024-06-15', 100, 'https://example.com/concert.jpg'),
(3, 3, 3, 'Food Festival', 'Taste delicious food from around the world!', '2024-06-03', '2024-06-20', '2024-06-20', 50, 'https://example.com/food.jpg')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS participation (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INTEGER REFERENCES "user" (id) NOT NULL,
    publicationId INTEGER REFERENCES publication (id) NOT NULL,
    joinedAt DATE NOT NULL
);

INSERT INTO participation (id, userId, publicationId, joinedAt) VALUES
(1, 1, 1, '2024-06-05'),
(2, 2, 2, '2024-06-10'),
(3, 3, 3, '2024-06-15')
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('role', 'id'), (SELECT MAX(id) FROM role));
SELECT setval(pg_get_serial_sequence('"user"', 'id'), (SELECT MAX(id) FROM "user"));
SELECT setval(pg_get_serial_sequence('category', 'id'), (SELECT MAX(id) FROM category));
SELECT setval(pg_get_serial_sequence('publication', 'id'), (SELECT MAX(id) FROM publication));
SELECT setval(pg_get_serial_sequence('participation', 'id'), (SELECT MAX(id) FROM participation));