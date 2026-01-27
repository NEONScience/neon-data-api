#!/bin/sh

set -e;

echo 'Work dir: ' $CONTEXT_WORK_DIR;
cd $CONTEXT_WORK_DIR;

mkdir -p /app/dist/docs-app-graphiql
mkdir -p /app/dist/docs-app-swagger
cp -R /app/packages/docs-app-graphiql/build /app/dist/docs-app-graphiql/build
cp -R /app/packages/docs-app-swagger/build /app/dist/docs-app-swagger/build
