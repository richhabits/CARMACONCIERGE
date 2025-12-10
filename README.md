# CARMACONCIERGE

KARMA — National vehicle management platform: MOT, servicing, repairs, marketplace, payments and fleet oversight.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (Install with `npm install -g pnpm`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/richhabits/CARMACONCIERGE.git
cd CARMACONCIERGE
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Copy example env files for each app
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

4. Build all packages:

```bash
pnpm build
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Or run individual apps:

```bash
# API only
pnpm --filter @carmaconcierge/api dev

# Web only
pnpm --filter @carmaconcierge/web dev
```

## 📁 Project Structure

```
CARMACONCIERGE/
├── apps/
│   ├── api/              # Express.js API server
│   │   ├── src/
│   │   ├── .env.example
│   │   └── package.json
│   └── web/              # Next.js web application
│       ├── src/
│       ├── .env.example
│       └── package.json
├── packages/
│   └── shared/           # Shared types and utilities
│       ├── src/
│       └── package.json
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── tsconfig.json         # Shared TypeScript configuration
└── package.json          # Root package.json
```

## 🛠️ Available Commands

### Root Level Commands

- `pnpm install` - Install all dependencies
- `pnpm build` - Build all apps and packages
- `pnpm dev` - Run all apps in development mode
- `pnpm lint` - Lint all code
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format all code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Type-check all TypeScript code

### App-Specific Commands

```bash
# Build specific app
pnpm --filter @carmaconcierge/api build
pnpm --filter @carmaconcierge/web build

# Run specific app
pnpm --filter @carmaconcierge/api dev
pnpm --filter @carmaconcierge/web dev
```

## 🧪 Tech Stack

- **Monorepo**: pnpm workspaces
- **Language**: TypeScript
- **API**: Express.js, Node.js
- **Web**: Next.js 14, React 18
- **Code Quality**: ESLint, Prettier
- **Package Manager**: pnpm

## 📝 Development Guidelines

### Code Style

This project uses ESLint and Prettier for code quality and formatting:

- Run `pnpm lint` before committing
- Run `pnpm format` to auto-format code
- All imports are automatically organized

### TypeScript

- Strict mode is enabled
- Shared types live in `packages/shared`
- All functions should have proper type annotations

### Adding a New Package

1. Create a new directory under `apps/` or `packages/`
2. Add a `package.json` with the naming convention `@carmaconcierge/<name>`
3. Add a `tsconfig.json` extending the root config
4. Add package to `pnpm-workspace.yaml` if needed (already covered by wildcards)

## 🔧 Configuration Files

- **`.eslintrc.json`** - ESLint rules and plugins
- **`.prettierrc.json`** - Prettier formatting rules
- **`tsconfig.json`** - Base TypeScript configuration
- **`pnpm-workspace.yaml`** - Workspace package locations

## 🌍 Environment Variables

Each app has an `.env.example` file showing required environment variables:

- **API** (`apps/api/.env.example`): Database, authentication, external API keys
- **Web** (`apps/web/.env.example`): Public URLs, feature flags, API keys

## 🚦 Troubleshooting

### Port Already in Use

If you get a port conflict:

```bash
# Change PORT in apps/api/.env
PORT=3002

# Change port in apps/web (Next.js auto-increments)
pnpm --filter @carmaconcierge/web dev -- -p 3001
```

### Build Errors

```bash
# Clean all build artifacts
pnpm --filter @carmaconcierge/api clean
pnpm --filter @carmaconcierge/web clean
pnpm --filter @carmaconcierge/shared clean

# Rebuild
pnpm install
pnpm build
```

### Import Resolution Issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

## 📄 License

Private - All rights reserved

## 👥 Contributing

This is a private repository. Please follow the internal development guidelines.
