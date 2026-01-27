#!/bin/bash

set -e;

echo 'Work dir: ' $CONTEXT_WORK_DIR;
cd $CONTEXT_WORK_DIR;

mv dist/docs-app-swagger/build docs/content/explorer/
mv dist/docs-app-graphiql/build docs/content/graphql/explorer/
