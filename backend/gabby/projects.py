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

from contextlib import contextmanager

from sqlalchemy import orm
import sqlalchemy as sql

from . import api_models
from . import settings
from .api_utils import create_item, get_item, get_page, save_item, delete_item
from .database_utils import OrmBase, SessionDependable
from .users import MandatoryAuthBearerDependable
from .users.mixins import CreatedUpdatedByAtMixin
from .wrapping import set_wrapper, make_sqids, orm_wrapper_with_sqids


class Project(OrmBase, CreatedUpdatedByAtMixin):
    __tablename__ = "projects"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    title: orm.Mapped[str]
    description: orm.Mapped[str]

    textbooks: orm.Mapped[list["Textbook"]] = orm.relationship(back_populates="project")
    exercises: orm.Mapped[list["Exercise"]] = orm.relationship(
        back_populates="project", order_by="[Exercise.textbook_id, Exercise.textbook_page, Exercise.number]"
    )


class ProjectsResource:
    singular_name = "project"
    plural_name = "projects"

    Model = api_models.Project

    default_page_size = settings.GENERIC_DEFAULT_API_PAGE_SIZE

    sqids = make_sqids(singular_name)

    def create_item(self, title, description, session: SessionDependable, authenticated_user: MandatoryAuthBearerDependable):
        return create_item(session, Project, title=title, description=description, created_by=authenticated_user, updated_by=authenticated_user)

    def get_item(self, id, session: SessionDependable, authenticated_user: MandatoryAuthBearerDependable):
        return get_item(session, Project, ProjectsResource.sqids.decode(id)[0])

    def get_page(self, first_index, page_size, session: SessionDependable, authenticated_user: MandatoryAuthBearerDependable):
        query = sql.select(Project)
        return get_page(session, query, first_index, page_size)

    @contextmanager
    def save_item(self, item, session: SessionDependable, authenticated_user: MandatoryAuthBearerDependable):
        yield
        item.updated_by = authenticated_user
        save_item(session, item)

    def delete_item(self, item, session: SessionDependable, authenticated_user: MandatoryAuthBearerDependable):
        delete_item(session, item)


set_wrapper(Project, orm_wrapper_with_sqids(ProjectsResource.sqids))
