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


# Ugly workaround to re-type 'console.assert'
# Not doable in 'env.d.ts' because '@types/sha.js/index.d.ts' uses '<reference types="node" />'
# *after* 'env.d.ts' is loaded, overriding the override.
sed -i 's/assert(.*): void/assert(condition: any, message?: string, ...optionalParams: any[]): asserts condition/' ../../frontend/node_modules/@types/node/console.d.ts

# @todo Enable 'false' properties in 'tsconfig.app.json'

../docker-compose.sh exec \
  frontend-shell \
    npx vue-tsc --build --force

if git \
  --no-pager \
    grep \
      -n \
      -e '<script setup>' \
      -e 'defineProps(' \
      -e 'defineEmits(' \
      -e 'defineModel(' \
      -e ': any$' -e ': any[^/]' \
      -e 'as any$' -e 'as any[^/]' \
      -e '@ts-ignore$' -e '@ts-ignore[^/]' \
      -e '\<Number$' -e '\<Number[^).]' \
      -e '\<String$' -e '\<String[^.]' \
      -e '\<Boolean$' -e '\<Boolean[^.]' \
      -e '\<Symbol$' -e '\<Symbol[^.(]' \
      -e '\<Object$' -e '\<Object[^.]' \
      -- \
      ../../frontend/src/{frontend,adapted}*
then
  false
fi

if git ls-files '../../frontend/*.js' | grep -v -e '\.\./\.\./frontend/cypress/support' -e '\.\./\.\./frontend/src/promise-with-resolvers-polyfill\.js' -e '.generated.cy.js'
then
  false
fi
