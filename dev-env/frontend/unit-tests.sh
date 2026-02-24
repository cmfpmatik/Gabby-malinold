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


console_options=""
while [ $# -gt 0 ]
do
  case "$1" in
    --console)
      console_options="--env ELECTRON_ENABLE_LOGGING=1"
      shift
      ;;
    *)
      break
      ;;
  esac
done

if (cd ../..; git grep -n '\.only' -- frontend)
then
  false
fi

../docker-compose.sh exec \
  $console_options \
  frontend-shell \
    npx cypress run \
      --component "$@"

# Cypress puts screenshots in a different place when invoked with --spec. Fix that.
for d in $(find ../../frontend/cypress/screenshots -maxdepth 1 -name 'TricolorSection*.cy.*')
do
  mkdir -p ../../frontend/cypress/screenshots/adapted/components
  mv $d ../../frontend/cypress/screenshots/adapted/components
done
