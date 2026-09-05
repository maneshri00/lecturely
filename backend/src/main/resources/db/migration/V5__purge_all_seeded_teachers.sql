-- V5: Purge all seeded fake teachers and restrict directory strictly to real registered users

-- 1. Delete availability for all seed experts (V2 & V4)
DELETE FROM availability WHERE expert_id IN (
    SELECT id FROM expert_profiles WHERE user_id IN (
        SELECT id FROM users WHERE email IN (
            'ramesh.sharma@iitb.ac.in',
            'sneha.kulkarni@iisc.ac.in',
            'amitabh.sengupta@tcs.com',
            'meenakshi.s@iimb.ac.in',
            'vikram.roy@microsoft.com',
            'ananya.deshmukh@wipro.com',
            'rajeshwar.p@iitd.ac.in',
            'siddharth.m@goldmansachs.com',
            'priya.sharma@iit.ac.in',
            'rahul.mehta@tcs.com',
            'anita.kumar@iimb.ac.in',
            'vikram.nair@google.com',
            'deepa.reddy@wipro.com'
        )
    )
);

-- 2. Delete expert_expertise for all seed experts (V2 & V4)
DELETE FROM expert_expertise WHERE expert_id IN (
    SELECT id FROM expert_profiles WHERE user_id IN (
        SELECT id FROM users WHERE email IN (
            'ramesh.sharma@iitb.ac.in',
            'sneha.kulkarni@iisc.ac.in',
            'amitabh.sengupta@tcs.com',
            'meenakshi.s@iimb.ac.in',
            'vikram.roy@microsoft.com',
            'ananya.deshmukh@wipro.com',
            'rajeshwar.p@iitd.ac.in',
            'siddharth.m@goldmansachs.com',
            'priya.sharma@iit.ac.in',
            'rahul.mehta@tcs.com',
            'anita.kumar@iimb.ac.in',
            'vikram.nair@google.com',
            'deepa.reddy@wipro.com'
        )
    )
);

-- 3. Delete expert_profiles for all seed experts (V2 & V4)
DELETE FROM expert_profiles WHERE user_id IN (
    SELECT id FROM users WHERE email IN (
        'ramesh.sharma@iitb.ac.in',
        'sneha.kulkarni@iisc.ac.in',
        'amitabh.sengupta@tcs.com',
        'meenakshi.s@iimb.ac.in',
        'vikram.roy@microsoft.com',
        'ananya.deshmukh@wipro.com',
        'rajeshwar.p@iitd.ac.in',
        'siddharth.m@goldmansachs.com',
        'priya.sharma@iit.ac.in',
        'rahul.mehta@tcs.com',
        'anita.kumar@iimb.ac.in',
        'vikram.nair@google.com',
        'deepa.reddy@wipro.com'
    )
);

-- 4. Delete seed users (V2 & V4)
DELETE FROM users WHERE email IN (
    'ramesh.sharma@iitb.ac.in',
    'sneha.kulkarni@iisc.ac.in',
    'amitabh.sengupta@tcs.com',
    'meenakshi.s@iimb.ac.in',
    'vikram.roy@microsoft.com',
    'ananya.deshmukh@wipro.com',
    'rajeshwar.p@iitd.ac.in',
    'siddharth.m@goldmansachs.com',
    'priya.sharma@iit.ac.in',
    'rahul.mehta@tcs.com',
    'anita.kumar@iimb.ac.in',
    'vikram.nair@google.com',
    'deepa.reddy@wipro.com'
);
