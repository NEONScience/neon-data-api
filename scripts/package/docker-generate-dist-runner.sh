#!/bin/bash

set -e;

echo 'Work dir: ' $CONTEXT_WORK_DIR;
cd $CONTEXT_WORK_DIR;

docker run --platform=$(docker system info --format '{{.OSType}}/{{.Architecture}}') \
  --rm \
  --tty \
  --interactive \
  --volume=/$(pwd)/dist:/app/dist \
  --workdir=/app \
  neon-data-api:latest-builder npm run build:docker-copy-dist
