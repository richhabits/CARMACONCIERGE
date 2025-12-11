# CARMACONCIERGE (KARMA) 🚗

> **National vehicle management platform** - MOT, servicing, repairs, marketplace, payments and fleet oversight.

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.18.3-orange)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-Private-red)]()

---

## ⚡ **QUICK START** (5-Minute Onboarding)

For a **brand new developer** who just cloned this repo:

```bash
# 1. Install dependencies
pnpm install

# 2. Start all services
pnpm dev
```

**That's it!** Access the running services at:

- 🎛️ **Admin Dashboard**: [http://localhost:3001](http://localhost:3001)
- 🎛️ **Control Panel**: [http://localhost:3001/control-panel](http://localhost:3001/control-panel)
- 📡 **Backend API**: [http://localhost:3000](http://localhost:3000)
- 📖 **API Docs (Swagger)**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- 📱 **Mobile**: Expo DevTools will open automatically

**Note**: The first run will take longer as Prisma generates the database client automatically.

---

## 📋 **PREREQUISITES**

Before you begin, ensure you have these installed:

| Tool | Version | Required? | Installation |
|------|---------|-----------|--------------|
| **Node.js** | >= 18.0.0 | ✅ Yes | [Download](https://nodejs.org/) |
| **pnpm** | >= 8.0.0 | ✅ Yes | `npm install -g pnpm` |
| **PostgreSQL** | >= 14.0 | ✅ Yes | [Download](https://www.postgresql.org/download/) or use Docker |
| **Redis** | Latest | ⚠️ Optional | For caching (not required for basic dev) |
| **Docker** | Latest | ⚠️ Optional | Alternative to local PostgreSQL |

**Recommended**: Use Docker for PostgreSQL to avoid local DB setup:

```bash
docker-compose up postgres
```

---

## 🏗️ **PROJECT STRUCTURE**

This is a **pnpm monorepo** with the following services:

```
CARMACONCIERGE/
├── apps/
│   ├── backend/           # 🎯 NestJS API Server (Port 3000)
│   │   ├── src/           # Source code (auth, users, vehicles, jobs, etc.)
│   │   └── prisma/        # Database schema & migrations
│   │
│   ├── admin/             # 🎛️ Next.js Admin Dashboard (Port 3001)
│   │   ├── app/           # Next.js 14 App Router pages
│   │   └── lib/           # API clients and utilities
│   │
│   └── mobile/            # 📱 React Native/Expo Mobile App
│       ├── app/           # Expo Router screens
│       └── services/      # API, offline queue, notifications
│
└── packages/
    └── shared/            # 📦 Shared TypeScript types across all apps
```

### Service Responsibilities:

- **Backend** (`apps/backend`): REST API, WebSockets, Authentication, Database
- **Admin** (`apps/admin`): Web dashboard for managing users, vehicles, jobs
- **Mobile** (`apps/mobile`): Customer-facing mobile app with offline support
- **Shared** (`packages/shared`): Common TypeScript interfaces and types

---

## 🚀 **INSTALLATION**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CARMACONCIERGE
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will:
- Install all dependencies for all workspaces
- Build the shared package automatically
- Set up TypeScript and linting

### Step 3: Configure Environment Variables

Environment files are **already created** with sensible defaults. You can use them as-is for local development.

**If you need to customize:**

```bash
# Backend (apps/backend/.env)
DATABASE_URL="postgresql://carmaconcierge:carmaconcierge@localhost:5432/carmaconcierge?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000

# Admin (apps/admin/.env)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Mobile (apps/mobile/.env)
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**All optional services** (Stripe, AI APIs, UK Vehicle APIs) can be left empty - they're not required for development.

### Step 4: Start Database

**Option A - Docker (Recommended):**
```bash
docker-compose up postgres
```

**Option B - Local PostgreSQL:**
- Ensure PostgreSQL is running on port 5432
- Create database: `createdb carmaconcierge`
- Update `DATABASE_URL` in `apps/backend/.env` if needed

### Step 5: Initialize Database

```bash
# Generate Prisma Client (happens automatically on first pnpm install)
pnpm backend:prisma:generate

# Run migrations
pnpm backend:prisma:migrate

# (Optional) Seed sample data
pnpm --filter backend prisma:seed
```

### Step 6: Start Development

```bash
pnpm dev
```

This single command starts:
- ✅ Backend API (port 3000)
- ✅ Admin Dashboard (port 3001)
- ✅ Mobile Expo server (auto-determines port)

**All services will run concurrently with hot reload enabled.**

---

## 🛠️ **DEVELOPMENT SCRIPTS**

### Root-Level Commands (Run from project root):

| Command | Description |
|---------|-------------|
| `pnpm dev` | 🚀 Start all apps in development mode |
| `pnpm build` | 📦 Build all apps for production |
| `pnpm lint` | 🔍 Lint all apps |
| `pnpm format` | 💅 Format code with Prettier |
| `pnpm backend:dev` | Start only backend |
| `pnpm admin:dev` | Start only admin |
| `pnpm mobile:dev` | Start only mobile |
| `pnpm backend:prisma:generate` | Generate Prisma Client |
| `pnpm backend:prisma:migrate` | Run database migrations |
| `pnpm backend:prisma:studio` | Open Prisma Studio (DB GUI) |

### Backend-Specific Commands:

```bash
cd apps/backend

pnpm dev                    # Start with hot reload
pnpm build                  # Build for production
pnpm start:prod             # Run production build
pnpm test                   # Run unit tests
pnpm test:e2e               # Run E2E tests
pnpm test:cov               # Run tests with coverage
pnpm prisma:migrate         # Create and run migration
pnpm prisma:studio          # Database GUI
pnpm prisma:seed            # Seed database
```

### Admin-Specific Commands:

```bash
cd apps/admin

pnpm dev                    # Start Next.js dev server
pnpm build                  # Build for production
pnpm start                  # Run production build
```

### Mobile-Specific Commands:

```bash
cd apps/mobile

pnpm dev                    # Start Expo dev server
pnpm android                # Run on Android device/emulator
pnpm ios                    # Run on iOS simulator
pnpm web                    # Run in web browser
```

---

## 🌐 **ACCESSING SERVICES**

Once `pnpm dev` is running, access these URLs:

| Service | URL | Purpose |
|---------|-----|---------|
| 🎛️ **Admin Dashboard** | [http://localhost:3001](http://localhost:3001) | Web-based admin interface |
| 🎛️ **Control Panel** | [http://localhost:3001/control-panel](http://localhost:3001/control-panel) | Advanced admin controls |
| 📡 **Backend API** | [http://localhost:3000](http://localhost:3000) | REST API base URL |
| 📖 **API Documentation** | [http://localhost:3000/api/docs](http://localhost:3000/api/docs) | Swagger/OpenAPI docs |
| 📱 **Mobile** | Expo DevTools | Scan QR code with Expo Go app |

---

## 💾 **DATABASE MANAGEMENT**

### Prisma Workflow:

```bash
# Generate Prisma Client (after schema changes)
pnpm backend:prisma:generate

# Create a new migration
pnpm backend:prisma:migrate

# Reset database (⚠️ DELETES ALL DATA)
pnpm --filter backend prisma:reset

# Seed database with sample data
pnpm --filter backend prisma:seed

# Open Prisma Studio (visual database editor)
pnpm backend:prisma:studio
```

### Database Schema Location:
- Schema: `apps/backend/prisma/schema.prisma`
- Migrations: `apps/backend/prisma/migrations/`

---

## 🐋 **DOCKER DEVELOPMENT**

Use Docker for a zero-configuration database setup:

```bash
# Start PostgreSQL & Redis
docker-compose up postgres redis

# Start PostgreSQL only
docker-compose up postgres

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v
```

---

## 🔧 **TROUBLESHOOTING**

### Problem: "Failed to fetch" or Connection Refused

**Solution**: Ensure PostgreSQL is running and DATABASE_URL is correct.

```bash
# Check if PostgreSQL is running
psql -U carmaconcierge -d carmaconcierge -h localhost -p 5432

# Or use Docker
docker-compose up postgres
```

### Problem: Prisma Client errors

**Solution**: Regenerate Prisma Client.

```bash
pnpm backend:prisma:generate
```

### Problem: Port already in use

**Solution**: Kill the process using the port.

```bash
# Find process on port 3000
lsof -ti:3000 | xargs kill -9

# Find process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Problem: pnpm install fails

**Solution**: Clear cache and reinstall.

```bash
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm store prune
pnpm install
```

### Problem: Mobile app won't connect to API

**Solution**: Update mobile .env with your local IP.

```bash
# Find your local IP
ifconfig | grep "inet "

# Update apps/mobile/.env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```

### Problem: Build fails after dependency changes

**Solution**: Rebuild shared package first.

```bash
pnpm --filter @carmaconcierge/shared build
pnpm build
```

---

## 🔒 **SECURITY FEATURES**

- ✅ JWT authentication with 7-day expiry
- ✅ Role-based access control (RBAC)
- ✅ Rate limiting (100 requests/minute)
- ✅ Input validation (class-validator)
- ✅ CORS configuration
- ✅ Password hashing (bcrypt)
- ✅ Secure file uploads

---

## 📦 **TECH STACK**

### Backend:
- **Framework**: NestJS 10
- **Database**: PostgreSQL 15 + Prisma 5
- **Cache**: Redis (optional)
- **Auth**: JWT + Passport
- **WebSockets**: Socket.io
- **Testing**: Jest

### Admin Dashboard:
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Data Fetching**: React Query

### Mobile App:
- **Framework**: React Native + Expo 50
- **Navigation**: Expo Router
- **State**: React Query
- **Offline**: Custom queue manager

### Monorepo:
- **Package Manager**: pnpm workspaces
- **Build Tool**: Turbo
- **Linting**: ESLint + Prettier

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify everything works:

- [ ] `pnpm dev` runs without errors
- [ ] Backend accessible at http://localhost:3000
- [ ] Admin accessible at http://localhost:3001
- [ ] API docs accessible at http://localhost:3000/api/docs
- [ ] Mobile Expo DevTools opens
- [ ] No console errors in any service

---

## 📚 **ADDITIONAL RESOURCES**

- **Prisma Docs**: https://www.prisma.io/docs
- **NestJS Docs**: https://docs.nestjs.com
- **Next.js Docs**: https://nextjs.org/docs
- **Expo Docs**: https://docs.expo.dev

---

## 🤝 **CONTRIBUTING**

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run linting: `pnpm lint`
4. Run tests: `cd apps/backend && pnpm test`
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

---

## 📄 **LICENSE**

Private - CARMACONCIERGE

---

**Need help?** Open an issue in the repository or consult the troubleshooting section above.