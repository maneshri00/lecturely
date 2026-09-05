-- V3: Purge all fake seed data for production readiness

-- 1. Remove availability records associated with seed fake experts
DELETE FROM availability WHERE expert_id IN (
    SELECT id FROM expert_profiles WHERE user_id IN (
        SELECT id FROM users WHERE email IN (
            'priya.sharma@iit.ac.in',
            'rahul.mehta@tcs.com',
            'anita.kumar@iimb.ac.in',
            'vikram.nair@google.com',
            'deepa.reddy@wipro.com'
        )
    )
);

-- 2. Remove expert_expertise records for seed fake experts
DELETE FROM expert_expertise WHERE expert_id IN (
    SELECT id FROM expert_profiles WHERE user_id IN (
        SELECT id FROM users WHERE email IN (
            'priya.sharma@iit.ac.in',
            'rahul.mehta@tcs.com',
            'anita.kumar@iimb.ac.in',
            'vikram.nair@google.com',
            'deepa.reddy@wipro.com'
        )
    )
);

-- 3. Remove expert_profiles records for seed fake experts
DELETE FROM expert_profiles WHERE user_id IN (
    SELECT id FROM users WHERE email IN (
        'priya.sharma@iit.ac.in',
        'rahul.mehta@tcs.com',
        'anita.kumar@iimb.ac.in',
        'vikram.nair@google.com',
        'deepa.reddy@wipro.com'
    )
);

-- 4. Remove student_profiles records for seed fake students
DELETE FROM student_profiles WHERE user_id IN (
    SELECT id FROM users WHERE email IN (
        'arjun.student@bits.ac.in',
        'kavya.student@vit.ac.in'
    )
);

-- 5. Remove seed fake users
DELETE FROM users WHERE email IN (
    'priya.sharma@iit.ac.in',
    'rahul.mehta@tcs.com',
    'anita.kumar@iimb.ac.in',
    'vikram.nair@google.com',
    'deepa.reddy@wipro.com',
    'arjun.student@bits.ac.in',
    'kavya.student@vit.ac.in'
);
