# CARMACONCIERGE (KARMA)

National vehicle management platform: MOT, servicing, repairs, marketplace, payments and fleet oversight.

## 🚀 Monorepo Structure

This is a full-stack monorepo containing:
- **Mobile App** (React Native/Expo) - Customer-facing mobile application
- **Backend API** (NestJS + Prisma + PostgreSQL) - RESTful API service
- **Admin Dashboard** (Next.js 14) - Admin management interface
- **Shared Package** - Common types, schemas, and utilities

## 📁 Folder Structure

```
CARMACONCIERGE/
├── apps/
│   ├── mobile/                 # React Native/Expo mobile app
│   │   ├── src/
│   │   │   ├── screens/        # Screen components
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   ├── HomeScreen.tsx
│   │   │   │   ├── VehiclesScreen.tsx
│   │   │   │   ├── JobsScreen.tsx
│   │   │   │   ├── MessagesScreen.tsx
│   │   │   │   └── ProfileScreen.tsx
│   │   │   ├── navigation/     # Navigation configuration
│   │   │   │   ├── RootNavigator.tsx
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   └── MainNavigator.tsx
│   │   │   ├── services/       # API client services
│   │   │   │   └── api.ts
│   │   │   ├── context/        # React Context providers
│   │   │   │   └── AuthContext.tsx
│   │   │   ├── components/     # Reusable components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   └── utils/          # Utility functions
│   │   ├── App.tsx
│   │   ├── package.json
│   │   ├── app.json
│   │   ├── .env.example
│   │   └── README.md
│   │
│   ├── backend/                # NestJS backend API
│   │   ├── src/
│   │   │   ├── auth/           # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── users/          # Users module
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── users.module.ts
│   │   │   ├── vehicles/       # Vehicles module
│   │   │   │   ├── vehicles.controller.ts
│   │   │   │   ├── vehicles.service.ts
│   │   │   │   └── vehicles.module.ts
│   │   │   ├── jobs/           # Jobs module
│   │   │   │   ├── jobs.controller.ts
│   │   │   │   ├── jobs.service.ts
│   │   │   │   └── jobs.module.ts
│   │   │   ├── quotes/         # Quotes module
│   │   │   │   ├── quotes.controller.ts
│   │   │   │   ├── quotes.service.ts
│   │   │   │   └── quotes.module.ts
│   │   │   ├── suppliers/      # Suppliers module
│   │   │   │   ├── suppliers.controller.ts
│   │   │   │   ├── suppliers.service.ts
│   │   │   │   └── suppliers.module.ts
│   │   │   ├── messaging/      # Messaging module
│   │   │   │   ├── messaging.controller.ts
│   │   │   │   ├── messaging.service.ts
│   │   │   │   └── messaging.module.ts
│   │   │   ├── payments/       # Payments module
│   │   │   │   ├── payments.controller.ts
│   │   │   │   ├── payments.service.ts
│   │   │   │   └── payments.module.ts
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   ├── .env.example
│   │   └── README.md
│   │
│   └── admin/                  # Next.js 14 admin dashboard
│       ├── src/
│       │   ├── app/
│       │   │   ├── dashboard/  # Dashboard pages
│       │   │   │   ├── users/
│       │   │   │   ├── page.tsx
│       │   │   │   └── dashboard.module.css
│       │   │   ├── login/
│       │   │   │   ├── page.tsx
│       │   │   │   └── login.module.css
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   ├── lib/
│       │   │   └── api.ts      # API client
│       │   ├── components/
│       │   └── types/
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── .env.example
│       └── README.md
│
├── packages/
│   └── shared/                 # Shared code
│       ├── src/
│       │   ├── types/          # TypeScript types
│       │   │   └── index.ts
│       │   ├── schemas/        # Zod validation schemas
│       │   │   └── index.ts
│       │   ├── utils/          # Utility functions
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── package.json                # Root package.json with workspaces
├── turbo.json                  # Turbo build configuration
├── .gitignore
├── .env.example
└── README.md
```

## 🛠️ Tech Stack

### Mobile App
- React Native
- Expo 50
- React Navigation
- TypeScript
- Axios

### Backend API
- NestJS 10
- Prisma ORM
- PostgreSQL
- JWT Authentication
- TypeScript

### Admin Dashboard
- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Modules

### Shared
- TypeScript
- Zod (validation)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies for all workspaces
npm install

# Copy environment variables
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/mobile/.env.example apps/mobile/.env
cp apps/admin/.env.example apps/admin/.env

# Update .env files with your configuration
```

### Database Setup

```bash
# Generate Prisma client
cd apps/backend
npm run generate

# Run database migrations
npm run migrate

# (Optional) Seed the database
npm run seed
```

### Development

```bash
# Run all apps in development mode (from root)
npm run dev

# Or run individual apps:
npm run backend:dev   # Backend API on http://localhost:3001
npm run mobile:dev    # Mobile app (Expo)
npm run admin:dev     # Admin dashboard on http://localhost:3000
```

## 📱 Features

### Mobile App
- ✅ User registration and authentication
- ✅ Vehicle management
- ✅ Job booking (MOT, Service, Repair, Inspection)
- ✅ Supplier quotes
- ✅ Messaging system
- ✅ Payment tracking
- ✅ Profile management

### Backend API
- ✅ JWT authentication
- ✅ RESTful API endpoints
- ✅ Prisma ORM with PostgreSQL
- ✅ User management
- ✅ Vehicle CRUD operations
- ✅ Job management
- ✅ Quote system
- ✅ Supplier directory
- ✅ Messaging
- ✅ Payment processing

### Admin Dashboard
- ✅ Admin authentication
- ✅ User management
- ✅ Vehicle monitoring
- ✅ Job tracking
- ✅ Quote approval
- ✅ Supplier management
- ✅ Message monitoring
- ✅ Payment oversight

## 📊 Database Schema

The Prisma schema includes the following models:
- **User** - Customer, Admin, and Supplier accounts
- **Vehicle** - Registered vehicles
- **Job** - MOT, Service, Repair, and Inspection jobs
- **Quote** - Supplier quotes for jobs
- **Supplier** - Service providers
- **Message** - User-to-user messaging
- **Payment** - Payment transactions

## 🔐 Authentication

JWT-based authentication with:
- User registration
- Login with email/password
- Token-based authorization
- Password hashing with bcrypt
- Role-based access control (Customer, Admin, Supplier)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user

### Vehicles
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/:id` - Get vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Jobs
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs/:id` - Get job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Quotes
- `GET /api/quotes/job/:jobId` - Get quotes for job
- `POST /api/quotes` - Create quote
- `GET /api/quotes/:id` - Get quote
- `PUT /api/quotes/:id` - Update quote

### Suppliers
- `GET /api/suppliers` - List suppliers
- `POST /api/suppliers` - Create supplier
- `GET /api/suppliers/:id` - Get supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Messages
- `GET /api/messages` - List messages
- `POST /api/messages` - Send message
- `GET /api/messages/:id` - Get message
- `PUT /api/messages/:id/read` - Mark as read

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment
- `PUT /api/payments/:id` - Update payment

## 🧪 Testing

```bash
# Run tests for all apps
npm run test

# Run tests for specific app
npm run test --workspace=@carmaconcierge/backend
```

## 🏗️ Building

```bash
# Build all apps
npm run build

# Build specific app
npm run build --workspace=@carmaconcierge/backend
npm run build --workspace=@carmaconcierge/admin
```

## 📦 Available Scripts

### Root Level
- `npm run dev` - Run all apps in development mode
- `npm run build` - Build all apps
- `npm run lint` - Lint all apps
- `npm run clean` - Clean all build artifacts
- `npm run backend:dev` - Run backend only
- `npm run mobile:dev` - Run mobile app only
- `npm run admin:dev` - Run admin dashboard only
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/carmaconcierge"
PORT=3001
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000,http://localhost:8081"
```

### Mobile (.env)
```
EXPO_PUBLIC_API_URL="http://localhost:3001/api"
```

### Admin (.env)
```
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

## 📝 License

Proprietary - All rights reserved

## 👥 Team

CARMACONCIERGE Development Team
