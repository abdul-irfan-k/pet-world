FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./


COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/prisma ./apps/api/prisma

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api

RUN pnpm --filter api build
RUN pnpm --filter api prisma:generate

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["pnpm", "start"]