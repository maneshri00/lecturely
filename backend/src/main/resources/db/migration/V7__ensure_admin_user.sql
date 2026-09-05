-- V7: Ensure default administrator user exists (Email: admin@lectureconnect.in, Password: Admin@123)

INSERT INTO users (email, phone, password_hash, role, status)
VALUES ('admin@lectureconnect.in', '9999999999',
        '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6', 'ADMIN', 'ACTIVE')
ON CONFLICT (email) DO UPDATE SET 
    role = 'ADMIN',
    status = 'ACTIVE',
    password_hash = '$2a$12$FrCgQ1gqPy4ZqHVtQrn5wOnHF5x8pJlU.E14YS8xvYJNSZNOG7hm6';
