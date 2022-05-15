#!/bin/bash

docker run -p 5432:5432 \
  --name postgres \
  -e POSTGRES_USER=nebo \
  -e POSTGRES_PASSWORD=123 \
  -d -v pgdata:/var/lib/postgresql/data \
  postgres
