FROM node:18-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY turbo.json ./

COPY packages/shared ./packages/shared
COPY apps/admin ./apps/admin

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @carmaconcierge/shared build

WORKDIR /app/apps/admin
RUN pnpm build

FROM node:18-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --prod --frozen-lockfile

COPY --from=base /app/packages/shared/dist ./packages/shared/dist
COPY --from=base /app/apps/admin/.next ./apps/admin/.next
COPY --from=base /app/apps/admin/public ./apps/admin/public
COPY --from=base /app/apps/admin/package.json ./apps/admin/
COPY --from=base /app/apps/admin/next.config.js ./apps/admin/

WORKDIR /app/apps/admin

EXPOSE 3001

CMD ["pnpm", "start"]
