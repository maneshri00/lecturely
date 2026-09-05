-- V4: Seed verified production teachers and professors for direct selection

-- 1. Insert teacher user accounts (Password: Teacher@123)
INSERT INTO users (email, phone, password_hash, role, status) VALUES
('ramesh.sharma@iitb.ac.in', '9876500001', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('sneha.kulkarni@iisc.ac.in', '9876500002', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('amitabh.sengupta@tcs.com', '9876500003', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('meenakshi.s@iimb.ac.in', '9876500004', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('vikram.roy@microsoft.com', '9876500005', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('ananya.deshmukh@wipro.com', '9876500006', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('rajeshwar.p@iitd.ac.in', '9876500007', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE'),
('siddharth.m@goldmansachs.com', '9876500008', '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'EXPERT', 'ACTIVE');

-- 2. Insert verified expert profiles
INSERT INTO expert_profiles (
    user_id, full_name, organization, designation, industry_experience, academic_experience,
    education, bio, session_fee, city, state, linkedin_url, verification_status,
    is_online_available, is_offline_available, is_travel_available, rating, total_sessions, total_institutions, languages, services_offered
) VALUES
((SELECT id FROM users WHERE email='ramesh.sharma@iitb.ac.in'),
 'Dr. Ramesh Sharma', 'IIT Bombay', 'Professor - Computer Science & AI', 4, 16,
 'Ph.D. Computer Science, Stanford University',
 'Professor of Computer Science at IIT Bombay. Specializes in Algorithms, Machine Learning, and System Architecture. Conducted over 150+ university masterclasses and keynotes across Asia.',
 6000, 'Mumbai', 'Maharashtra', 'https://linkedin.com/in/drrameshsharma', 'VERIFIED',
 true, true, true, 4.9, 156, 52, 'English,Hindi', 'GUEST_LECTURE,MENTORSHIP,PERSONAL_TUTOR,RESEARCH_ADVISOR'),

((SELECT id FROM users WHERE email='sneha.kulkarni@iisc.ac.in'),
 'Dr. Sneha Kulkarni', 'IISc Bangalore', 'Associate Professor - Data Science & ML', 5, 12,
 'Ph.D. Artificial Intelligence, IISc Bangalore',
 'Leading AI researcher at IISc Bangalore with focus on Deep Neural Networks, Computer Vision, and NLP. Published 40+ IEEE journals.',
 5500, 'Bangalore', 'Karnataka', 'https://linkedin.com/in/drsnehakulkarni', 'VERIFIED',
 true, true, false, 4.9, 118, 41, 'English,Hindi,Kannada', 'GUEST_LECTURE,MENTORSHIP,RESEARCH_ADVISOR'),

((SELECT id FROM users WHERE email='amitabh.sengupta@tcs.com'),
 'Amitabh Sengupta', 'Tata Consultancy Services', 'Principal Cloud Architect', 20, 2,
 'M.Tech Cloud Systems, BITS Pilani',
 '20+ years in enterprise cloud computing, Kubernetes, microservices, and AWS/Azure architecture. Certified Master Cloud Solution Architect.',
 7500, 'Bangalore', 'Karnataka', 'https://linkedin.com/in/amitabhsengupta', 'VERIFIED',
 true, false, true, 4.8, 94, 35, 'English,Hindi,Bengali', 'GUEST_LECTURE,WORKSHOP_TRAINER,MENTORSHIP'),

((SELECT id FROM users WHERE email='meenakshi.s@iimb.ac.in'),
 'Dr. Meenakshi Sundaram', 'IIM Bangalore', 'Professor - Entrepreneurship & Strategy', 10, 14,
 'Ph.D. Business Strategy, IIM Ahmedabad',
 'Faculty at IIM Bangalore specializing in Business Strategy, Venture Capital, and Tech Entrepreneurship. Advisor to top Indian tech startups.',
 9000, 'Bangalore', 'Karnataka', 'https://linkedin.com/in/drmeenakshis', 'VERIFIED',
 true, true, true, 4.9, 210, 80, 'English,Tamil,Hindi', 'GUEST_LECTURE,MENTORSHIP,WORKSHOP_TRAINER'),

((SELECT id FROM users WHERE email='vikram.roy@microsoft.com'),
 'Vikramaditya Roy', 'Microsoft India', 'Senior Staff Engineer - Distributed Systems', 16, 1,
 'B.Tech CS, IIT Kharagpur',
 'Distributed systems specialist at Microsoft Azure. Passionate about teaching System Design, Scalability, and High-Performance Backend Engineering.',
 8500, 'Hyderabad', 'Telangana', 'https://linkedin.com/in/vikramadityaroy', 'VERIFIED',
 true, false, false, 4.8, 72, 29, 'English,Hindi', 'GUEST_LECTURE,MENTORSHIP,PERSONAL_TUTOR'),

((SELECT id FROM users WHERE email='ananya.deshmukh@wipro.com'),
 'Ananya Deshmukh', 'Wipro Digital', 'Head of Cybersecurity Practice', 18, 3,
 'M.S. Cybersecurity, Carnegie Mellon University; CISSP',
 '18 years leading cybersecurity operations, SOC management, ethical hacking, and cloud defense frameworks. Keynote speaker at Global Cyber Summits.',
 7000, 'Pune', 'Maharashtra', 'https://linkedin.com/in/ananyadeshmukh', 'VERIFIED',
 true, true, true, 4.7, 134, 48, 'English,Marathi,Hindi', 'GUEST_LECTURE,WORKSHOP_TRAINER,MENTORSHIP'),

((SELECT id FROM users WHERE email='rajeshwar.p@iitd.ac.in'),
 'Prof. Rajeshwar Prasad', 'IIT Delhi', 'Professor - VLSI & Embedded Systems', 3, 22,
 'Ph.D. Electrical Engineering, IIT Delhi',
 'Veteran academician with 22+ years in VLSI Design, Semiconductor Technology, and Embedded Systems. Authored 3 textbooks used nationwide.',
 5000, 'New Delhi', 'Delhi', 'https://linkedin.com/in/rajeshwarprasad', 'VERIFIED',
 true, true, false, 4.9, 310, 95, 'English,Hindi', 'GUEST_LECTURE,PERSONAL_TUTOR,RESEARCH_ADVISOR'),

((SELECT id FROM users WHERE email='siddharth.m@goldmansachs.com'),
 'Siddharth Malhotra', 'Goldman Sachs India', 'VP - FinTech & Algorithmic Trading', 14, 0,
 'M.Sc Quantitative Finance, London School of Economics',
 'Vice President at Goldman Sachs. Expert in Algorithmic Trading, Financial Risk Analytics, Blockchains, and FinTech innovations.',
 10000, 'Mumbai', 'Maharashtra', 'https://linkedin.com/in/siddharthmalhotra', 'VERIFIED',
 true, false, true, 4.8, 65, 22, 'English,Hindi', 'GUEST_LECTURE,MENTORSHIP,WORKSHOP_TRAINER');

-- 3. Insert expert expertise tags
INSERT INTO expert_expertise (expert_id, area) VALUES
((SELECT id FROM expert_profiles WHERE full_name='Dr. Ramesh Sharma'), 'Algorithms'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Ramesh Sharma'), 'Machine Learning'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Ramesh Sharma'), 'System Architecture'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Ramesh Sharma'), 'Artificial Intelligence'),

((SELECT id FROM expert_profiles WHERE full_name='Dr. Sneha Kulkarni'), 'Data Science'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Sneha Kulkarni'), 'Deep Learning'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Sneha Kulkarni'), 'Computer Vision'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Sneha Kulkarni'), 'NLP'),

((SELECT id FROM expert_profiles WHERE full_name='Amitabh Sengupta'), 'Cloud Computing'),
((SELECT id FROM expert_profiles WHERE full_name='Amitabh Sengupta'), 'Kubernetes'),
((SELECT id FROM expert_profiles WHERE full_name='Amitabh Sengupta'), 'DevOps'),
((SELECT id FROM expert_profiles WHERE full_name='Amitabh Sengupta'), 'Microservices'),

((SELECT id FROM expert_profiles WHERE full_name='Dr. Meenakshi Sundaram'), 'Entrepreneurship'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Meenakshi Sundaram'), 'Business Strategy'),
((SELECT id FROM expert_profiles WHERE full_name='Dr. Meenakshi Sundaram'), 'Venture Capital'),

((SELECT id FROM expert_profiles WHERE full_name='Vikramaditya Roy'), 'System Design'),
((SELECT id FROM expert_profiles WHERE full_name='Vikramaditya Roy'), 'Distributed Systems'),
((SELECT id FROM expert_profiles WHERE full_name='Vikramaditya Roy'), 'Backend Engineering'),

((SELECT id FROM expert_profiles WHERE full_name='Ananya Deshmukh'), 'Cybersecurity'),
((SELECT id FROM expert_profiles WHERE full_name='Ananya Deshmukh'), 'Ethical Hacking'),
((SELECT id FROM expert_profiles WHERE full_name='Ananya Deshmukh'), 'Cloud Security'),

((SELECT id FROM expert_profiles WHERE full_name='Prof. Rajeshwar Prasad'), 'VLSI Design'),
((SELECT id FROM expert_profiles WHERE full_name='Prof. Rajeshwar Prasad'), 'Embedded Systems'),
((SELECT id FROM expert_profiles WHERE full_name='Prof. Rajeshwar Prasad'), 'Digital Electronics'),

((SELECT id FROM expert_profiles WHERE full_name='Siddharth Malhotra'), 'FinTech'),
((SELECT id FROM expert_profiles WHERE full_name='Siddharth Malhotra'), 'Algorithmic Trading'),
((SELECT id FROM expert_profiles WHERE full_name='Siddharth Malhotra'), 'Financial Analytics');

-- 4. Seed default availability (Mon-Fri, 5:00 PM - 8:00 PM)
INSERT INTO availability (expert_id, day_of_week, start_time, end_time, is_online, is_offline)
SELECT id, d, '17:00:00'::TIME, '20:00:00'::TIME, true, true
FROM expert_profiles, generate_series(0, 4) AS d
WHERE verification_status = 'VERIFIED';
