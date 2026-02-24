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

from logging.config import fileConfig

from alembic import context

from gabby import database_utils, settings
from gabby import orm_models  # To populate the metadata


if context.config.config_file_name is not None:
    fileConfig(context.config.config_file_name)


assert not context.is_offline_mode()

connectable = database_utils.create_engine(settings.DATABASE_URL)

with connectable.connect() as connection:
    context.configure(connection=connection, target_metadata=database_utils.OrmBase.metadata)
    with context.begin_transaction():
        context.run_migrations()
