#!/bin/bash

cp ../packages/docs-app-swagger/src/swagger.json .

docker run --rm \
  --volume $(pwd):/opt \
    swagger2markup/swagger2markup \
      convert \
      --config /opt/swagger-config.properties \
      --swaggerInput /opt/swagger.json \
      --outputFile /opt/swagger

rm swagger.json
