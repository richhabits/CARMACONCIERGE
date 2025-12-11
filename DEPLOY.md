# Deployment Guide

## Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 15+
- Redis 7+ (optional, for caching)
- Domain with SSL certificate
- Cloud storage (AWS S3, GCS, etc.) for uploads

## Environment Setup

### 1. Backend Environment

Create `apps/backend/.env`:

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/carmaconcierge?schema=public"

# Redis
REDIS_URL="redis://host:6379"

# JWT
JWT_SECRET="your-production-secret-minimum-32-characters"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=production
BASE_URL="https://api.carmaconcierge.com"
FRONTEND_URL="https://admin.carmaconcierge.com,https://carmaconcierge.com"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="https://api.carmaconcierge.com/api/v1/auth/google/callback"

MICROSOFT_CLIENT_ID="your-microsoft-client-id"
MICROSOFT_CLIENT_SECRET="your-microsoft-client-secret"

# AI (Free Models)
OLLAMA_URL="http://localhost:11434"
HUGGINGFACE_TOKEN="optional-for-higher-limits"

# UK Vehicle APIs
DVSA_API_KEY="your-dvsa-api-key"

# Video Calling (choose one)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_API_KEY="your-twilio-key"
TWILIO_API_SECRET="your-twilio-secret"

# Payment (Stripe)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### 2. Build & Deploy Backend

```bash
# Build
cd apps/backend
pnpm build

# Run migrations
pnpm prisma:deploy

# Start production server
pnpm start:prod
```

### 3. Deploy with Docker

```bash
# Build images
docker build -f apps/backend/Dockerfile -t carmaconcierge-backend:latest .
docker build -f apps/admin/Dockerfile -t carmaconcierge-admin:latest .

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Mobile App Deployment

**iOS:**
```bash
cd apps/mobile

# Configure EAS
eas build:configure

# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

**Android:**
```bash
# Build for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

### 5. Admin Dashboard

```bash
cd apps/admin

# Build
pnpm build

# Start (or deploy to Vercel)
pnpm start

# Or deploy to Vercel
vercel --prod
```

## Cloud Deployment Options

### AWS
- **Backend**: ECS/Fargate or EC2
- **Database**: RDS PostgreSQL
- **Cache**: ElastiCache Redis
- **Storage**: S3
- **CDN**: CloudFront

### Google Cloud
- **Backend**: Cloud Run or GKE
- **Database**: Cloud SQL PostgreSQL
- **Cache**: Memorystore Redis
- **Storage**: Cloud Storage
- **CDN**: Cloud CDN

### Azure
- **Backend**: App Service or AKS
- **Database**: Azure Database for PostgreSQL
- **Cache**: Azure Cache for Redis
- **Storage**: Blob Storage
- **CDN**: Azure CDN

## Monitoring & Logging

### Recommended Tools
- **Logging**: Winston → CloudWatch/Stackdriver
- **Error Tracking**: Sentry
- **Performance**: New Relic or Datadog
- **Uptime**: UptimeRobot
- **Analytics**: Google Analytics

## Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] SSL/TLS certificates configured
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] File upload limits set
- [ ] OAuth secrets secured
- [ ] API keys in secrets manager
- [ ] Database backups automated
- [ ] Monitoring alerts configured

## Cost Estimates (Monthly)

### Low Traffic (< 1K users)
- Database (RDS): £30
- Server (EC2 t3.medium): £50
- Redis (ElastiCache): £20
- Storage (S3): £5
- Bandwidth: £10
- **Total**: ~£115/month

### Medium Traffic (10K users)
- Database (RDS): £80
- Server (ECS): £150
- Redis: £40
- Storage: £20
- Bandwidth: £40
- **Total**: ~£330/month

### High Traffic (100K users)
- Database: £300
- Server: £500
- Redis: £100
- Storage: £80
- Bandwidth: £150
- CDN: £50
- **Total**: ~£1,180/month

## Performance Targets

- API Response Time: < 200ms
- Database Queries: < 50ms
- WebSocket Latency: < 100ms
- Mobile App Launch: < 2s
- Admin Dashboard Load: < 1s

## Support

For deployment support, contact the development team.
