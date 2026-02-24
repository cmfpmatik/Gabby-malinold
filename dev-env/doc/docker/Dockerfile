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

FROM python:3.12

ARG USER_ID
ARG GROUP_ID
RUN set -x \
 && (groupadd --gid $GROUP_ID gabby || true) \
 && useradd --uid $USER_ID --gid $GROUP_ID --create-home --shell /bin/bash gabby

USER gabby
ENV PATH=$PATH:/home/gabby/.local/bin

RUN --mount=type=cache,target=/home/gabby/.cache/pip,sharing=locked \
    set -x \
 && pip3 install \
      sphinx-autobuild \
      watchfiles \
 && true

RUN mkdir -p /home/gabby/doc
