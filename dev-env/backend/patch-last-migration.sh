#!/bin/bash
# MALIN Platform https://malin.cahiersfantastiques.fr/
# Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net>

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

set -o errexit
set -o nounset
set -o pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"


set -x

../load-prod-db-backup.sh

rev_id_arg=
if [ -e ../../backend/gabby/migrations/versions/*_dev.py ]
then
  rev_id_arg="--rev-id $(find ../../backend/gabby/migrations/versions/*_dev.py | sed -E 's#../../backend/gabby/migrations/versions/(.*)_dev\.py#\1#')"
  rm -f ../../backend/gabby/migrations/versions/*_dev.py
fi

../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic revision --autogenerate $rev_id_arg -m dev
echo "Check the new revision. Press enter to continue, Ctrl+C to abort."
read

../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic upgrade head
../docker-compose.sh exec backend-shell python -m gabby graph-models

# Check the new revision can be rollbacked
if [ "x${1-}" != "x--no-rollback" ]
then
../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic downgrade head-1
../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic downgrade head-1

  ../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic downgrade head-1

  ../docker-compose.sh exec --workdir /app/backend/gabby backend-shell alembic upgrade head
  echo "The revision can be rollbacked."
fi
