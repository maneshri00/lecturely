-- V2: Seed data for LectureConnect India

-- Insert default admin user (password: Admin@123)
INSERT INTO users (email, phone, password_hash, role, status)
VALUES ('admin@lectureconnect.in', '9999999999',
        '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'ADMIN', 'ACTIVE');

-- Insert sample expert users
-- password: Expert@123 for all
INSERT INTO users (email, phone, password_hash, role, status) VALUES
('priya.sharma@iit.ac.in', '9876543210', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('rahul.mehta@tcs.com', '9876543211', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('anita.kumar@iimb.ac.in', '9876543212', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('vikram.nair@google.com', '9876543213', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('deepa.reddy@wipro.com', '9876543214', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE');

-- Insert sample student users
-- password: Student@123 for all
INSERT INTO users (email, phone, password_hash, role, status) VALUES
('arjun.student@bits.ac.in', '9123456789', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'STUDENT', 'ACTIVE'),
('kavya.student@vit.ac.in', '9123456788', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'STUDENT', 'ACTIVE');

-- Note: password hash above is bcrypt for "Test@1234" 
-- For demo purposes, actual login will use the registered password

-- Expert profiles
INSERT INTO expert_profiles (user_id, full_name, organization, designation, industry_experience, academic_experience,
    education, bio, session_fee, city, state, linkedin_url, verification_status,
    is_online_available, is_offline_available, is_travel_available, rating, total_sessions, total_institutions, languages)
VALUES
((SELECT id FROM users WHERE email='priya.sharma@iit.ac.in'),
 'Dr. Priya Sharma', 'IIT Bombay', 'Associate Professor - Computer Science',
 3, 12, 'Ph.D. Computer Science, IIT Delhi',
 'Expert in VLSI Design and Embedded Systems with 12 years of academic research and 3 years industry experience. Published 30+ research papers. Recipient of the National Science Academy Award.',
 5000, 'Mumbai', 'Maharashtra', 'https://linkedin.com/in/priyasharma', 'VERIFIED',
 true, true, false, 4.8, 127, 45, 'English,Hindi,Marathi'),

((SELECT id FROM users WHERE email='rahul.mehta@tcs.com'),
 'Rahul Mehta', 'Tata Consultancy Services', 'Principal Architect - Cloud & AI',
 18, 0, 'B.Tech Computer Engineering, VJTI Mumbai',
 '18 years in enterprise software, cloud architecture, and AI implementation. Led digital transformation for 50+ Fortune 500 companies across India and globally.',
 8000, 'Bangalore', 'Karnataka', 'https://linkedin.com/in/rahulmehta', 'VERIFIED',
 true, false, true, 4.9, 89, 32, 'English,Hindi'),

((SELECT id FROM users WHERE email='anita.kumar@iimb.ac.in'),
 'Prof. Anita Kumar', 'IIM Bangalore', 'Professor - Entrepreneurship & Strategy',
 8, 15, 'MBA, IIM Ahmedabad; B.Com, Delhi University',
 'Expert in startup ecosystems, venture capital, and business strategy. Mentored 200+ startups. Former consultant at McKinsey & Company.',
 10000, 'Bangalore', 'Karnataka', 'https://linkedin.com/in/anitakumar', 'VERIFIED',
 true, false, false, 4.7, 203, 78, 'English,Hindi,Kannada'),

((SELECT id FROM users WHERE email='vikram.nair@google.com'),
 'Vikram Nair', 'Google India', 'Senior Engineering Manager - ML Platform',
 15, 0, 'M.Tech AI, IISc Bangalore',
 'Working at Google on ML infrastructure. Expertise in large-scale ML systems, Kubernetes, and data engineering. Speaker at multiple international conferences.',
 12000, 'Hyderabad', 'Telangana', 'https://linkedin.com/in/vikramnair', 'VERIFIED',
 true, false, false, 4.9, 56, 28, 'English,Telugu,Hindi'),

((SELECT id FROM users WHERE email='deepa.reddy@wipro.com'),
 'Deepa Reddy', 'Wipro Technologies', 'Cybersecurity Practice Head',
 20, 2, 'B.E. Electronics, BITS Pilani; CISSP Certified',
 '20 years in cybersecurity. Led security transformations for banking and healthcare sectors. Expert in ethical hacking, SOC operations, and security compliance.',
 7500, 'Pune', 'Maharashtra', 'https://linkedin.com/in/deepareddy', 'VERIFIED',
 true, true, true, 4.6, 142, 60, 'English,Hindi,Telugu');

-- Expert expertise tags
INSERT INTO expert_expertise (expert_id, area) VALUES
((SELECT id FROM expert_profiles WHERE full_name='Dr. Priya Sharma'), 'VLSI Design'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Priya Sharma'), 'Embedded Systems'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Priya Sharma'), 'Digital Electronics'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Priya Sharma'), 'IoT'),

((SELECT id FROM expert_profiles WHERE full_name='Rahul Mehta'), 'Cloud Computing'),
((SELECT id FROM expert_profiles WHERE full_name='Rahul Mehta'), 'Artificial Intelligence'),
((SELECT id FROM expert_profiles WHERE full_name='Rahul Mehta'), 'System Design'),
((SELECT id FROM expert_profiles WHERE full_name='Rahul Mehta'), 'DevOps'),

((SELECT id FROM expert_profiles WHERE full_name='Prof. Anita Kumar'), 'Entrepreneurship'),
((SELECT id FROM expert_profiles WHERE full_name='Prof. Anita Kumar'), 'Business Strategy'),
((SELECT id FROM expert_profiles WHERE full_name='Prof. Anita Kumar'), 'Venture Capital'),
((SELECT id FROM expert_profiles WHERE full_name='Prof. Anita Kumar'), 'Management'),

((SELECT id FROM expert_profiles WHERE full_name='Vikram Nair'), 'Machine Learning'),
((SELECT id FROM expert_profiles WHERE full_name='Vikram Nair'), 'Data Science'),
((SELECT id FROM expert_profiles WHERE full_name='Vikram Nair'), 'Data Engineering'),
((SELECT id FROM expert_profiles WHERE full_name='Vikram Nair'), 'Kubernetes'),

((SELECT id FROM expert_profiles WHERE full_name='Deepa Reddy'), 'Cybersecurity'),
((SELECT id FROM expert_profiles WHERE full_name='Deepa Reddy'), 'Ethical Hacking'),
((SELECT id FROM expert_profiles WHERE full_name='Deepa Reddy'), 'Network Security'),
((SELECT id FROM expert_profiles WHERE full_name='Deepa Reddy'), 'Security Compliance');

-- Student profiles
INSERT INTO student_profiles (user_id, full_name, institution, course, branch, year_of_study, semester, city, state, booking_role)
VALUES
((SELECT id FROM users WHERE email='arjun.student@bits.ac.in'),
 'Arjun Verma', 'BITS Pilani', 'B.Tech', 'Computer Science', 3, 6, 'Pilani', 'Rajasthan', 'CLASS_REP'),
((SELECT id FROM users WHERE email='kavya.student@vit.ac.in'),
 'Kavya Singh', 'VIT Vellore', 'B.Tech', 'Electronics', 2, 4, 'Vellore', 'Tamil Nadu', 'INDIVIDUAL');

-- Expert availability (Mon-Fri, 6-8 PM)
INSERT INTO availability (expert_id, day_of_week, start_time, end_time, is_online, is_offline)
SELECT id, d, '18:00:00'::TIME, '20:00:00'::TIME, true, false
FROM expert_profiles, generate_series(0, 4) AS d
WHERE verification_status = 'VERIFIED';

-- Subjects
INSERT INTO subjects (name, category) VALUES
('VLSI Design', 'Engineering'),
('Embedded Systems', 'Engineering'),
('Machine Learning', 'Computer Science'),
('Artificial Intelligence', 'Computer Science'),
('Cloud Computing', 'Computer Science'),
('Cybersecurity', 'Computer Science'),
('Entrepreneurship', 'Management'),
('Business Strategy', 'Management'),
('Data Science', 'Computer Science'),
('IoT', 'Engineering'),
('DevOps', 'Computer Science'),
('Robotics', 'Engineering'),
('Finance', 'Management'),
('Digital Marketing', 'Marketing');

-- Topics
INSERT INTO topics (subject_id, name) VALUES
((SELECT id FROM subjects WHERE name='Machine Learning'), 'Neural Networks'),
((SELECT id FROM subjects WHERE name='Machine Learning'), 'Deep Learning'),
((SELECT id FROM subjects WHERE name='Machine Learning'), 'Natural Language Processing'),
((SELECT id FROM subjects WHERE name='Machine Learning'), 'Computer Vision'),
((SELECT id FROM subjects WHERE name='Cloud Computing'), 'AWS Architecture'),
((SELECT id FROM subjects WHERE name='Cloud Computing'), 'Kubernetes & Docker'),
((SELECT id FROM subjects WHERE name='Cloud Computing'), 'Microservices'),
((SELECT id FROM subjects WHERE name='Cybersecurity'), 'Ethical Hacking'),
((SELECT id FROM subjects WHERE name='Cybersecurity'), 'Penetration Testing'),
((SELECT id FROM subjects WHERE name='Cybersecurity'), 'Security Auditing'),
((SELECT id FROM subjects WHERE name='Entrepreneurship'), 'Startup Funding'),
((SELECT id FROM subjects WHERE name='Entrepreneurship'), 'Business Plan');
