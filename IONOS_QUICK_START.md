# ⚡ IONOS QUICK START (5 Minutes)

**Fast track guide for experienced developers.**

---

## 1. DATABASE
1. **Create PostgreSQL DB** in IONOS (or external like Neon/Supabase).
2. **Copy Connection String:** `postgresql://user:pass@host:5432/db`

## 2. BACKEND API
1. **IONOS Dashboard** → Websites → Create Website → **GitHub**.
2. **Repo:** `richhabits/CARMACONCIERGE` | **Branch:** `main` | **Root:** `apps/backend`
3. **Env Vars:**
   - `DATABASE_URL` = (Your connection string)
   - `JWT_SECRET`= (Random string)
   - `CORS_ORIGIN` = `https://your-frontend.ionos.com`
4. **Deploy** & Copy URL (e.g., `https://api.carmaconcierge.co.uk`)

## 3. FRONTEND (ADMIN)
1. **IONOS Dashboard** → Create Website → **GitHub**.
2. **Repo:** `richhabits/CARMACONCIERGE` | **Branch:** `main` | **Root:** `apps/admin`
3. **Env Vars:**
   - `NEXT_PUBLIC_API_URL` = `https://api.carmaconcierge.co.uk/api/v1` (Backend URL)
4. **Deploy**.

## 4. FINISH
1. **Migrations:** SSH into backend or use IONOS Terminal: `npx prisma migrate deploy`
2. **Test:** Open Frontend URL.

---
**Need help?** See `DEPLOY_TO_IONOS.md` for full details.
