# Project Folder Structure

```
CARMACONCIERGE/
│
├── package.json                    # Root package.json with workspace config
├── pnpm-workspace.yaml            # pnpm workspace configuration
├── turbo.json                      # Turbo build configuration
├── .prettierrc                     # Prettier configuration
├── .gitignore                      # Git ignore rules
├── README.md                       # Main documentation
│
├── apps/
│   │
│   ├── backend/                    # NestJS API Server
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   ├── env.example            # Environment variables template
│   │   │
│   │   ├── prisma/
│   │   │   └── schema.prisma      # Database schema (all entities)
│   │   │
│   │   └── src/
│   │       ├── main.ts            # Application entry point
│   │       ├── app.module.ts      # Root module
│   │       │
│   │       ├── prisma/
│   │       │   ├── prisma.module.ts
│   │       │   └── prisma.service.ts
│   │       │
│   │       ├── auth/              # Authentication Module
│   │       │   ├── auth.module.ts
│   │       │   ├── auth.controller.ts
│   │       │   ├── auth.service.ts
│   │       │   ├── guards/
│   │       │   │   └── jwt-auth.guard.ts
│   │       │   └── strategies/
│   │       │       ├── jwt.strategy.ts
│   │       │       └── local.strategy.ts
│   │       │
│   │       ├── users/             # User Management Module
│   │       │   ├── users.module.ts
│   │       │   ├── users.controller.ts
│   │       │   ├── users.service.ts
│   │       │   └── dto/
│   │       │       └── user.dto.ts
│   │       │
│   │       ├── vehicles/          # Vehicle Management Module
│   │       │   ├── vehicles.module.ts
│   │       │   ├── vehicles.controller.ts
│   │       │   ├── vehicles.service.ts
│   │       │   └── dto/
│   │       │       └── vehicle.dto.ts
│   │       │
│   │       ├── jobs/              # Job Management Module
│   │       │   ├── jobs.module.ts
│   │       │   ├── jobs.controller.ts
│   │       │   ├── jobs.service.ts
│   │       │   └── dto/
│   │       │       └── job.dto.ts
│   │       │
│   │       ├── quotes/            # Quote Management Module
│   │       │   ├── quotes.module.ts
│   │       │   ├── quotes.controller.ts
│   │       │   ├── quotes.service.ts
│   │       │   └── dto/
│   │       │       └── quote.dto.ts
│   │       │
│   │       ├── suppliers/         # Supplier Management Module
│   │       │   ├── suppliers.module.ts
│   │       │   ├── suppliers.controller.ts
│   │       │   ├── suppliers.service.ts
│   │       │   └── dto/
│   │       │       └── supplier.dto.ts
│   │       │
│   │       ├── messaging/         # Messaging Module
│   │       │   ├── messaging.module.ts
│   │       │   ├── messaging.controller.ts
│   │       │   ├── messaging.service.ts
│   │       │   └── dto/
│   │       │       └── messaging.dto.ts
│   │       │
│   │       └── payments/          # Payment Module
│   │           ├── payments.module.ts
│   │           ├── payments.controller.ts
│   │           ├── payments.service.ts
│   │           └── dto/
│   │               └── payment.dto.ts
│   │
│   ├── mobile/                    # React Native/Expo Mobile App
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── app.json               # Expo configuration
│   │   ├── babel.config.js        # Babel configuration
│   │   ├── metro.config.js        # Metro bundler config
│   │   ├── env.example           # Environment variables template
│   │   │
│   │   ├── app/                   # Expo Router app directory
│   │   │   ├── _layout.tsx       # Root layout
│   │   │   ├── index.tsx         # Entry point / splash
│   │   │   │
│   │   │   ├── (auth)/           # Authentication group
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── login.tsx     # Login screen
│   │   │   │   └── register.tsx  # Registration screen
│   │   │   │
│   │   │   └── (tabs)/           # Main app tabs
│   │   │       ├── _layout.tsx   # Tab navigation layout
│   │   │       ├── home.tsx      # Home dashboard
│   │   │       ├── vehicles.tsx  # Vehicles list
│   │   │       ├── jobs.tsx      # Jobs list
│   │   │       └── profile.tsx   # User profile
│   │   │
│   │   └── services/
│   │       └── api.ts            # API client with interceptors
│   │
│   └── admin/                     # Next.js 14 Admin Dashboard
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js        # Next.js configuration
│       ├── tailwind.config.js    # Tailwind CSS config
│       ├── postcss.config.js     # PostCSS config
│       ├── .eslintrc.json        # ESLint config
│       ├── next-env.d.ts         # Next.js TypeScript definitions
│       ├── env.example           # Environment variables template
│       │
│       └── app/                   # Next.js App Router
│           ├── layout.tsx        # Root layout
│           ├── page.tsx          # Home page
│           ├── globals.css       # Global styles (Tailwind)
│           │
│           ├── dashboard/
│           │   └── page.tsx      # Dashboard page
│           │
│           ├── users/
│           │   └── page.tsx      # Users management page
│           │
│           ├── vehicles/
│           │   └── page.tsx      # Vehicles management page
│           │
│           ├── jobs/
│           │   └── page.tsx      # Jobs management page
│           │
│           └── suppliers/
│               └── page.tsx      # Suppliers management page
│
└── packages/
    │
    └── shared/                    # Shared TypeScript Package
        ├── package.json
        ├── tsconfig.json
        │
        └── src/
            ├── index.ts          # Main export
            ├── schemas/
            │   └── index.ts      # Validation schemas
            │
            └── types/            # TypeScript type definitions
                ├── index.ts      # Types barrel export
                ├── auth.ts       # Auth types (LoginDto, RegisterDto, etc.)
                ├── user.ts       # User types
                ├── vehicle.ts    # Vehicle types
                ├── job.ts        # Job types
                ├── quote.ts      # Quote types
                ├── supplier.ts   # Supplier types
                ├── messaging.ts  # Messaging types
                └── payment.ts    # Payment types
```

## Key Features by Module

### Backend (NestJS)
- **Auth**: JWT authentication, registration, login, profile
- **Users**: CRUD operations, role-based access
- **Vehicles**: Vehicle registration and management
- **Jobs**: Job creation, status tracking (MOT, servicing, repairs)
- **Quotes**: Quote generation with line items
- **Suppliers**: Supplier profiles, ratings, specialties
- **Messaging**: Conversations and real-time messaging
- **Payments**: Payment processing and history

### Mobile (Expo)
- **Auth Flow**: Login and registration screens
- **Home**: Dashboard with quick actions
- **Vehicles**: List and manage vehicles
- **Jobs**: View and track job status
- **Profile**: User profile and settings

### Admin (Next.js)
- **Dashboard**: Overview with statistics
- **Users**: User management table
- **Vehicles**: Vehicle management interface
- **Jobs**: Job management interface
- **Suppliers**: Supplier management interface

### Shared Package
- Type definitions for all entities
- Shared DTOs and enums
- Type-safe API contracts