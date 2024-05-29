create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(100),
    password VARCHAR(50),
    name VARCHAR(50),
    surname VARCHAR(50),
    info TEXT,
    favourites INTEGER[],
    admin BOOLEAN,
)