# 🚀 CARMACONCIERGE Setup Guide

This guide walks you through setting up CARMACONCIERGE from scratch in **under 5 minutes**.

---

## ✅ Step-by-Step Setup

### 1️⃣ Prerequisites Check

Ensure you have these installed:

- **Node.js** >= 18.0.0 → `node --version`
- **pnpm** >= 8.0.0 → `pnpm --version` (install with `npm install -g pnpm`)
- **Docker** (recommended for PostgreSQL) → `docker --version`

### 2️⃣ Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd CARMACONCIERGE

# Install all dependencies
pnpm install
```

**What this does:**
- Installs dependencies for all workspaces (backend, admin, mobile, shared)
- Builds the shared package automatically
- Generates Prisma Client automatically (via postinstall hook)

### 3️⃣ Start PostgreSQL Database

You have two options:

**Option A - Docker (Recommended):**
```bash
# Start PostgreSQL container in background
docker-compose up -d postgres
```

**Option B - Local PostgreSQL:**
```bash
# If you have PostgreSQL installed locally
createdb carmaconcierge
```

Verify database is running:
```bash
psql "postgresql://carmaconcierge:devpassword@localhost:5432/carmaconcierge" -c "SELECT 1"
```

### 4️⃣ Initialize Database

```bash
# Run database migrations
pnpm backend:prisma:migrate

# (Optional) Seed sample data
pnpm --filter backend prisma:seed
```

### 5️⃣ Start Development

```bash
# Start ALL services at once
pnpm dev
```

This will start:
- ✅ **Backend API** on port 3000
- ✅ **Admin Dashboard** on port 3001
- ✅ **Mobile Expo** server (auto-port)

---

## 🌐 Access Services

Once `pnpm dev` is running, open these URLs:

| Service | URL |
|---------|-----|
| 🎛️ Admin Dashboard | [http://localhost:3001](http://localhost:3001) |
| 🎛️ Control Panel | [http://localhost:3001/control-panel](http://localhost:3001/control-panel) |
| 📡 Backend API | [http://localhost:3000](http://localhost:3000) |
| 📖 API Docs | [http://localhost:3000/api/docs](http://localhost:3000/api/docs) |
| 📱 Mobile | Scan QR code in terminal with Expo Go app |

---

## 🔧 Verify Setup

Run the verification script:

```bash
./scripts/verify-setup.sh
```

This checks:
- ✅ Node.js and pnpm versions
- ✅ Dependencies installed
- ✅ Prisma Client generated
- ✅ Environment files exist
- ✅ PostgreSQL connectivity

---

## 🐛 Troubleshooting

### Problem: "Cannot find module '@carmaconcierge/shared'"

**Solution:**
```bash
pnpm --filter @carmaconcierge/shared build
```

### Problem: "Prisma Client not generated"

**Solution:**
```bash
pnpm backend:prisma:generate
```

### Problem: "Database connection failed"

**Solution:**
```bash
# Ensure PostgreSQL is running
docker-compose up -d postgres

# Test connection
psql "postgresql://carmaconcierge:devpassword@localhost:5432/carmaconcierge" -c "SELECT 1"
```

### Problem: "Port 3000 or 3001 already in use"

**Solution:**
```bash
# Kill processes on those ports
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Problem: Mobile app can't connect to API

**Solution:**

Find your local IP:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Update `apps/mobile/.env`:
```bash
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```

---

## 📂 Environment Variables

All services have `.env` files pre-configured with working defaults.

### Backend (`apps/backend/.env`)

**Required:**
- `DATABASE_URL` - PostgreSQL connection string ✅ Configured
- `JWT_SECRET` - Authentication secret ✅ Configured
- `PORT` - Server port (3000) ✅ Configured

**Optional:**
- `STRIPE_SECRET_KEY` - Payment integration (leave empty)
- `OLLAMA_URL` - AI integration (leave empty)
- `DVSA_API_KEY` - UK vehicle data (leave empty)

### Admin (`apps/admin/.env`)

- `NEXT_PUBLIC_API_URL=http://localhost:3000` ✅ Configured

### Mobile (`apps/mobile/.env`)

- `EXPO_PUBLIC_API_URL=http://localhost:3000` ✅ Configured
- For real device testing, use your local IP instead of `localhost`

---

## 🚀 Quick Commands Reference

```bash
# Start all services
pnpm dev

# Start individual services
pnpm backend:dev
pnpm admin:dev
pnpm mobile:dev

# Database management
pnpm backend:prisma:migrate     # Run migrations
pnpm backend:prisma:studio      # Open DB GUI
pnpm backend:prisma:generate    # Regenerate Prisma Client

# Testing
cd apps/backend && pnpm test

# Linting & Formatting
pnpm lint
pnpm format

# Clean build
pnpm clean
pnpm install
pnpm dev
```

---

## ✅ Success Checklist

After setup, verify:

- [ ] `pnpm dev` runs without errors
- [ ] Backend accessible at http://localhost:3000
- [ ] Admin accessible at http://localhost:3001
- [ ] API docs accessible at http://localhost:3000/api/docs
- [ ] Mobile Expo DevTools opens
- [ ] No console errors in any service
- [ ] Database migrations ran successfully
- [ ] Swagger UI loads correctly

---

## 🎯 Next Steps

1. **Explore API Docs**: Visit http://localhost:3000/api/docs
2. **Create Admin User**: Use Prisma Studio or seed script
3. **Test Mobile App**: Scan QR code with Expo Go
4. **Read Documentation**: Check README.md for full feature list

---

## 💡 Pro Tips

- **Use Docker**: Easiest way to manage PostgreSQL and Redis
- **Prisma Studio**: Visual database editor at `pnpm backend:prisma:studio`
- **Hot Reload**: All services support hot reload - changes reflect instantly
- **Turbo Cache**: Second builds are much faster thanks to Turbo
- **View Logs**: Each service shows colored logs in the terminal

---

## 📞 Need Help?

- Check the **Troubleshooting** section above
- Run `./scripts/verify-setup.sh` to diagnose issues
- Read the full **README.md** for detailed documentation
- Open an issue in the repository

---

**Estimated Setup Time**: 5 minutes ⏱️

**You're now ready to develop! 🎉**
