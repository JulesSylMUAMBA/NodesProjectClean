-- Create the "players" table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    club VARCHAR(100) NOT NULL,
    photo_url TEXT NOT NULL,
    votes INT DEFAULT 0
);

-- Create the "winners" table
CREATE TABLE winners (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    club VARCHAR(100) NOT NULL,
    photo_url TEXT
);

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    profile_photo TEXT,
    password VARCHAR(255),
    favorite_club VARCHAR(100)
);

-- Create the "votes" table
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    player_id INT NOT NULL REFERENCES players(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert mock data into players
INSERT INTO players (name, club, photo_url, votes) VALUES 
('Lionel Messi', 'Paris Saint-Germain', 'https://example.com/messi.jpg', 10),
('Cristiano Ronaldo', 'Al-Nassr', 'https://example.com/ronaldo.jpg', 8);

-- Insert mock data into winners
INSERT INTO winners (year, player_name, club, photo_url) VALUES 
(2022, 'Lionel Messi', 'Paris Saint-Germain', 'https://example.com/messi.jpg');

-- Insert mock data into users
INSERT INTO users (name, profile_photo, password, favorite_club) VALUES 
('John Doe', 'https://example.com/johndoe.jpg', 'password123', 'Barcelona');

-- Insert mock data into votes
INSERT INTO votes (user_id, player_id, created_at) VALUES 
(1, 1, NOW()),
(1, 2, NOW());
