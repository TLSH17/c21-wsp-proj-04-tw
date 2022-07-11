--ALTER TABLE user_photo ADD COLUMN file_name VARCHAR(255) not NULL;
--ALTER TABLE friendship_level ADD COLUMN created_at TIMESTAMP;
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