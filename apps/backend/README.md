# CARMACONCIERGE Backend API

NestJS backend API with Prisma ORM and PostgreSQL database.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Users**: User management and profiles
- **Vehicles**: Vehicle registration and management
- **Jobs**: MOT, service, repair, and inspection job management
- **Quotes**: Supplier quotes for jobs
- **Suppliers**: Service provider directory
- **Messaging**: User-to-user and job-related messaging
- **Payments**: Payment processing and tracking

## Tech Stack

- NestJS 10
- Prisma ORM
- PostgreSQL
- JWT Authentication
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string
```

### Database Setup

```bash
# Generate Prisma Client
npm run generate

# Run migrations
npm run migrate

# (Optional) Seed the database
npm run seed

# Open Prisma Studio to view/edit data
npm run studio
```

### Development

```bash
# Start development server with hot reload
npm run dev

# The API will be available at http://localhost:3001/api
```

### Production

```bash
# Build the application
npm run build

# Run migrations
npm run migrate:deploy

# Start the server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles` - Get user's vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs` - Get user's jobs
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Quotes
- `POST /api/quotes` - Create quote
- `GET /api/quotes/job/:jobId` - Get quotes for job
- `GET /api/quotes/:id` - Get quote by ID
- `PUT /api/quotes/:id` - Update quote

### Suppliers
- `POST /api/suppliers` - Create supplier
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get user's messages
- `GET /api/messages/:id` - Get message by ID
- `PUT /api/messages/:id/read` - Mark message as read

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments` - Get user's payments
- `GET /api/payments/:id` - Get payment by ID
- `PUT /api/payments/:id` - Update payment

## Environment Variables

See `.env.example` for required environment variables.
