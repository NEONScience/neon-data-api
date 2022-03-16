#-------------------------------------------------------------------------------
# Builder container for reproducible build environment

FROM python:3.10-alpine as builder

WORKDIR /usr/src/app
COPY ./docs /usr/src/app/build-temp/api-docs/docs
COPY ./mkdocs.yml /usr/src/app/build-temp/api-docs
COPY ./requirements.txt /usr/src/app/build-temp/api-docs

RUN apk add --no-cache build-base
RUN cd /usr/src/app/build-temp/api-docs \
  && pip install --upgrade pip \
  && pip install -r requirements.txt
RUN cd /usr/src/app/build-temp/api-docs \
  && sed -i "s/{{TIMESTAMP}}/$(date +%s)/g" docs/content/explorer/index.md \
  && sed -i "s/{{TIMESTAMP}}/$(date +%s)/g" docs/content/graphql/explorer/index.md \
  && sed -i "s/{{COPYRIGHT_YEAR}}/$(date +%Y)/g" mkdocs.yml \
  && mkdocs build --config-file mkdocs.yml \
  && mv /usr/src/app/build-temp/api-docs/site /usr/src/app/ \
  && rm -rf /usr/src/app/build-temp

#-------------------------------------------------------------------------------
# Builder container for reproducible build environment

FROM golang:1.17-alpine as go-builder

WORKDIR /go/src/app

COPY ./server/server.go .
COPY ./server/go.mod .
COPY --from=builder /usr/src/app .

RUN go mod verify \
  && go build server.go \
  && rm server.go \
  && rm go.mod

#-------------------------------------------------------------------------------
# Build production container with only necessary artifacts

FROM alpine:3.15

# Traefik auto discover labels
LABEL \
  traefik.http.services.portal-public-api-docs.loadbalancer.server.port="3020" \
  traefik.http.services.portal-public-api-docs.loadbalancer.healthcheck.path="/health" \
  traefik.http.services.portal-public-api-docs.loadbalancer.healthcheck.interval="10s" \
  traefik.http.services.portal-public-api-docs.loadbalancer.healthcheck.timeout="5s"

EXPOSE 3020

# Copy build artifacts from builder container
WORKDIR /go/src/app
COPY --from=go-builder /go/src/app .

# Set app wide env variables
ENV PORTAL_CLIENT_ROUTE="/"
ENV PORTAL_PORT=3020

RUN addgroup -S go \
  && adduser -S -G go go \
  && chown -R go:go /go/src/app

# Run as the go user
USER go

CMD ["./server"]
