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

import datetime

from sqlalchemy import orm
import sqlalchemy as sql

from .user import User


class CreatedByAtMixin:
    @orm.declared_attr
    def created_at(self) -> orm.Mapped[datetime.datetime]:
        return orm.mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now())

    @orm.declared_attr
    def created_by_id(self) -> orm.Mapped[int]:
        return orm.mapped_column(sql.ForeignKey("users.id"))

    @orm.declared_attr
    def created_by(self) -> orm.Mapped[User]:
        return orm.relationship(foreign_keys=[self.created_by_id])


class UpdatedByAtMixin:
    @orm.declared_attr
    def updated_at(self) -> orm.Mapped[datetime.datetime]:
        return orm.mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now(), onupdate=sql.func.now())

    @orm.declared_attr
    def updated_by_id(self) -> orm.Mapped[int]:
        return orm.mapped_column(sql.ForeignKey("users.id"))

    @orm.declared_attr
    def updated_by(self) -> orm.Mapped[User]:
        return orm.relationship(foreign_keys=[self.updated_by_id])


class CreatedUpdatedByAtMixin(CreatedByAtMixin, UpdatedByAtMixin):
    pass


class OptionalCreatedByAtMixin:
    @orm.declared_attr
    def created_at(self) -> orm.Mapped[datetime.datetime]:
        return orm.mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now())

    @orm.declared_attr
    def created_by_id(self) -> orm.Mapped[int | None]:
        return orm.mapped_column(sql.ForeignKey("users.id"))

    @orm.declared_attr
    def created_by(self) -> orm.Mapped[User | None]:
        return orm.relationship(foreign_keys=[self.created_by_id])


class OptionalUpdatedByAtMixin:
    @orm.declared_attr
    def updated_at(self) -> orm.Mapped[datetime.datetime]:
        return orm.mapped_column(sql.DateTime(timezone=True), server_default=sql.func.now(), onupdate=sql.func.now())

    @orm.declared_attr
    def updated_by_id(self) -> orm.Mapped[int | None]:
        return orm.mapped_column(sql.ForeignKey("users.id"))

    @orm.declared_attr
    def updated_by(self) -> orm.Mapped[User | None]:
        return orm.relationship(foreign_keys=[self.updated_by_id])


class OptionalCreatedUpdatedByAtMixin(OptionalCreatedByAtMixin, OptionalUpdatedByAtMixin):
    pass
