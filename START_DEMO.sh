#!/bin/bash

echo "🚗 CARMACONCIERGE - Starting Demo for Robert"
echo "============================================"
echo ""

echo "Step 1: Installing dependencies..."
pnpm install

echo ""
echo "Step 2: Starting databases..."
docker-compose up -d postgres redis

echo ""
echo "Step 3: Setting up database..."
pnpm backend:prisma:migrate
pnpm --filter backend prisma:seed

echo ""
echo "Step 4: Starting all applications..."
pnpm dev &

echo ""
echo "✅ DEMO READY!"
echo ""
echo "📚 Open these in your browser:"
echo "   - API Docs:     http://localhost:3000/api/docs"
echo "   - Admin Panel:  http://localhost:3001"
echo "   - Control Panel: http://localhost:3001/control-panel"
echo "   - Analytics:    http://localhost:3001/analytics"
echo ""
echo "📱 Mobile app will open automatically in Expo"
echo ""
echo "🎯 Next: Read DEMO_GUIDE_FOR_ROBERT.md for demo script"
echo ""
