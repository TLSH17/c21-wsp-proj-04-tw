<<<<<<< HEAD
 \c wspproject;
INSERT INTO users (username, password, gender, interested_in_gender, description, date_of_birth) values ('jason', '1234', 'F','M', 'Hi','2002-12-8');
INSERT INTO users (username, password, gender, interested_in_gender, description, date_of_birth) values ('Mary', '1234', 'F','M', 'Hi','2002-12-8');
INSERT INTO users (username, password, gender, interested_in_gender, description, date_of_birth) values ('ivy', '1234', 'F','M', 'Hi','2002-12-8');
 INSERT INTO hobby (content) values ('party');
 INSERT INTO hobby (content) values ('outdoor');
 INSERT INTO hobby (content) values ('yoga');
 INSERT INTO hobby (content) values ('dining');
 INSERT INTO hobby (content) values ('foodie');
 INSERT INTO hobby (content) values ('tennis');
 INSERT INTO hobby (content) values ('movie');
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 1);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 2);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 3);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 4);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 5);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 6);
 INSERT INTO user_hobby (user_id, hobby_id) values (1, 7);
 AlTER TABLE user_photo ADD COLUMN file_name VARCHAR(255) not null;
 AlTER Table friendship_level ADD COLUMN created_at Timestamp;
 INSERT INTO user_photo (user_id, file_name)
 values (1, '1.jpeg');
 INSERT INTO user_photo (user_id, file_name)
 values (1, '2.jpeg');
=======
-- \c wspproject;
--INSERT INTO users (username, password, gender, interested_in_gender, description, date_of_birth) values ('lorenzo', '1234', 'F','M', 'Hi','2002-12-8')
-- INSERT INTO hobby (content) values ('party');
-- INSERT INTO hobby (content) values ('outdoor');
-- INSERT INTO hobby (content) values ('yoga');
-- INSERT INTO hobby (content) values ('dining');
-- INSERT INTO hobby (content) values ('foodie');
-- INSERT INTO hobby (content) values ('tennis');
-- INSERT INTO hobby (content) values ('movie');
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 1);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 2);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 3);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 4);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 5);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 6);
-- INSERT INTO user_hobby (user_id, hobby_id) values (1, 7);
-- AlTER TABLE user_photo ADD COLUMN file_name VARCHAR(255) not null;
-- AlTER Table friendship_level ADD COLUMN created_at Timestamp;
-- INSERT INTO user_photo (user_id, file_name)
-- values (1, '1.jpeg');
-- INSERT INTO user_photo (user_id, file_name)
-- values (1, '2.jpeg');
-- INSERT INTO friendship_level (user_id_given, user_id_received, friendship_level) Values (203, 202, 1);
-- INSERT INTO friendship_level (user_id_given, user_id_received) Values (203, 202);
>>>>>>> e271503c1d4088b34b3969dcf64c39998e3c1a03
