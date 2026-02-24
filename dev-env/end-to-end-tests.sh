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
specs_options=""
while [ $# -gt 0 ]
do
  case "$1" in
    --console)
      console_options="--env ELECTRON_ENABLE_LOGGING=1"
      shift
      ;;
    --visual)
      specs_options="--spec e2e-tests/demo-a.cy.ts,e2e-tests/demo-b.cy.ts,e2e-tests/visual-appearance.cy.ts,e2e-tests/user-doc.cy.ts,e2e-tests/adaptation.cy.ts"
      shift
      ;;
    *)
      break
      ;;
  esac
done

test_dir=frontend/e2e-tests

if (cd ..; git grep -n '\.only' -- $test_dir)
then
  false
fi

./docker-compose.sh exec \
  $console_options \
  frontend-shell \
    npx cypress run \
      --e2e $specs_options "$@"

if [ -d ../$test_dir/screenshots/user-doc.cy.ts ]
then
  find ../doc/user -name '*.png' -delete
  find ../$test_dir/screenshots/user-doc.cy.ts -name '*.png' | while read line; do
    cp $line ../doc/user/${line#../$test_dir/screenshots/user-doc.cy.ts/}
  done
fi
