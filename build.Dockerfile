FROM node:24.13-alpine AS builder

ARG YARN_VERSION

RUN apk add --no-cache git python3 py3-setuptools make g++ \
  build-base cairo-dev pango-dev giflib-dev
RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate

WORKDIR /app
COPY packages ./packages
COPY .yarnrc.yml ./.yarnrc.yml
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn run ci
RUN cd packages/docs-app-graphiql && yarn run build
RUN cd packages/docs-app-swagger && yarn run build
