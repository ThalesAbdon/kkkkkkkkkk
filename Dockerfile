FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# ⬇️ Certifique-se de copiar a pasta do schema e migrations
COPY . .

# Gera Prisma Client
RUN npx prisma generate --schema=src/infra/database/postgres/prisma/schema.prisma

# Compila o app NestJS
RUN npm run build
