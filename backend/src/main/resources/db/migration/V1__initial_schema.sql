-- V1: Core Schema for LectureConnect India
-- Users table
CREATE TABLE users (
    id           BIGSERIAL PRIMARY KEY,
    public_id    UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    email        VARCHAR(255) NOT NULL UNIQUE,
    phone        VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role         VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'EXPERT', 'ADMIN')),
    status       VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Student profiles
CREATE TABLE student_profiles (
    id             BIGSERIAL PRIMARY KEY,
    user_id        BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name      VARCHAR(255) NOT NULL,
    institution    VARCHAR(255) NOT NULL,
    course         VARCHAR(100),
    branch         VARCHAR(100),
    year_of_study  INTEGER,
    semester       INTEGER,
    city           VARCHAR(100),
    state          VARCHAR(100),
    booking_role   VARCHAR(30),
    profile_photo_url VARCHAR(500),
    created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Expert profiles
CREATE TABLE expert_profiles (
    id                    BIGSERIAL PRIMARY KEY,
    user_id               BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name             VARCHAR(255) NOT NULL,
    organization          VARCHAR(255) NOT NULL,
    designation           VARCHAR(255) NOT NULL,
    industry_experience   INTEGER NOT NULL DEFAULT 0,
    academic_experience   INTEGER NOT NULL DEFAULT 0,
    education             VARCHAR(500),
    bio                   TEXT,
    session_fee           NUMERIC(10,2),
    city                  VARCHAR(100) NOT NULL,
    state                 VARCHAR(100) NOT NULL,
    linkedin_url          VARCHAR(500),
    portfolio_url         VARCHAR(500),
    profile_photo_url     VARCHAR(500),
    verification_status   VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    is_online_available   BOOLEAN DEFAULT TRUE,
    is_offline_available  BOOLEAN DEFAULT FALSE,
    is_travel_available   BOOLEAN DEFAULT FALSE,
    rating                DOUBLE PRECISION DEFAULT 0.0,
    total_sessions        INTEGER DEFAULT 0,
    total_institutions    INTEGER DEFAULT 0,
    languages             VARCHAR(500),
    created_at            TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Expert expertise areas (tags)
CREATE TABLE expert_expertise (
    id         BIGSERIAL PRIMARY KEY,
    expert_id  BIGINT NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
    area       VARCHAR(255) NOT NULL
);

-- Expert availability
CREATE TABLE availability (
    id          BIGSERIAL PRIMARY KEY,
    expert_id   BIGINT NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    start_time  TIME,
    end_time    TIME,
    is_online   BOOLEAN DEFAULT TRUE,
    is_offline  BOOLEAN DEFAULT FALSE
);

-- Expert documents for verification
CREATE TABLE expert_documents (
    id             BIGSERIAL PRIMARY KEY,
    expert_id      BIGINT NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
    document_type  VARCHAR(50),
    file_url       VARCHAR(500),
    file_name      VARCHAR(255),
    status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    reviewed_by    BIGINT REFERENCES users(id),
    review_notes   VARCHAR(500),
    created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Subjects (taxonomy)
CREATE TABLE subjects (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    category    VARCHAR(100),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Topics under subjects
CREATE TABLE topics (
    id          BIGSERIAL PRIMARY KEY,
    subject_id  BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL
);

-- Session requirements posted by students
CREATE TABLE requirements (
    id                   BIGSERIAL PRIMARY KEY,
    public_id            UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    student_id           BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title                VARCHAR(255) NOT NULL,
    subject              VARCHAR(100),
    topic                VARCHAR(100),
    description          TEXT,
    target_audience      VARCHAR(255),
    num_attendees        INTEGER,
    preferred_date       DATE,
    preferred_time       TIME,
    duration_minutes     INTEGER,
    mode                 VARCHAR(20),
    location             VARCHAR(255),
    budget_min           NUMERIC(10,2),
    budget_max           NUMERIC(10,2),
    language             VARCHAR(100),
    expert_category      VARCHAR(100),
    special_requirements TEXT,
    status               VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at           TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id                  BIGSERIAL PRIMARY KEY,
    public_id           UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    requirement_id      BIGINT REFERENCES requirements(id),
    student_id          BIGINT NOT NULL REFERENCES users(id),
    expert_id           BIGINT NOT NULL REFERENCES expert_profiles(id),
    status              VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    session_fee         NUMERIC(10,2),
    platform_fee        NUMERIC(10,2),
    expert_earnings     NUMERIC(10,2),
    scheduled_at        TIMESTAMP,
    duration_minutes    INTEGER,
    mode                VARCHAR(20),
    meeting_link        VARCHAR(500),
    student_message     TEXT,
    counter_offer_note  TEXT,
    counter_offer_fee   NUMERIC(10,2),
    cancelled_by        BIGINT,
    cancel_reason       VARCHAR(500),
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Booking messages (chat between student and expert)
CREATE TABLE booking_messages (
    id          BIGSERIAL PRIMARY KEY,
    booking_id  BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender_id   BIGINT NOT NULL REFERENCES users(id),
    message     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id                   BIGSERIAL PRIMARY KEY,
    public_id            UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    booking_id           BIGINT NOT NULL UNIQUE REFERENCES bookings(id),
    amount               NUMERIC(10,2),
    platform_fee         NUMERIC(10,2),
    expert_earnings      NUMERIC(10,2),
    status               VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    transaction_id       VARCHAR(255),
    payment_provider     VARCHAR(50) DEFAULT 'MOCK',
    payment_method       VARCHAR(50),
    razorpay_order_id    VARCHAR(255),
    razorpay_payment_id  VARCHAR(255),
    created_at           TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
    id           BIGSERIAL PRIMARY KEY,
    booking_id   BIGINT NOT NULL UNIQUE REFERENCES bookings(id),
    reviewer_id  BIGINT NOT NULL REFERENCES users(id),
    expert_id    BIGINT NOT NULL REFERENCES expert_profiles(id),
    rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment      TEXT,
    is_visible   BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(50),
    title       VARCHAR(255),
    message     TEXT,
    is_read     BOOLEAN DEFAULT FALSE,
    link        VARCHAR(500),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Feedback / Platform feedback
CREATE TABLE feedback (
    id               BIGSERIAL PRIMARY KEY,
    user_id          BIGINT REFERENCES users(id),
    name             VARCHAR(255),
    email            VARCHAR(255),
    category         VARCHAR(30),
    message          TEXT NOT NULL,
    platform_rating  INTEGER CHECK (platform_rating BETWEEN 1 AND 5),
    status           VARCHAR(20) NOT NULL DEFAULT 'NEW',
    created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Saved experts (student bookmarks)
CREATE TABLE saved_experts (
    student_id  BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expert_id   BIGINT NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
    saved_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (student_id, expert_id)
);

-- Indexes for performance
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_expert ON bookings(expert_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_requirements_student ON requirements(student_id);
CREATE INDEX idx_requirements_status ON requirements(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_reviews_expert ON reviews(expert_id);
CREATE INDEX idx_expert_expertise ON expert_expertise(expert_id);
CREATE INDEX idx_availability_expert ON availability(expert_id);
