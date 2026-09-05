-- V12: Securely update default administrator credentials to dragon@lectureconnect.edu

UPDATE users 
SET email = 'dragon@lectureconnect.edu'
WHERE email = 'admin@lectureconnect.in';

INSERT INTO users (email, phone, password_hash, role, status)
VALUES ('dragon@lectureconnect.edu', '9999999999',
        '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'ADMIN', 'ACTIVE')
ON CONFLICT (email) DO UPDATE SET 
    role = 'ADMIN',
    status = 'ACTIVE';
