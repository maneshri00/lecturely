# LectureConnect India 🎓

> **A three-sided Learning & Expert Session Booking Marketplace for India**
>
> Connect Students with verified Professors, Industry Experts, Researchers, and Professionals for Guest Lectures, Workshops, Mentoring, and Skill-Building Sessions.

---

## 📋 Table of Contents
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start (Docker)](#quick-start-docker)
- [Local Development Setup](#local-development-setup)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [Testing](#testing)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   React + TypeScript                     │
│              (Vite, Tailwind CSS, Zustand)               │
│                    Port: 5173 (dev)                      │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API (JSON)
                       │ JWT Auth (Bearer Token)
┌──────────────────────▼──────────────────────────────────┐
│              Spring Boot 3 + Java 21                     │
│    Controller → Service → Repository → Entity            │
│          Spring Security + JWT + BCrypt                  │
│                    Port: 8080                            │
└──────────────────────┬──────────────────────────────────┘
                       │ Spring Data JPA (Hibernate)
                       │ Flyway Migrations
┌──────────────────────▼──────────────────────────────────┐
│                  PostgreSQL 16                           │
│                    Port: 5432                            │
└─────────────────────────────────────────────────────────┘
```

---

## Features

### 🎓 Student
- Register/login with email + password
- Search verified experts by subject, city, mode, rating, fee
- Create detailed session requirements with budget and preferences
- Get AI-like match scores (0–100%) for experts against requirements
- Request, confirm, and track bookings
- Razorpay-style payment modal (mock for MVP)
- Leave reviews after completed sessions
- Save favourite experts
- Receive in-app notifications

### 👨‍🏫 Teacher / Expert
- Register and build a full profile (organization, expertise, fee, availability)
- Upload verification documents for admin approval
- Get a **Verified** badge visible to students
- Manage session requests: Accept / Reject / Counter Offer
- View earnings breakdown
- Set weekly availability calendar
- Receive notifications for new requests

### 🛡️ Admin
- Dashboard with platform-wide analytics
- Approve/reject expert verification with document review
- Manage all users, bookings, payments, and reviews
- View and manage feedback submissions
- Configure platform commission rate

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite 5, React Router v6, Tailwind CSS, Zustand, React Hook Form, Zod, Axios, TanStack Query |
| Backend | Java 21, Spring Boot 3.3, Spring Security 6, Spring Data JPA, Hibernate, JWT (jjwt 0.12), MapStruct, Bean Validation |
| Database | PostgreSQL 16, Flyway migrations |
| DevOps | Docker, Docker Compose |
| Testing | JUnit 5, Mockito (backend); Vitest, Testing Library (frontend) |

---

## Prerequisites

- **Node.js** 20+ and npm
- **Java** 21+ (JDK)
- **Maven** 3.9+
- **PostgreSQL** 16+ (or Docker)
- **Docker & Docker Compose** (for containerized setup)

---

## Quick Start (Docker)

The fastest way to run the entire stack:

```bash
git clone <repo-url>
cd guestlecture

# Start all services (PostgreSQL + Backend + Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Access the app
open http://localhost:3000
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- PostgreSQL: localhost:5432

---

## Local Development Setup

### Database Setup

**Option A: Docker (Recommended)**
```bash
docker run -d \
  --name lectureconnect-db \
  -e POSTGRES_DB=lectureconnect \
  -e POSTGRES_USER=lectureconnect \
  -e POSTGRES_PASSWORD=lectureconnect123 \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B: Local PostgreSQL**
```sql
CREATE DATABASE lectureconnect;
CREATE USER lectureconnect WITH PASSWORD 'lectureconnect123';
GRANT ALL PRIVILEGES ON DATABASE lectureconnect TO lectureconnect;
```

### Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env
# Edit .env with your values (or use defaults for local dev)

# Run (Flyway will auto-migrate + DataLoader will seed demo data)
mvn spring-boot:run

# Or with specific profile
SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run
```

Backend will start on **http://localhost:8080**

### Frontend Setup

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will start on **http://localhost:5173**

---

## Environment Variables

### Backend (`backend/src/main/resources/application.yml`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/lectureconnect` | PostgreSQL JDBC URL |
| `DATABASE_USERNAME` | `lectureconnect` | Database username |
| `DATABASE_PASSWORD` | `lectureconnect123` | Database password |
| `JWT_SECRET` | *(default in config)* | HS256 JWT signing secret (min 256 bits) |
| `SPRING_PROFILES_ACTIVE` | `dev` | Active Spring profile |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api` | Backend API base URL |

---

## API Documentation

Swagger UI is available at: **http://localhost:8080/swagger-ui.html**

### Key Endpoints

#### Authentication
```
POST /api/auth/register/student   Register as student
POST /api/auth/register/expert    Register as expert
POST /api/auth/login              Login (returns JWT tokens)
POST /api/auth/refresh            Refresh access token
GET  /api/auth/me                 Get current user
```

#### Experts (Public)
```
GET  /api/experts                 Search experts (paginated, filtered)
GET  /api/experts/:id             Expert profile
GET  /api/experts/:id/reviews     Expert reviews
GET  /api/experts/:id/availability Expert availability
```

#### Requirements (Student)
```
POST   /api/requirements          Create requirement
GET    /api/requirements          My requirements
GET    /api/requirements/:id/matches  Get matched experts with scores
```

#### Bookings
```
POST /api/bookings                Create booking request
PUT  /api/bookings/:id/accept     Accept (Expert)
PUT  /api/bookings/:id/reject     Reject (Expert)
PUT  /api/bookings/:id/counter-offer  Counter offer (Expert)
PUT  /api/bookings/:id/confirm    Confirm (Student)
PUT  /api/bookings/:id/complete   Mark complete (Expert)
PUT  /api/bookings/:id/cancel     Cancel
```

#### Payments
```
POST /api/payments/create         Create payment order
POST /api/payments/verify         Verify payment (mock: always succeeds)
```

#### Admin
```
GET /api/admin/dashboard          Platform analytics
GET /api/admin/experts/pending    Experts awaiting verification
PUT /api/admin/experts/:id/verify Verify an expert
GET /api/admin/feedback           View feedback submissions
```

#### Feedback (Public)
```
POST /api/feedback                Submit feedback (works for guests too)
```

### Response Format
All responses use a consistent envelope:
```json
{
  "success": true,
  "message": "Booking request created successfully",
  "data": { ... },
  "timestamp": "2024-01-01T10:00:00"
}
```

Error responses:
```json
{
  "success": false,
  "message": "Expert is not available on the selected date",
  "data": null,
  "timestamp": "2024-01-01T10:00:00"
}
```

---

## Demo Credentials

> ⚠️ All demo accounts are seeded on first startup in `dev` profile. Clearly marked as demo accounts.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@lectureconnect.in | Admin@123 |
| **Expert** | prof.sharma@lectureconnect.in | Expert@123 |
| **Expert** | dr.mehta@lectureconnect.in | Expert@123 |
| **Expert** | vikram.singh@lectureconnect.in | Expert@123 |
| **Expert** | anjali.gupta@lectureconnect.in | Expert@123 |
| **Expert** | prof.suresh@lectureconnect.in | Expert@123 |
| **Expert** | dr.nandita@lectureconnect.in | Expert@123 |
| **Expert** | arjun.patel@lectureconnect.in | Expert@123 |
| **Expert** | dr.meena@lectureconnect.in | Expert@123 |
| **Expert** | ravi.verma@lectureconnect.in | Expert@123 |
| **Expert** | prof.sunita@lectureconnect.in | Expert@123 |
| **Student** | rahul.student@lectureconnect.in | Student@123 |
| **Student** | priya.student@lectureconnect.in | Student@123 |
| **Student** | amit.student@lectureconnect.in | Student@123 |
| **Student** | sneha.student@lectureconnect.in | Student@123 |
| **Student** | rohan.student@lectureconnect.in | Student@123 |

---

## Project Structure

```
guestlecture/
├── backend/
│   ├── src/main/java/com/lectureconnect/backend/
│   │   ├── LectureConnectApplication.java
│   │   ├── config/              # Security, CORS, App configs
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic
│   │   │   └── impl/           # Service implementations
│   │   ├── repository/          # Spring Data JPA repos
│   │   ├── entity/              # JPA entities
│   │   ├── dto/
│   │   │   ├── request/        # Incoming request DTOs
│   │   │   └── response/       # Outgoing response DTOs
│   │   ├── mapper/              # Entity↔DTO mappers
│   │   ├── security/            # JWT, UserDetails, Filters
│   │   ├── exception/           # Global handler, custom exceptions
│   │   └── payment/             # PaymentService + implementations
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/        # Flyway SQL migrations
│   ├── src/test/                # JUnit + Mockito tests
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── layouts/             # PublicLayout, DashboardLayout, AuthLayout
│   │   ├── services/            # Axios API service functions
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand stores
│   │   ├── types/               # TypeScript interfaces
│   │   ├── utils/               # Helpers and formatters
│   │   └── routes/              # React Router config
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

Tests cover:
- `AuthServiceTest` — registration, login, duplicate email
- `BookingServiceTest` — status machine, accept/reject/cancel
- `ExpertServiceTest` — search filters, match scoring
- `AuthControllerTest` — API endpoint integration tests

### Frontend Tests
```bash
cd frontend
npm test
```

Tests cover:
- `ExpertCard` component rendering
- `LoginPage` form validation
- `AuthStore` state management

---

## Payment Integration

The MVP uses a `MockPaymentService` that auto-succeeds. To integrate real Razorpay:

1. Set up a Razorpay account at https://razorpay.com
2. Get your API Key ID and Key Secret
3. Implement `RazorpayPaymentService.java` (stub already provided)
4. Add to environment: `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
5. Activate via Spring `@Profile("prod")`

---

## External Service Interfaces

All external services use interface + mock implementation pattern:

| Service | Interface | MVP | Production |
|---------|-----------|-----|-----------|
| Payment | `PaymentService` | `MockPaymentService` | `RazorpayPaymentService` |
| Email | `EmailService` | `MockEmailService` (console logs) | SMTP / SendGrid |
| SMS | `SmsService` | `MockSmsService` (console logs) | Twilio / MSG91 |
| Video | `VideoConferenceService` | `MockVideoConferenceService` | Zoom / Google Meet API |
| Storage | `FileStorageService` | `MockFileStorageService` | AWS S3 / Cloudinary |

---

## License

MIT License — see [LICENSE](LICENSE)

---

*Built with ❤️ for the Indian EdTech ecosystem*
