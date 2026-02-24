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

import atexit
import os

import sqlalchemy_utils.functions

from . import orm_models  # To populate the metadata
from .database_utils import OrmBase, create_engine, sql_create_exercise_number_collation
from .testing import TEST_DATABASE_URL


def create_test_database():
    sqlalchemy_utils.functions.create_database(TEST_DATABASE_URL)
    database_engine = create_engine(TEST_DATABASE_URL)
    with database_engine.connect() as conn:
        conn.execute(sql_create_exercise_number_collation)
        conn.commit()
    OrmBase.metadata.create_all(database_engine)
    database_engine.dispose()


def drop_test_database():
    sqlalchemy_utils.functions.drop_database(TEST_DATABASE_URL)


if os.environ.get("GABBY_UNITTESTING", "false") == "true":
    create_test_database()
    atexit.register(drop_test_database)
