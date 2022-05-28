FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY . .

# RUN npm i -g dotenv

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh