-- V10: Expand profile_photo_url and document file_url to TEXT for base64 photo uploads
ALTER TABLE expert_profiles ALTER COLUMN profile_photo_url TYPE TEXT;
ALTER TABLE student_profiles ALTER COLUMN profile_photo_url TYPE TEXT;
ALTER TABLE expert_documents ALTER COLUMN file_url TYPE TEXT;
