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


./docker-compose.sh exec \
  backend-shell \
    python -m gabby \
      restore-database \
        s3://jacquev6/gabby/prod/backups/gabby-backup-20250303-084206.tar.gz \
        --patch-according-to-settings \
        --yes

if [ "x${1-}" == "x--upgrade" ]
then
  ./docker-compose.sh exec \
    --workdir /app/backend/gabby \
    backend-shell \
      alembic upgrade head

  rm -rf ../backend/gabby/prod_data_as_unit_tests
  mkdir -p ../backend/gabby/prod_data_as_unit_tests
  ./docker-compose.sh exec \
    backend-shell \
    python -m gabby dump-database-as-unit-tests \
      --tests-per-file 50 \
      prod_data_as_unit_tests
fi

./docker-compose.sh exec \
  backend-shell \
    python -m gabby \
      sudo import create-user \
        jacquev6+gabby-dev-admin@gmail.com \
        --username admin \
        --password password
