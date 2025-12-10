# CARMACONCIERGE Admin Dashboard

Next.js 14 admin dashboard for managing the CARMACONCIERGE platform.

## Features

- **Dashboard**: Overview of platform statistics
- **Users Management**: View and manage users
- **Vehicles Management**: Monitor registered vehicles
- **Jobs Management**: Track and manage jobs
- **Quotes Management**: Review supplier quotes
- **Suppliers Management**: Manage service providers
- **Messages**: View platform communications
- **Payments**: Monitor payment transactions

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update NEXT_PUBLIC_API_URL in .env with your backend API URL
```

### Development

```bash
# Start development server
npm run dev

# The admin dashboard will be available at http://localhost:3000
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                # Next.js 14 App Router pages
│   ├── dashboard/      # Admin dashboard pages
│   ├── login/          # Login page
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/                # Utility libraries (API client)
└── types/              # TypeScript type definitions
```

## Features by Page

### Login
- Admin authentication
- JWT token management

### Dashboard
- Platform statistics overview
- Quick links to all management sections

### Users
- List all users
- View user details
- Edit user information

### Vehicles
- List all registered vehicles
- View vehicle details
- Manage vehicle records

### Jobs
- List all jobs (MOT, Service, Repair, Inspection)
- View job details
- Update job status
- Assign suppliers

### Quotes
- View all supplier quotes
- Approve/reject quotes
- Track quote history

### Suppliers
- List all suppliers
- Add new suppliers
- Edit supplier information
- Verify suppliers

### Messages
- View platform messages
- Monitor user-supplier communications

### Payments
- List all payments
- View payment details
- Update payment status

## Environment Variables

See `.env.example` for required environment variables.

## Authentication

The admin panel uses JWT authentication. Admin users must have the `ADMIN` role in the database to access the dashboard.
