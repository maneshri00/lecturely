-- V11: Add banner_photo_url column to expert_profiles for cover photo uploads
ALTER TABLE expert_profiles ADD COLUMN IF NOT EXISTS banner_photo_url TEXT;
