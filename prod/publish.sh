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
cd "$(dirname "${BASH_SOURCE[0]}")/.."


# Check cleanliness

if [ $(git branch --show-current) != main ]
then
  echo "Not on branch 'main'. Aborting."
  exit 1
fi

if [ "$(git ls-files --others --exclude-standard)" != "" ]
then
  git ls-files --others --exclude-standard
  echo "Untracked files. Aborting."
  exit 1
fi

if ! git diff --stat --exit-code
then
  echo "Unstaged changes. Aborting."
  exit 1
fi

if ! git diff --stat --staged --exit-code
then
  echo "Staged-but-not-committed changes will be included in publication commit. Press enter to continue, Ctrl+C to abort."
  read
fi

# Prepare

gabby_version=$(date +%Y%m%d-%H%M%S)

git --no-pager log --oneline --graph --decorate $(git tag | sort | tail -n 1)^..

echo "Edit the 'doc/changes.rst' for version $gabby_version and press enter to continue, Ctrl+C to abort."
read

migrations=backend/gabby/migrations/versions
find $migrations -name '*_dev.py' \
| sed "s#$migrations/\(.*\)_dev\.py#\mv $migrations/\1_dev.py $migrations/\1_$gabby_version.py#" \
| sh

git add .
git commit -m "Publish version $gabby_version"

# Build and publish

prod/build.sh $gabby_version push
git tag $gabby_version
git push origin main --tags

# Continue working

git checkout develop
git merge main
git push origin develop
