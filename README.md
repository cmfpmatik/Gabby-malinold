<!-- Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -->

*Gabby* is a tool to generate digital versions of grammar exercices found in school books.
It's part of the MALIN project.

Development on *Gabby* is currently paused while the MALIN team evaluates the use of LLMs.

# Licensing

No license has been chosen yet, so all author's rights are reserved for now.
**TODO: We must choose a license to allow anyone else than the original authors to use or contribute to this project. We must not let people think they can do so freely, because we would mislead them into doing something illegal.**

# Hosted demo

The development version of *Gabby* is running at https://gabby.vincent-jacques.net/.

# Run locally: the development environment

You only need a recent version of [Docker](https://www.docker.com/) and a not ancient version of Bash to run:

    dev-env/run.sh

And then open your browser at http://localhost:8080/.
Hit Ctrl+C to stop the development environment.

## Shells

With the development environment running:

    dev-env/frontend/shell.sh
    dev-env/backend/shell.sh
    dev-env/db/shell.sh

## JSON:API documentation

The [JSON:API](https://jsonapi.org/) is available at http://localhost:8080/api/, with a [Swagger](https://swagger.io/) UI at http://localhost:8080/api/docs/ (and its [OpenAPI](https://www.openapis.org/) schema at http://localhost:8080/api/openapi.json).

## Adminer

[Adminer](https://www.adminer.org/) is a DB management tool similar to phpMyAdmin.

In the development environment, it is available at http://localhost:8080/api/adminer/ with the following credentials:

- System: `PostgreSQL`
- Server: `db`
- Username: `admin`
- Password: `password`
- Database: `db`

# Tests

With the development environment running:

    dev-env/all-tests.sh

Or:

    dev-env/backend/unit-tests.sh
    dev-env/frontend/type-check.sh
    dev-env/frontend/unit-tests.sh
    dev-env/end-to-end-tests.sh

On Linux only, the Cypress GUI can be launched to run tests interactively with:

    dev-env/cypress-gui.sh

# Docker images for production

Preview with:

    prod/preview.sh

And then open your browser at http://localhost:8090/.
Hit Ctrl+C to stop the production preview environment.

Publish Docker images with:

    prod/publish.sh

(That command will push to hub.docker.com as @jacquev6, so it will fail if ran by anyone else than Vincent Jacques)
