# 1. Install dependencies
FROM node:latest AS deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 100000

# 2. Rebuild the source code
FROM node:latest AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY . .
COPY .env.production .env

RUN npx prisma generate
RUN yarn build

# 3. Production image, copy all the files and run nest
FROM node:latest AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist

COPY .env.production .env

COPY ./docker/development/entrypoint.sh ./entrypoint.sh

EXPOSE 8112

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh