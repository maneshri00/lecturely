-- V9: Add fee column to expert_expertise table for per-skill / per-subject pricing

ALTER TABLE expert_expertise ADD COLUMN IF NOT EXISTS fee NUMERIC(10, 2) DEFAULT NULL;
