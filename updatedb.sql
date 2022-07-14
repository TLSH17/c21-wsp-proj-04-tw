-- ALTER TABLE user_photo ADD COLUMN file_name VARCHAR(255) not NULL;
-- ALTER TABLE friendship_level ADD COLUMN created_at TIMESTAMP;
--  \c wspproject;
INSERT INTO user_hobby (user_id, hobby_id)
values (3, 1);
INSERT INTO user_hobby (user_id, hobby_id)
values (3, 2);
INSERT INTO user_hobby (user_id, hobby_id)
values (3, 3);
INSERT INTO user_photo (user_id, file_name)
values (3, '5.jpeg');
INSERT INTO user_photo (user_id, file_name)
values (3, '6.jpeg');
--11/7Dickson
DROP TABLE IF EXISTS chatroom;
CREATE TABLE chatroom(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    user_id_left integer,
    user_id_right integer,
    FOREIGN KEY (user_id_left) REFERENCES users(id),
    FOREIGN KEY (user_id_right) REFERENCES users(id),
    time_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_closed TIMESTAMP
);
DROP TABLE IF EXISTS messages;
CREATE TABLE message(
    id SERIAL PRIMARY KEY,
    chatroom_id integer,
    sender integer,
    receiver integer,
    FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (receiver) REFERENCES users(id),
    content text not NULL,
    time_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_closed TIMESTAMP
);
insert into chatroom (user_id_left, user_id_right)
values (3, 1);
insert into chatroom (user_id_left, user_id_right)
values (3, 2);
insert into chatroom (user_id_left, user_id_right)
values (1, 2);
insert into message (chatroom_id, sender, content)
values (1, 3, 'HELLO WORLD');
insert into message (chatroom_id, sender, content)
values (2, 2, 'HELLO WORLD');
insert into message (chatroom_id, sender, content)
values (3, 1, 'HELLO WORLD');
UPDATE chatroom
SET name = 'chatroom_003'
WHERE id = 3;
-- INSERT INTO user_hobby (user_id, hobby_id)
-- values (3, 1);
-- INSERT INTO user_hobby (user_id, hobby_id)
-- values (3, 2);
-- INSERT INTO user_hobby (user_id, hobby_id)
-- values (3, 3);
-- INSERT INTO user_photo (user_id, file_name)
-- values (3, '5.jpeg');
-- INSERT INTO user_photo (user_id, file_name)
-- values (3, '6.jpeg');
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (3, 1, 1);
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (1, 3, 1);
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (1, 2, 1);
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (2, 1, 1);
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (3, 2, 1);
insert into friendship_level (
        user_id_given,
        user_id_received,
        friendship_level
    )
values (2, 3, 1);