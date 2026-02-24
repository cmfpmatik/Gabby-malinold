<!--
MALIN Platform https://malin.cahiersfantastiques.fr/
Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

*Gabby* is a tool to generate digital versions of grammar exercices found in school books.
It's part of the MALIN project.

Development on *Gabby* is currently paused while the MALIN team evaluates the use of LLMs.

# Licensing

This software is licensed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).

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
