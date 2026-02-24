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


secrets_ok=true
echo "# Secrets" > .gitignore
while read template; do
  secret="${template%.secret_template}"
  secret="${secret#./}"
  echo "$secret" >> .gitignore
  if [[ ! -f "$secret" ]]; then
    echo "Please create $secret according to $template"
    secrets_ok=false
  fi
done < <(find . -name '*.secret_template')
$secrets_ok

./build.sh preview load

echo "Gabby prod-preview: build"
docker compose build
echo "Gabby prod-preview: pull"
docker compose pull --ignore-buildable

echo "Gabby prod-preview: start"
docker compose up --no-build --pull never --remove-orphans --detach
docker compose logs --follow || true

echo "Gabby prod-preview: clean-up"
docker compose down --remove-orphans
docker compose rm --stop --volumes --force
