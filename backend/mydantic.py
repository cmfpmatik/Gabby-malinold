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

from typing import Annotated
import datetime

from pydantic import Field as PydanticField
from pydantic import fields
from pydantic_core import PydanticUndefined
import pydantic


class PydanticBase(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(extra="forbid", strict=True)


def create_model(*args, **kwds):
    for k, v in kwds.items():
        if v[0] in [datetime.datetime, datetime.timedelta]:
            v = list(v)
            v[0] = Annotated[v[0], PydanticField(strict=False)]
            kwds[k] = tuple(v)
    return pydantic.create_model(*args, **kwds, __base__=PydanticBase)
