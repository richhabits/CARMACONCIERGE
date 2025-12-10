# 🚀 CARMACONCIERGE - Quick Start Guide

Get your CARMACONCIERGE monorepo up and running in minutes!

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **PostgreSQL** database ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

## 📥 Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/richhabits/CARMACONCIERGE.git
cd CARMACONCIERGE

# Install all dependencies (this will install for all apps)
npm install
```

This will install dependencies for:
- Root workspace
- Backend API
- Mobile app
- Admin dashboard
- Shared package

## ⚙️ Step 2: Configure Environment Variables

### Backend Environment

```bash
# Copy the backend environment template
cp apps/backend/.env.example apps/backend/.env

# Edit apps/backend/.env
nano apps/backend/.env
```

Update the following variables:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/carmaconcierge?schema=public"
PORT=3001
JWT_SECRET="change-this-to-a-secure-random-string"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000,http://localhost:8081"
```

### Mobile App Environment

```bash
# Copy the mobile environment template
cp apps/mobile/.env.example apps/mobile/.env

# Edit if needed (defaults should work)
nano apps/mobile/.env
```

Default:
```env
EXPO_PUBLIC_API_URL="http://localhost:3001/api"
```

**Note for physical devices**: Change `localhost` to your computer's IP address (e.g., `http://192.168.1.100:3001/api`)

### Admin Dashboard Environment

```bash
# Copy the admin environment template
cp apps/admin/.env.example apps/admin/.env

# Edit if needed (defaults should work)
nano apps/admin/.env
```

Default:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

## 🗄️ Step 3: Set Up Database

### Create Database

```bash
# Using PostgreSQL command line
createdb carmaconcierge

# Or using psql
psql -U postgres
CREATE DATABASE carmaconcierge;
\q
```

### Run Migrations

```bash
# Navigate to backend
cd apps/backend

# Generate Prisma Client
npm run generate

# Run database migrations
npm run migrate

# (Optional) Seed the database with sample data
npm run seed

# Go back to root
cd ../..
```

### View Database (Optional)

```bash
# Open Prisma Studio to view/edit data
npm run db:studio
```

This opens a browser interface at `http://localhost:5555`

## 🎯 Step 4: Start Development Servers

### Option A: Start All Apps (Recommended)

```bash
# From root directory, start all apps in parallel
npm run dev
```

This starts:
- ✅ Backend API on `http://localhost:3001`
- ✅ Admin Dashboard on `http://localhost:3000`
- ✅ Mobile App (Expo dev server)

### Option B: Start Apps Individually

**Terminal 1 - Backend API:**
```bash
npm run backend:dev
# Runs on http://localhost:3001
```

**Terminal 2 - Admin Dashboard:**
```bash
npm run admin:dev
# Runs on http://localhost:3000
```

**Terminal 3 - Mobile App:**
```bash
npm run mobile:dev
# Expo dev tools will open
```

## 📱 Step 5: Test the Applications

### Test Backend API

```bash
# Check if backend is running
curl http://localhost:3001/api

# Test registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test Admin Dashboard

1. Open browser to `http://localhost:3000`
2. You should see a redirect to `/login`
3. Create an admin user first via API or database
4. Login with admin credentials

### Test Mobile App

1. Install Expo Go on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from terminal with:
   - iOS: Camera app
   - Android: Expo Go app

3. App should load on your device

**For iOS Simulator:**
```bash
npm run mobile:ios
```

**For Android Emulator:**
```bash
npm run mobile:android
```

## 🧪 Step 6: Verify Setup

### Check All Services

```bash
# Backend API
curl http://localhost:3001/api/health || echo "✗ Backend not running"

# Admin Dashboard
curl http://localhost:3000 || echo "✗ Admin not running"

# Mobile App (check if Expo is running)
ps aux | grep expo || echo "✗ Mobile app not running"
```

### Test Database Connection

```bash
# From backend directory
cd apps/backend
npx prisma studio
# Should open without errors
```

## 🎉 Success! You're Ready to Develop

Your CARMACONCIERGE monorepo is now running with:

✅ **Backend API** - `http://localhost:3001/api`
- Swagger docs: `http://localhost:3001/api/docs` (if configured)
- Prisma Studio: `http://localhost:5555` (run `npm run db:studio`)

✅ **Admin Dashboard** - `http://localhost:3000`
- Login page with authentication
- Dashboard with navigation
- User management

✅ **Mobile App** - Expo Dev Tools
- iOS and Android support
- Hot reload enabled
- Login/Register flows

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start all apps
npm run backend:dev      # Backend only
npm run mobile:dev       # Mobile only
npm run admin:dev        # Admin only

# Database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Building
npm run build            # Build all apps
npm run lint             # Lint all apps
npm run test             # Test all apps

# Cleaning
npm run clean            # Clean all build artifacts
```

## 🆘 Troubleshooting

### Database Connection Error

**Problem**: `Can't reach database server`

**Solution**:
1. Check PostgreSQL is running: `pg_isready`
2. Verify DATABASE_URL in `apps/backend/.env`
3. Check database exists: `psql -l | grep carmaconcierge`
4. Check credentials are correct

### Port Already in Use

**Problem**: `Port 3001 is already in use`

**Solution**:
```bash
# Find and kill process using port
lsof -ti:3001 | xargs kill -9

# Or change port in apps/backend/.env
PORT=3002
```

### Mobile App Can't Connect to API

**Problem**: Network errors on physical device

**Solution**:
1. Change `localhost` to your computer's IP in `apps/mobile/.env`
2. Find your IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. Update to: `EXPO_PUBLIC_API_URL="http://192.168.1.XXX:3001/api"`
4. Restart Expo: `npm run mobile:dev`

### Dependencies Installation Fails

**Problem**: `npm install` errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove all node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Reinstall
npm install
```

### Prisma Generate Fails

**Problem**: `prisma generate` errors

**Solution**:
```bash
# From backend directory
cd apps/backend

# Clean Prisma
rm -rf node_modules/.prisma

# Regenerate
npm run generate
```

## 📚 Next Steps

1. **Read the Documentation**
   - [README.md](./README.md) - Main documentation
   - [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) - Detailed structure
   - [apps/backend/README.md](./apps/backend/README.md) - Backend docs
   - [apps/mobile/README.md](./apps/mobile/README.md) - Mobile docs
   - [apps/admin/README.md](./apps/admin/README.md) - Admin docs

2. **Explore the Code**
   - Check out the Prisma schema: `apps/backend/prisma/schema.prisma`
   - Review shared types: `packages/shared/src/types/index.ts`
   - Explore mobile screens: `apps/mobile/src/screens/`

3. **Start Building**
   - Add new API endpoints in backend modules
   - Create new mobile screens
   - Build admin dashboard pages
   - Extend Prisma schema with new models

## 💡 Pro Tips

1. **Use Turbo for Faster Builds**
   - Turbo is configured and will cache builds
   - Parallel execution enabled

2. **Prisma Studio for Database Management**
   - Visual interface for data
   - Easier than SQL queries
   - Run with `npm run db:studio`

3. **Hot Reload Everywhere**
   - Backend: Watch mode enabled
   - Mobile: Expo fast refresh
   - Admin: Next.js fast refresh

4. **Shared Package Benefits**
   - Types are shared across all apps
   - Single source of truth
   - Type-safe API contracts

## 🤝 Need Help?

- Check the troubleshooting section above
- Review the main [README.md](./README.md)
- Check individual app READMEs
- Review the [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)

---

**Happy Coding! 🚗💨**
