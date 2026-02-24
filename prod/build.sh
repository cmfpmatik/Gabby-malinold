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


gabby_version=$1
test -n "$gabby_version"

action=$2

if [ "$action" == "push" ]
then
  args="--platform linux/amd64,linux/arm64 --push"
elif [ "$action" == "load" ]
then
  args="--platform linux/amd64 --load"
else
  exit 1
fi

if ! docker buildx ls | grep gabby-multi-platform-builder >/dev/null
then
  docker buildx create --name gabby-multi-platform-builder
fi

for part in $(grep 'AS final-' docker/Dockerfile | sed 's/.*AS final-//')
do
  echo $part
  echo $part | sed 's/./-/g'
  docker buildx build \
    --pull \
    --builder gabby-multi-platform-builder \
    .. --file docker/Dockerfile --target final-$part \
    --build-arg GABBY_VERSION=$gabby_version \
    --tag jacquev6/gabby:$gabby_version-$part \
    $args
done
