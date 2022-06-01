FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#   && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#   && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh