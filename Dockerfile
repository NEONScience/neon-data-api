#-------------------------------------------------------------------------------
# Build production container with only necessary artifacts

FROM alpine:3.24

ARG TARGETARCH

EXPOSE 3020

# Copy build artifacts from builder container
WORKDIR /go/src/app
COPY dist/server-${TARGETARCH} .
COPY dist/neon-data-api-docs-site .

# Set app wide env variables
ENV PORTAL_CLIENT_ROUTE="/"
ENV PORTAL_PORT=3020

RUN addgroup --gid 1301 docs \
  && adduser -u 444 -D -G docs docs \
  && chown -R docs:docs /go/src/app

USER docs

CMD ["./server"]
