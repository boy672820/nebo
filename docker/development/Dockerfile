FROM node:latest

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
COPY .env.development .env

RUN yarn build

EXPOSE 8112

RUN chmod +x ./docker/development/entrypoint.sh
ENTRYPOINT ./docker/development/entrypoint.sh