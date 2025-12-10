# CARMACONCIERGE

KARMA — National vehicle management platform: MOT, servicing, repairs, marketplace, payments and fleet oversight.

## Monorepo Structure

This is a pnpm monorepo with the following structure:

```
├── apps/
│   ├── backend/     # NestJS REST API with Prisma ORM
│   ├── mobile/      # Expo React Native mobile app
│   └── admin/       # Next.js admin dashboard
└── packages/
    └── shared/      # Shared TypeScript types and utilities
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL (for backend database)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup Backend

```bash
# Copy environment variables
cp apps/backend/.env.example apps/backend/.env

# Edit apps/backend/.env with your PostgreSQL connection string
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/carmaconcierge?schema=public"

# Generate Prisma client
cd apps/backend
pnpm prisma:generate

# Run migrations (when database is available)
pnpm prisma:migrate
```

### 3. Build all packages

```bash
pnpm build
```

## Development

### Run all apps in development mode

```bash
pnpm dev
```

### Run individual apps

```bash
# Backend API
pnpm backend:dev

# Admin dashboard
pnpm admin:dev

# Mobile app
pnpm mobile:dev
```

## Project Structure

### Backend (`apps/backend`)
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Features**:
  - REST API endpoints
  - Vehicle management
  - MOT records
  - Service records
  - User management

### Mobile App (`apps/mobile`)
- **Framework**: Expo React Native
- **Features**:
  - Home screen
  - Vehicle list
  - Cross-platform (iOS, Android, Web)

### Admin Dashboard (`apps/admin`)
- **Framework**: Next.js 14 (App Router)
- **Features**:
  - Vehicle management
  - User management
  - MOT records view
  - Service records view

### Shared Package (`packages/shared`)
- TypeScript types and interfaces
- Shared utilities
- Used by all apps for type safety

## Available Scripts

### Root level
- `pnpm dev` - Run all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm clean` - Remove all build outputs and dependencies

### Backend
- `pnpm backend:dev` - Run backend in watch mode
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations

### Admin
- `pnpm admin:dev` - Run admin dashboard in development mode

### Mobile
- `pnpm mobile:dev` - Start Expo development server

## Technologies

- **Monorepo**: pnpm workspaces
- **Backend**: NestJS, Prisma, PostgreSQL
- **Mobile**: Expo, React Native, React Navigation
- **Admin**: Next.js 14, React
- **Language**: TypeScript
- **Package Manager**: pnpm
