#!/bin/bash

# 🚀 CARMACONCIERGE - CLEAN START SCRIPT
# Run this to cleanly start the entire system

set -e

echo "🧹 CARMACONCIERGE - CLEAN START"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean all build artifacts
echo -e "${YELLOW}📦 Step 1: Cleaning build artifacts...${NC}"
rm -rf apps/backend/dist
rm -rf apps/admin/.next
rm -rf .turbo
rm -rf node_modules/.cache
echo -e "${GREEN}✓ Build artifacts cleaned${NC}"
echo ""

# Step 2: Check PostgreSQL
echo -e "${YELLOW}🗄️  Step 2: Checking PostgreSQL...${NC}"
if psql "postgresql://carmaconcierge:devpassword@localhost:5432/carmaconcierge" -c "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
    echo -e "${RED}✗ PostgreSQL not accessible${NC}"
    echo "  Please ensure PostgreSQL is running:"
    echo "  - Docker: docker-compose up -d postgres"
    echo "  - Or local PostgreSQL with user 'carmaconcierge' and database 'carmaconcierge'"
    exit 1
fi
echo ""

# Step 3: Verify Prisma Client
echo -e "${YELLOW}🔧 Step 3: Verifying Prisma Client...${NC}"
if [ -d "node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client" ]; then
    echo -e "${GREEN}✓ Prisma Client exists${NC}"
else
    echo -e "${YELLOW}⚠ Regenerating Prisma Client...${NC}"
    pnpm backend:prisma:generate > /dev/null 2>&1
    echo -e "${GREEN}✓ Prisma Client generated${NC}"
fi
echo ""

# Step 4: Kill any processes on ports 3000, 3001
echo -e "${YELLOW}🔌 Step 4: Freeing ports 3000 and 3001...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}✓ Ports freed${NC}"
echo ""

# Step 5: Start development servers
echo -e "${GREEN}🚀 Step 5: Starting all services...${NC}"
echo ""
echo "  Backend API will start on: http://localhost:3000"
echo "  Admin Dashboard: http://localhost:3001"
echo "  Control Panel: http://localhost:3001/control-panel"
echo "  API Docs: http://localhost:3000/api/docs"
echo ""
echo -e "${YELLOW}Starting now...${NC}"
echo ""

pnpm dev
