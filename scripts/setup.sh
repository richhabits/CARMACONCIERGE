#!/bin/bash

set -e

echo "🚀 Setting up CARMACONCIERGE monorepo..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

echo "✅ pnpm found"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build shared package
echo "🔨 Building shared package..."
pnpm --filter @carmaconcierge/shared build

# Generate Prisma Client
echo "🗄️  Generating Prisma Client..."
pnpm --filter backend prisma:generate

# Check if .env files exist
if [ ! -f "apps/backend/.env" ]; then
    echo "⚠️  Backend .env not found. Copying from example..."
    cp apps/backend/env.example apps/backend/.env
    echo "📝 Please update apps/backend/.env with your database credentials"
fi

if [ ! -f "apps/mobile/.env" ]; then
    echo "⚠️  Mobile .env not found. Copying from example..."
    cp apps/mobile/env.example apps/mobile/.env
fi

if [ ! -f "apps/admin/.env" ]; then
    echo "⚠️  Admin .env not found. Copying from example..."
    cp apps/admin/env.example apps/admin/.env
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in apps/*/.env files"
echo "2. Start PostgreSQL database (or use docker-compose up postgres)"
echo "3. Run database migrations: pnpm backend:prisma:migrate"
echo "4. (Optional) Seed database: pnpm --filter backend prisma:seed"
echo "5. Start development: pnpm dev"
echo ""
