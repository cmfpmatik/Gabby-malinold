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

from typing import Any, Iterable


class Annotations:
    def __init__(self, annotations: Iterable[Any]):
        self.create_input = True
        self.update_input = True
        self.output = True

        for annotation in annotations:
            if isinstance(annotation, Annotation):
                annotation.apply(self)


class Annotation:
    pass


class Constant(Annotation):
    def apply(self, annotations : Annotations):
        annotations.update_input = False


class Computed(Annotation):
    def apply(self, annotations : Annotations):
        annotations.create_input = False
        annotations.update_input = False


class Secret(Annotation):
    def apply(self, annotations : Annotations):
        annotations.output = False
