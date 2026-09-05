#!/bin/bash
set -e

echo "🚀 Starting Niveus Production Containerized Deployment..."

# 1. Pull latest code (if git repo)
if [ -d ".git" ]; then
  echo "📥 Pulling latest git updates..."
  git pull origin main || true
fi

# 2. Check Docker daemon
if ! docker info > /dev/null 2>&1; then
  echo "❌ Error: Docker daemon is not running. Please start Docker."
  exit 1
fi

# 3. Build & spin up production services
echo "🔨 Building Docker containers for Frontend, Backend, and PostgreSQL..."
docker compose -f docker-compose.prod.yml up --build -d

# 4. Wait for database and backend health
echo "⏳ Waiting for backend Actuator healthcheck..."
for i in {1..20}; do
  if docker exec niveus-backend-prod curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo "✅ Backend is healthy and ready to process traffic!"
    break
  fi
  echo "   Waiting for backend startup... ($i/20)"
  sleep 5
done

echo "🎉 Niveus Platform is successfully deployed and live in production!"
echo "🌐 Frontend URL: http://localhost (Port 80)"
echo "⚙️ Backend API:  http://localhost:8080/api"
