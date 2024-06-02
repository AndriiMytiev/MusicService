-- Створення таблиці users
create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50),
    surname VARCHAR(50),
    info TEXT,
    favourites INTEGER[],
    admin BOOLEAN DEFAULT FALSE
);

-- Створення таблиці music
CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    "user" INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    tags VARCHAR(50)[],
    CONSTRAINT fk_user
      FOREIGN KEY("user")
      REFERENCES "users"(id)
      ON DELETE CASCADE
);
