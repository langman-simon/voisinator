DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS publication;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS role;


CREATE TABLE role (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO role (label) VALUES ('user'), ('admin'), ('moderator'), ('guest');


CREATE TABLE "user" (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    role_id INTEGER NOT NULL REFERENCES role(id),
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    longitude DOUBLE PRECISION NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    search_radius_km INTEGER NOT NULL CHECK (search_radius_km >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "user" (
    role_id,
    pseudo,
    first_name,
    name,
    email,
    password_hash,
    city,
    longitude,
    latitude,
    search_radius_km
)
VALUES
    (
        1,
        'UserPseudo',
        'UserFirstName',
        'UserName',
        'user@example.com',
        '5f4e5f4e5d',
        'Namur',
        4.8675,
        50.4674,
        23
    ),
    (
        2,
        'AdminPseudo',
        'AdminFirstName',
        'AdminName',
        'admin@example.com',
        '5f4e5f4e5d',
        'Brussels',
        4.3517,
        50.8503,
        10
    ),
    (
        3,
        'ModeratorPseudo',
        'ModeratorFirstName',
        'ModeratorName',
        'moderator@example.com',
        '5f4e5f4e5d',
        'Liege',
        5.5797,
        50.6326,
        15
    );


CREATE TABLE category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(50) NOT NULL UNIQUE,
    icon VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL
);

INSERT INTO category (
    label,
    icon,
    color
)
VALUES
    (
        'Sport',
        '/backend/src/assets/images/sport_icon.svg',
        '#FF0000'
    ),
    (
        'Music',
        '/backend/src/assets/images/music_icon.svg',
        '#00FF00'
    ),
    (
        'Food',
        '/backend/src/assets/images/food_icon.svg',
        '#0000FF'
    ),
    (
        'Art',
        '/backend/src/assets/images/art_icon.svg',
        '#FFFF00'
    ),
    (
        'Technology',
        '/backend/src/assets/images/technology_icon.svg',
        '#FF00FF'
    ),
    ( 'Travel',
        '/backend/src/assets/images/travel_icon.svg',
        '#00FFFF'
    );


CREATE TABLE publication (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    category_id INTEGER NOT NULL REFERENCES category(id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_start_at TIMESTAMP NOT NULL,
    event_end_at TIMESTAMP NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    max_participants INTEGER NOT NULL CHECK (max_participants > 0),
    cover_image VARCHAR(255),
    CHECK (event_end_at >= event_start_at)
);

INSERT INTO publication (
    user_id,
    category_id,
    title,
    description,
    event_start_at,
    event_end_at,
    longitude,
    latitude,
    max_participants,
    cover_image
)
VALUES
    (
        1,
        1,
        'Soccer Match',
        'Join us for a friendly soccer match!',
        '2026-12-10 14:00:00',
        '2026-12-10 17:00:00',
        4.8675,
        50.4674,
        20,
        '/backend/src/assets/images/sport_icon.svg'
    ),
    (
        2,
        2,
        'Live Concert',
        'Experience an amazing live concert!',
        '2026-12-15 19:00:00',
        '2026-12-15 23:00:00',
        4.3517,
        50.8503,
        100,
        '/backend/src/assets/images/music_icon.svg'
    ),
    (
        3,
        3,
        'Food Festival',
        'Taste delicious food from around the world!',
        '2026-12-20 10:00:00',
        '2026-12-20 20:00:00',
        5.5797,
        50.6326,
        50,
        '/backend/src/assets/images/food_icon.svg'
    );


CREATE TABLE participation (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    publication_id INTEGER NOT NULL REFERENCES publication(id),
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, publication_id)
);

INSERT INTO participation (
    user_id,
    publication_id,
    joined_at
)
VALUES
    (
        1,
        1,
        '2026-12-01 10:00:00'
    ),
    (
        2,
        2,
        '2026-12-02 11:30:00'
    ),
    (
        3,
        3,
        '2026-12-03 09:15:00'
    );