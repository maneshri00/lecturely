-- V6: Automatically verify all registered teacher/expert profiles so they immediately appear in student search

UPDATE expert_profiles SET verification_status = 'VERIFIED' WHERE verification_status = 'PENDING' OR verification_status IS NULL;
