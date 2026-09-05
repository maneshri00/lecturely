# Niveus Platform - Production Deployment & Cloud Scaling Blueprint

This document provides a step-by-step guide to deploying the **Niveus Guest Lecture & Expert Connect Platform** to production environments (AWS, Render, Railway, DigitalOcean, Docker VPS).

---

## 🏗️ Architecture Overview

The system consists of 3 containerized microservices:
1. **Frontend**: React + Vite + TypeScript, served by Nginx with Gzip compression and static asset caching.
2. **Backend**: Spring Boot 3 + Java 21, running HikariCP connection pooling, Actuator health probes, and Async SMTP dispatch.
3. **Database**: PostgreSQL 16 Alpine database with persistent disk volumes.

```
[ Client Browser / Mobile ] 
           │
           ▼ (HTTPS / Port 443)
┌────────────────────────────────────────┐
│ Nginx Frontend Container (Port 80/443) │
└──────────────────┬─────────────────────┘
                   │ Reverse Proxy /api
                   ▼ (Port 8080)
┌────────────────────────────────────────┐
│ Spring Boot Backend (Actuator Probes)   │
└──────────────────┬─────────────────────┘
                   │ HikariCP JDBC
                   ▼ (Port 5432)
┌────────────────────────────────────────┐
│ PostgreSQL 16 Database Volume           │
└────────────────────────────────────────┘
```

---

## 🚀 Deployment Option A: 1-Click Docker Compose (AWS EC2 / DigitalOcean / VPS)

### Prerequisites:
- Ubuntu 22.04 LTS or Debian Server with Docker & Docker Compose installed.

### Steps:
1. **Clone Repository**:
   ```bash
   git clone https://github.com/your-username/guestlecture.git /opt/niveus
   cd /opt/niveus
   ```

2. **Configure Production Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   POSTGRES_DB=niveusdb
   POSTGRES_USER=niveususer
   POSTGRES_PASSWORD=YourStrongDatabasePassword2026!
   JWT_SECRET=your-minimum-256-bit-super-secret-production-jwt-key-here
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

3. **Execute 1-Click Deployment Script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Verify Container Health**:
   ```bash
   docker compose -f docker-compose.prod.yml ps
   ```

---

## ☁️ Deployment Option B: Free / Low-Cost Cloud PaaS (Render / Railway / Fly.io)

### Backend Deployment on Render / Railway:
1. Create a **PostgreSQL Database** on Render/Railway. Copy the internal Connection String.
2. Create a **Web Service** pointing to `/backend`.
3. Set Build Command: `docker` (uses `backend/Dockerfile`).
4. Set Environment Variables:
   - `DATABASE_URL`: `jdbc:postgresql://<host>:5432/<dbname>`
   - `DATABASE_USERNAME`: `<dbuser>`
   - `DATABASE_PASSWORD`: `<dbpass>`
   - `JWT_SECRET`: `<your-jwt-secret>`
   - `SPRING_PROFILES_ACTIVE`: `prod`

### Frontend Deployment on Vercel / Netlify / Render:
1. Create a **Static Web App** pointing to `/frontend`.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api`

---

## 🔒 SSL & HTTPS Setup (Certbot + Nginx)

To enable free SSL certificates on your VPS:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 💾 Database Backup & Restore

### Create Instant Database Dump:
```bash
docker exec -t niveus-postgres-prod pg_dump -U niveususer niveusdb > backup_$(date +%F).sql
```

### Restore Database Dump:
```bash
cat backup.sql | docker exec -i niveus-postgres-prod psql -U niveususer -d niveusdb
```

---

## 📊 Monitoring & Actuator Health Endpoint

The backend exposes Spring Boot Actuator endpoints for automated cloud monitoring & uptime probes:
- **Health Check**: `GET http://your-backend:8080/actuator/health`
- **Response**: `{"status": "UP"}`
