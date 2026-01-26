# Building and Testing

## **Building and Running the Docs**

The docs project consists of two main components:

  - the primary documentation project hosted at the root and content in the 
    `docs` directory, and   
  - the supporting React applications hosted in the `packages` directory

### **Requirements**

  - MkDocs Project development  
    - Python 3.12+
    - Pip, package manager for Python
  - React application development. 
    - Node.js LTS version 24
    - Yarn 4.12 - [Installation info](https://yarnpkg.com/getting-started/install)
  - Docker

### **MkDocs**

!!! note 
    It is highly recommended to utilize a virtual environment.

To initialize a fresh install of required packages / upgrade packages:
``` bash
pip install mkdocs-material mkdocs-exclude mkdocs-minify-plugin mkdocs-redirects
```

To build the MkDocs project, first install the python dependencies using pip:
``` bash
pip install -r requirements.txt
```
To run a local instance, using the `mkdocs` CLI tool:
``` bash
mkdocs serve --config-file scripts/mkdocs.local.yml
```
You should now have an instance running at: `localhost:8000`

### **React Applications**

The application are hosted in the `/packages` directory, utilizing a monorepo 
approach for managing application dependencies with Yarn workspaces. Yarn will 
handle aggregating and linking dependencies and versions to the
appropriate project inside the `/packages` directory.  

Apps:  

  - docs-app-graphiql  
    - Standalone React application for hosting 
      [GraphiQL](https://github.com/graphql/graphiql)  
  - docs-app-swagger  
    - Standalone React application for hosting 
      [Swagger UI](https://github.com/swagger-api/swagger-ui)

To build the React applications, first install packages from the `yarn.lock` file:
``` bash
# From the project root directory
yarn run ci
```
To install or synchronize new or updated packages ascross all projects, utilize 
the install command:
``` bash
# From the project root directory
yarn install
```

Each application can be developed independently. Check out each app's README.md -
located at `packages/app-name/README.md` - for more information on building and 
running the application.  

Once application development is complete, to integrate into the existing MkDocs 
project, utilize the scripts in the `package.json` file:
``` bash
npm run build:docker
```

!!! note 
    Note that this will build each React application, and replace the current app's 
    build directory in the `docs` project with the updated build.

### **Building and Packaging with Docker**

To build the project, utilize the convenience scripts for building a Docker container:
``` bash
./scripts/docker.build.sh
```
To verify the container is functioning property, test it out using the convenience 
script for running the container:
``` bash
./scripts/docker.run.sh
```
You should now have an instance running at: `localhost:3020/data-api/`

<br/>
