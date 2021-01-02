#!/bin/bash

REPO_NAME=quay.io/battelleecology/
IMAGE_NAME=portal-public-api-docs

if [ -n "$1" ]; then
    echo "Version: $1"
    BUILD_VERSION="$1"
else
    echo "No version set, tagging as latest"
    BUILD_VERSION=latest
fi

docker container stop portal-public-api-docs
docker container rm portal-public-api-docs
docker image rm $REPO_NAME$IMAGE_NAME:$BUILD_VERSION
docker build --no-cache -t $REPO_NAME$IMAGE_NAME:$BUILD_VERSION \
  --file ./Dockerfile .
