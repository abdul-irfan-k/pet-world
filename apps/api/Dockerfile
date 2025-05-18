FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile

RUN pnpm --filter api build
RUN pnpm --filter api prisma:generate

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["pnpm", "start"]
