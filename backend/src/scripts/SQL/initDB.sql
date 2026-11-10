DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS role CASCADE;

CREATE TABLE user (
    id INTEGER primary key generated always as identity,
    RoleId INTEGER REFERENCES(role.id)
)

CREATE TABLE role (
    id INTEGER primary key generated always as identity,
    label VARCHAR(30)
)