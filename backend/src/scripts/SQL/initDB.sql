/*
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS publication;
DROP TABLE IF EXISTS participation;
*/

CREATE TABLE role (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(30)
);

INSERT INTO role (id, label) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'moderator'),
(4, 'guest');

CREATE TABLE "user" (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    role_id INTEGER REFERENCES role (id) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    search_radius_km INTEGER NOT NULL
);

INSERT INTO "user" (id, role_id, pseudo, first_name, name, email, password_hash, city, search_radius_km) VALUES
(1, 1, 'UserPseudo', 'UserFirstName', 'UserName', 'user@example.com', '5f4e5f4e5d', 'Toronto', 23),
(2, 2, 'adminPseudo', 'AdminFirstName', 'AdminName', 'admin@example.com', '5f4e5f4e5d', 'Bruxelles', 1),
(3, 3, 'moderatorPseudo', 'ModeratorFirstName', 'ModeratorName', 'moderator@example.com', '5f4e5f4e5d', 'Malines', 1),
(4, 4, 'guestPseudo', 'GuestFirstName', 'GuestName', 'guest@example.com', '5f4e5f4e5d', 'Gent', 5);

CREATE TABLE category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(50) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL
);

INSERT INTO category (id, label, icon, color) VALUES
(1, 'Sport', '/backend/src/assets/images/sport_icon.svg', '#FF0000'),
(2, 'Music', '/backend/src/assets/images/music_icon.svg', '#00FF00'),
(3, 'Food', '/backend/src/assets/images/food_icon.svg', '#0000FF'),
(4, 'Art', '/backend/src/assets/images/art_icon.svg', '#FFFF00'),
(5, 'Technology', '/backend/src/assets/images/technology_icon.svg', '#FF00FF'),
(6, 'Travel', '/backend/src/assets/images/travel_icon.svg', '#00FFFF');

CREATE TABLE publication (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES "user" (id) NOT NULL,
    category_id INTEGER REFERENCES category (id) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    event_start_at DATE NOT NULL,
    event_end_at DATE NOT NULL,
    event_address VARCHAR(255) NOT NULL,
    max_participants INTEGER NOT NULL,
    cover_image VARCHAR(100) NOT NULL
);

INSERT INTO publication (id, user_id, category_id, title, description, created_at, event_start_at, event_end_at, max_participants, cover_image) VALUES
(1, 1, 1, 'Soccer Match', 'Join us for a friendly soccer match!', '2024-06-01', '2024-06-10', '2024-06-10', 20, 'https://example.com/soccer.jpg'),
(2, 2, 2, 'Live Concert', 'Experience an amazing live concert!', '2024-06-02', '2024-06-15', '2024-06-15', 100, 'https://example.com/concert.jpg'),
(3, 3, 3, 'Food Festival', 'Taste delicious food from around the world!', '2024-06-03', '2024-06-20', '2024-06-20', 50, 'https://example.com/food.jpg');

CREATE TABLE participation (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER REFERENCES "user" (id) NOT NULL,
    publication_id INTEGER REFERENCES publication (id) NOT NULL,
    joined_at DATE NOT NULL
);

INSERT INTO participation (id, user_id, publication_id, joined_at) VALUES
(1, 1, 1, '2024-06-05'),
(2, 2, 2, '2024-06-10'),
(3, 3, 3, '2024-06-15');