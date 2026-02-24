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

from alembic import op
import sqlalchemy as sa


revision = "466912d2351b"
down_revision = "c8a245b8f104"
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column("adaptations__st", "colors", new_column_name="old_colors_count")
    op.add_column("adaptations__st", sa.Column("colors", sa.JSON(), server_default='["#ffff00", "#ffc0cb", "#bbbbff", "#bbffbb", "#bbbbbb"]', nullable=False))


def downgrade():
    op.drop_column("adaptations__st", "colors")
    op.alter_column("adaptations__st", "old_colors_count", new_column_name="colors")
