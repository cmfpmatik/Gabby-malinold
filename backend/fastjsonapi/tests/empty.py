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

import dataclasses

from starlette import status

from ..testing import ApiTestCase, ItemsFactory
from mydantic import PydanticBase


class EmptyTestCase(ApiTestCase):
    class Resource:
        singular_name = "empty_resource"
        plural_name = "empty_resources"

        default_page_size = 2

        class Model(PydanticBase):
            pass

        @dataclasses.dataclass
        class Item:
            id: str

        def __init__(self):
            self.factory = ItemsFactory()

        def get_item(self, id):
            return None

        def create_item(self, **kwds):
            return self.Item(id="1")

    resources = [Resource()]

    def test_create(self):
        response = self.post("http://server/emptyResources", {
            "data": {
                "type": "emptyResource",
                # No "attributes", no "relationships"
            },
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.json())
        self.assertEqual(response.json(), {
            "data": {
                "type": "emptyResource",
                "id": "1",
                "links": {"self": "http://server/emptyResources/1"},
                # No "attributes", no "relationships"
            },
        })

    def test_create__weirdly_empty(self):
        response = self.post("http://server/emptyResources", {
            "data": {
                "type": "emptyResource",
                "attributes": {},
                "relationships": {},
            },
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.json())
        self.assertEqual(response.json(), {
            "data": {
                "type": "emptyResource",
                "id": "1",
                "links": {"self": "http://server/emptyResources/1"},
                # No "attributes", no "relationships"
            },
        })
