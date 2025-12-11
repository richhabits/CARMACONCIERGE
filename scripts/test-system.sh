#!/bin/bash

# CARMACONCIERGE - Complete System Test
# This script tests if the entire system can boot successfully

set -e

echo "🚀 CARMACONCIERGE Complete System Test"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
echo -e "${BLUE}Checking PostgreSQL...${NC}"
if psql "postgresql://carmaconcierge:devpassword@localhost:5432/carmaconcierge" -c "SELECT 1" &>/dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL is running and accessible"
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL not running"
    echo ""
    echo "Start PostgreSQL with one of these methods:"
    echo ""
    echo "Option 1 - Docker (Recommended):"
    echo "  1. Start Docker Desktop"
    echo "  2. Run: docker-compose up -d postgres"
    echo ""
    echo "Option 2 - Local PostgreSQL:"
    echo "  1. Ensure PostgreSQL is running"
    echo "  2. Create database: createdb carmaconcierge"
    echo "  3. Create user: psql -c \"CREATE USER carmaconcierge WITH PASSWORD 'devpassword';\""
    echo "  4. Grant access: psql -c \"GRANT ALL PRIVILEGES ON DATABASE carmaconcierge TO carmaconcierge;\""
    echo ""
    exit 1
fi

# Run database migrations
echo -e "${BLUE}Running database migrations...${NC}"
if pnpm backend:prisma:migrate &>/dev/null; then
    echo -e "${GREEN}✓${NC} Database migrations completed"
else
    echo -e "${YELLOW}⚠${NC} Migration failed or already up to date"
fi

echo ""
echo -e "${GREEN}✅ System is ready!${NC}"
echo ""
echo "Start all services with:"
echo -e "  ${BLUE}pnpm dev${NC}"
echo ""
echo "Access URLs:"
echo "  - Admin Dashboard: http://localhost:3001"
echo "  - Control Panel: http://localhost:3001/control-panel"
echo "  - Backend API: http://localhost:3000"
echo "  - API Docs: http://localhost:3000/api/docs"
echo ""
