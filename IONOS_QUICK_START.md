# ⚡ IONOS QUICK START - 5 Minute Setup

## 🎯 Fast Track Deployment

### 1. Database (2 minutes)

**Option A: Neon (Free)**
1. Go to: https://neon.tech → Sign up
2. Create project: `carmaconcierge`
3. Copy connection string

**Option B: IONOS Database**
1. IONOS Dashboard → Databases
2. Create PostgreSQL
3. Copy connection string

---

### 2. Backend Deployment (2 minutes)

1. **IONOS Dashboard** → Create Website
2. **Connect GitHub**: `richhabits/CARMACONCIERGE`
3. **Root Directory**: `apps/backend`
4. **Build Command**: `pnpm install && pnpm --filter backend build`
5. **Start Command**: `pnpm --filter backend start:prod`

**Environment Variables:**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your-32-char-secret-key-here
CORS_ORIGIN=https://your-frontend.ionos.com
NODE_ENV=production
```

**Note Backend URL:** `https://your-backend.ionos.com`

---

### 3. Frontend Deployment (1 minute)

1. **IONOS Dashboard** → Create Website
2. **Connect GitHub**: `richhabits/CARMACONCIERGE`
3. **Root Directory**: `apps/admin`
4. **Build Command**: `pnpm install && pnpm --filter admin build`
5. **Start Command**: `pnpm --filter admin start`

**Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.ionos.com/api/v1
NODE_ENV=production
```

---

### 4. Run Migrations

**IONOS Terminal:**
```bash
cd apps/backend
pnpm prisma migrate deploy
```

---

## ✅ Test

- Backend: `https://your-backend.ionos.com/health`
- Frontend: `https://your-frontend.ionos.com`

---

## 🆘 Issues?

See full guide: `DEPLOY_TO_IONOS.md`

**Common Fixes:**
- Database not connecting? Check `DATABASE_URL`
- CORS errors? Set `CORS_ORIGIN` correctly
- Build failing? Check Node version (20+)

---

**🚀 That's it! Your site is live!**
