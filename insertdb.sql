\c wspproject;

INSERT INTO users (username, password, gender, interested_in_gender, description, date_of_birth) values ('jason', '1234', 'M','F', 'Hi','2001-12-8')

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

