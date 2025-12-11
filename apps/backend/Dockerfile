FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY turbo.json ./

# Copy packages
COPY packages/shared ./packages/shared

# Copy app
COPY apps/backend ./apps/backend

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build shared package
RUN pnpm --filter @carmaconcierge/shared build

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN pnpm prisma:generate

# Build backend
RUN pnpm build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=base /app/packages/shared/dist ./packages/shared/dist
COPY --from=base /app/apps/backend/dist ./apps/backend/dist
COPY --from=base /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=base /app/apps/backend/node_modules/.prisma ./apps/backend/node_modules/.prisma

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main.js"]
