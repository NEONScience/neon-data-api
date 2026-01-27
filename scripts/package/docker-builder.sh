#!/bin/bash

set -e;

echo 'Work dir: ' $CONTEXT_WORK_DIR;
cd $CONTEXT_WORK_DIR;

docker buildx build \
  --platform=$(docker system info --format '{{.OSType}}/{{.Architecture}}') \
  --no-cache \
  --build-arg YARN_VERSION=$npm_package_config_yarnVersion \
  --tag neon-data-api:latest-builder \
  --file build.Dockerfile .
