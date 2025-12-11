# 🚀 DEPLOY TO IONOS - Complete Guide

## ✅ Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [x] All files committed
- [x] Repository: `https://github.com/richhabits/CARMACONCIERGE`
- [ ] IONOS account ready
- [ ] Database created (PostgreSQL)
- [ ] Environment variables prepared

---

## 📋 STEP 1: Create PostgreSQL Database

### Option A: IONOS Database (Recommended)

1. **Log into IONOS Dashboard**
   - Go to: https://www.ionos.co.uk/
   - Navigate to: **My Products** → **Databases**

2. **Create PostgreSQL Database**
   - Click **Create Database**
   - Choose **PostgreSQL** (version 14 or 15)
   - Select region (UK recommended)
   - Set database name: `carmaconcierge`
   - Create admin user and **SAVE THE PASSWORD**

3. **Get Connection String**
   - Format: `postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`
   - Example: `postgresql://admin:YourPassword@db123.ionos.com:5432/carmaconcierge`
   - **COPY THIS - You'll need it!**

### Option B: External Database (Neon/Supabase)

If IONOS doesn't offer PostgreSQL, use:

**Neon (Free Tier Available):**
1. Go to: https://neon.tech/
2. Sign up (free tier available)
3. Create project: `carmaconcierge`
4. Copy connection string

**Supabase (Free Tier Available):**
1. Go to: https://supabase.com/
2. Create project
3. Go to Settings → Database
4. Copy connection string

---

## 📋 STEP 2: Configure IONOS Environment Variables

### Backend Environment Variables

In IONOS Dashboard → Your App → Environment Variables, add:

```bash
# Database (CRITICAL - Replace with your actual connection string)
DATABASE_URL=postgresql://username:password@host:5432/carmaconcierge

# JWT Secret (Generate a random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long

# CORS (Replace with your actual frontend URL)
CORS_ORIGIN=https://your-domain.ionos.com

# Node Environment
NODE_ENV=production

# Port (IONOS usually sets this automatically)
PORT=3000

# API Keys (Optional - Add when ready)
DVLA_API_KEY=your-dvla-key-if-you-have-one
DVSA_API_KEY=your-dvsa-key-if-you-have-one
TFL_API_KEY=your-tfl-key-if-you-have-one

# Twilio (Optional - For calling features)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number

# Stripe (Optional - For payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Redis (Optional - For caching)
REDIS_URL=redis://your-redis-url:6379

# Email (Optional - For notifications)
SMTP_HOST=smtp.ionos.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
```

### Frontend (Admin) Environment Variables

```bash
# Backend API URL (CRITICAL - Replace with your backend URL)
NEXT_PUBLIC_API_URL=https://your-backend.ionos.com/api/v1

# Node Environment
NODE_ENV=production

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

## 📋 STEP 3: Deploy Backend to IONOS

### Method 1: GitHub Integration (Recommended)

1. **IONOS Dashboard**
   - Go to: **Websites & Stores** → **Websites**
   - Click **Create Website** or **Add Website**

2. **Connect GitHub**
   - Choose **GitHub** as source
   - Authorize IONOS to access your GitHub
   - Select repository: `richhabits/CARMACONCIERGE`
   - Select branch: `main`
   - Set root directory: `apps/backend`

3. **Build Settings**
   - **Build Command**: `pnpm install && pnpm --filter backend build`
   - **Start Command**: `pnpm --filter backend start:prod`
   - **Node Version**: `20` (or latest LTS)

4. **Environment Variables**
   - Add all backend variables from Step 2
   - **CRITICAL**: Set `DATABASE_URL` correctly!

5. **Deploy**
   - Click **Deploy**
   - Wait for build to complete
   - Note the URL: `https://your-backend.ionos.com`

### Method 2: Manual Deployment

If GitHub integration isn't available:

1. **Build Locally**
   ```bash
   cd apps/backend
   pnpm install
   pnpm build
   ```

2. **Upload to IONOS**
   - Use IONOS File Manager or FTP
   - Upload the `dist` folder
   - Upload `package.json`
   - Upload `node_modules` (or install on server)

3. **Configure**
   - Set start command: `node dist/main.js`
   - Add environment variables

---

## 📋 STEP 4: Deploy Frontend (Admin) to IONOS

### Method 1: GitHub Integration

1. **Create Second Website**
   - Go to: **Websites & Stores** → **Websites**
   - Click **Create Website**

2. **Connect GitHub**
   - Select same repository: `richhabits/CARMACONCIERGE`
   - Select branch: `main`
   - Set root directory: `apps/admin`

3. **Build Settings**
   - **Build Command**: `pnpm install && pnpm --filter admin build`
   - **Start Command**: `pnpm --filter admin start`
   - **Node Version**: `20`

4. **Environment Variables**
   - Add all frontend variables from Step 2
   - **CRITICAL**: Set `NEXT_PUBLIC_API_URL` to your backend URL!

5. **Deploy**
   - Click **Deploy`
   - Note the URL: `https://your-frontend.ionos.com`

### Method 2: Static Export (Alternative)

If IONOS supports static hosting:

1. **Build Locally**
   ```bash
   cd apps/admin
   pnpm install
   NEXT_PUBLIC_API_URL=https://your-backend.ionos.com/api/v1 pnpm build
   ```

2. **Export**
   - Next.js will create `out` folder
   - Upload `out` folder contents to IONOS

---

## 📋 STEP 5: Run Database Migrations

After backend is deployed:

1. **SSH into IONOS Server** (if available)
   ```bash
   ssh user@your-backend.ionos.com
   cd /path/to/backend
   pnpm prisma migrate deploy
   ```

2. **Or Use IONOS Terminal**
   - Go to: **Your Website** → **Terminal**
   - Run: `pnpm prisma migrate deploy`

3. **Seed Database** (Optional)
   ```bash
   pnpm prisma db seed
   ```

---

## 📋 STEP 6: Verify Deployment

### Test Backend

1. **Health Check**
   - Visit: `https://your-backend.ionos.com/health`
   - Should return: `{"status":"ok"}`

2. **API Test**
   - Visit: `https://your-backend.ionos.com/api/v1/vehicles`
   - Should return JSON (may be empty array)

### Test Frontend

1. **Homepage**
   - Visit: `https://your-frontend.ionos.com`
   - Should show UK automotive homepage

2. **API Connection**
   - Open browser console (F12)
   - Check for API errors
   - Should connect to backend successfully

---

## 🔧 TROUBLESHOOTING

### Database Connection Issues

**Error**: `Can't reach database server`

**Solutions**:
- ✅ Check `DATABASE_URL` is correct
- ✅ Verify database is running in IONOS
- ✅ Check firewall rules allow connections
- ✅ Ensure database user has correct permissions

### CORS Errors

**Error**: `Access to fetch blocked by CORS policy`

**Solutions**:
- ✅ Set `CORS_ORIGIN` in backend to your frontend URL
- ✅ Include protocol: `https://your-frontend.ionos.com`
- ✅ No trailing slash in URL

### Build Failures

**Error**: `Build failed`

**Solutions**:
- ✅ Check Node version (should be 20+)
- ✅ Verify `package.json` exists
- ✅ Check build logs in IONOS dashboard
- ✅ Ensure all dependencies are in `package.json`

### Environment Variables Not Working

**Error**: `Variable is undefined`

**Solutions**:
- ✅ Restart application after adding variables
- ✅ Check variable names (case-sensitive)
- ✅ Verify no typos
- ✅ Frontend variables must start with `NEXT_PUBLIC_`

---

## 🔐 SECURITY CHECKLIST

Before going live:

- [ ] Change all default passwords
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Enable HTTPS (IONOS should do this automatically)
- [ ] Set `NODE_ENV=production`
- [ ] Remove debug logging
- [ ] Review CORS settings
- [ ] Set up rate limiting
- [ ] Enable database backups
- [ ] Set up monitoring/alerts

---

## 📊 POST-DEPLOYMENT

### 1. Set Up Monitoring

- IONOS Dashboard → Monitoring
- Set up uptime checks
- Configure alerts

### 2. Set Up Backups

- Database backups: Daily
- Code backups: Automatic (GitHub)
- Environment variables: Document securely

### 3. Performance Optimization

- Enable CDN (if available)
- Set up caching
- Optimize images
- Enable compression

### 4. Domain Configuration

1. **Point Domain to IONOS**
   - Go to domain settings
   - Update DNS records:
     - A record: Point to IONOS IP
     - CNAME: Point to IONOS hostname

2. **SSL Certificate**
   - IONOS should provide free SSL
   - Enable in dashboard
   - Force HTTPS redirect

---

## 🎯 QUICK REFERENCE

### Backend URL
```
https://your-backend.ionos.com
```

### Frontend URL
```
https://your-frontend.ionos.com
```

### Database Connection
```
postgresql://user:pass@host:5432/dbname
```

### Critical Environment Variables

**Backend:**
- `DATABASE_URL` ⚠️ REQUIRED
- `JWT_SECRET` ⚠️ REQUIRED
- `CORS_ORIGIN` ⚠️ REQUIRED

**Frontend:**
- `NEXT_PUBLIC_API_URL` ⚠️ REQUIRED

---

## 📞 SUPPORT

### IONOS Support
- Help Center: https://www.ionos.co.uk/help/
- Support Email: support@ionos.co.uk
- Phone: Check IONOS website for current number

### Project Support
- GitHub Issues: https://github.com/richhabits/CARMACONCIERGE/issues
- Documentation: See `README.md` in repository

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Database created and connection string copied
- [ ] Backend environment variables configured
- [ ] Frontend environment variables configured
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database migrations run
- [ ] API connection tested
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] Domain configured (if applicable)
- [ ] Monitoring set up
- [ ] Backups configured

---

**🚀 YOU'RE READY TO DEPLOY!**

Follow these steps in order, and your CARMACONCIERGE platform will be live on IONOS!

**Last Updated:** $(date)
**Repository:** https://github.com/richhabits/CARMACONCIERGE
