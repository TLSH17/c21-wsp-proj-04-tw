ALTER TABLE user_photo ADD COLUMN file_name VARCHAR(255) not NULL;
ALTER TABLE friendship_level ADD COLUMN created_at TIMESTAMP;