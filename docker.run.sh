#!/bin/bash

docker container stop portal-public-api-docs
docker container rm portal-public-api-docs

docker run -d --init \
  -p 3020:3020 \
  --memory="64M" \
  --name portal-public-api-docs \
  quay.io/battelleecology/portal-public-api-docs
