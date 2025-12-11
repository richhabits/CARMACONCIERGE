#!/bin/bash

# CARMACONCIERGE Setup Verification Script
# This script checks if the development environment is properly configured

set -e

echo "🔍 CARMACONCIERGE Environment Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check Node  Version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION == v18* ]] || [[ $NODE_VERSION == v20* ]] || [[ $NODE_VERSION == v21* ]]; then
    check_pass "Node.js $NODE_VERSION (>= 18.0.0 required)"
else
    check_fail "Node.js $NODE_VERSION (>= 18.0.0 required)"
    exit 1
fi

# Check pnpm
echo "Checking pnpm..."
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    check_pass "pnpm $PNPM_VERSION installed"
else
    check_fail "pnpm not found. Install with: npm install -g pnpm"
    exit 1
fi

# Check if dependencies are installed
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    check_pass "Root dependencies installed"
else
    check_fail "Root dependencies missing. Run: pnpm install"
    exit 1
fi

if [ -d "apps/backend/node_modules" ]; then
    check_pass "Backend dependencies installed"
else
    check_fail "Backend dependencies missing. Run: pnpm install"
    exit 1
fi

if [ -d "apps/admin/node_modules" ]; then
    check_pass "Admin dependencies installed"
else
    check_fail "Admin dependencies missing. Run: pnpm install"
    exit 1
fi

if [ -d "apps/mobile/node_modules" ]; then
    check_pass "Mobile dependencies installed"
else
    check_fail "Mobile dependencies missing. Run: pnpm install"
    exit 1
fi

# Check if Prisma Client is generated
echo "Checking Prisma Client..."
if [ -d "node_modules/.pnpm/@prisma+client"* ]; then
    check_pass "Prisma Client generated"
else
    check_warn "Prisma Client not found. Run: pnpm backend:prisma:generate"
fi

# Check if shared package is built
echo "Checking shared package..."
if [ -d "packages/shared/dist" ]; then
    check_pass "Shared package built"
else
    check_warn "Shared package not built. Run: pnpm --filter @carmaconcierge/shared build"
fi

# Check environment files
echo "Checking environment files..."
if [ -f "apps/backend/.env" ]; then
    check_pass "Backend .env exists"
else
    check_warn "Backend .env missing (will use defaults)"
fi

if [ -f "apps/admin/.env" ]; then
    check_pass "Admin .env exists"
else
    check_warn "Admin .env missing (will use defaults)"
fi

if [ -f "apps/mobile/.env" ]; then
    check_pass "Mobile .env exists"
else
    check_warn "Mobile .env missing (will use defaults)"
fi

# Check PostgreSQL connection
echo "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    check_pass "PostgreSQL client (psql) found"
    
    # Try to connect to database
    if psql "postgresql://carmaconcierge:carmaconcierge@localhost:5432/carmaconcierge" -c "SELECT 1" &> /dev/null; then
        check_pass "PostgreSQL database accessible"
    else
        check_warn "PostgreSQL database not accessible. Start it with: docker-compose up postgres"
    fi
else
    check_warn "PostgreSQL client not found (optional if using Docker)"
fi

# Check Docker
echo "Checking Docker..."
if command -v docker &> /dev/null; then
    check_pass "Docker installed"
    
    # Check if postgres container is running
    if docker ps | grep -q postgres; then
        check_pass "PostgreSQL Docker container running"
    else
        check_warn "PostgreSQL container not running. Start with: docker-compose up postgres"
    fi
else
    check_warn "Docker not found (optional)"
fi

echo ""
echo "=========================================="
echo "✅ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. If any checks failed, follow the instructions above"
echo "2. Run 'pnpm dev' to start all services"
echo "3. Access services at:"
echo "   - Admin: http://localhost:3001"
echo "   - Control Panel: http://localhost:3001/control-panel"
echo "   - API: http://localhost:3000"
echo "   - API Docs: http://localhost:3000/api/docs"
echo ""
