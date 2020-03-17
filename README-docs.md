# Portal Documentation

## Requirements
- Python

## Build 
- Local
  - `pip install -r requirements.txt`
- Docker
  - `docker.build.sh`

## Run
- Local
  - `mkdocs serve --config-file mkdocs.local.yml`
- Docker
  - `docker.run.sh`

## Packages
- Hosted in the `/packages` directory
  - docs-app-graphiql
    - Standalone React application for hosting [GraphiQL](https://github.com/graphql/graphiql)
  - docs-app-swagger
    - Standalone React application for hosting [Swagger UI](https://github.com/swagger-api/swagger-ui)

## Package management
[Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are utilized
to handle package management across React apps.
Yarn will handle aggregating and linking dependencies and versions to the
appropriate project inside the `/packages` directory.

## Build local
- Install yarn with npm (or other: [Yarn Installation](https://yarnpkg.com/en/docs/install))
  - `npm install -g yarn`
- Build from lock file, from root directory
  - `yarn ci`
- Install / sync new or updated packages across all projects
  - `yarn install`
