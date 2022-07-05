--CREATE DATABASE wspproject;

\c wspproject;





CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NUll UNIQUE,
    password varchar(255) NOT NUll,
    nick_name varchar(255),
    email varchar(255),
    gender varchar(255) NOT NUll,
    interested_in_gender varchar(255) NOT NUll,
    interested_in_type varchar(255),
    height INTEGER,
    date_of_birth DATE NOT NUll,
    description TEXT,
    created_at DATE ,
    updated_at DATE ,
    is_logged_in BOOLEAN,
    number_of_like INTEGER,
    nationality VARCHAR(255),
    zodiac_signs VARCHAR(255));

CREATE TABLE user_photo (
    id SERIAL PRIMARY KEY,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users (id),
    created_at DATE,
    updated_at DATE,
    active BOOLEAN);

CREATE TABLE hobby(
    id SERIAL PRIMARY KEY,
    content varchar(255) not NULL);

CREATE TABLE user_hobby(
  id SERIAL PRIMARY KEY,
  user_id integer,
  hobby_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hobby_id) REFERENCES hobby(id)
  );
  
CREATE TABLE friendship_level(
    id SERIAL PRIMARY KEY,
    user_id_given integer,
    user_id_received integer,
    FOREIGN KEY (user_id_given) REFERENCES users(id),
    FOREIGN KEY (user_id_received) REFERENCES users(id),
    friendship_level INTEGER
    );

CREATE TABLE vip_level(
    id SERIAL PRIMARY KEY,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_vip BOOLEAN
    );

CREATE TABLE chatroom(
    id SERIAL PRIMARY KEY,
    user_id_left integer,
    user_id_right integer,
    FOREIGN KEY (user_id_left) REFERENCES users(id),
    FOREIGN KEY (user_id_right) REFERENCES users(id),
    time_started TIMESTAMP,
    time_closed TIMESTAMP
    );

CREATE TABLE message(
    id SERIAL PRIMARY KEY,
    chatroom_id integer,
    sender integer,
    receiver integer,
    FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (receiver) REFERENCES users(id),
    content text not NULL,
    time_started TIMESTAMP,
    time_closed TIMESTAMP
    );

CREATE TABLE find_nearby(
    id SERIAL PRIMARY KEY,
    user_id_left integer,
    user_id_right integer,
    FOREIGN KEY (user_id_left) REFERENCES users(id),
    FOREIGN KEY (user_id_right) REFERENCES users(id),
    distance INTEGER);





--create user demo_admin with encrypted password 'demo_admin';