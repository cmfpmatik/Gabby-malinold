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

from __future__ import annotations

from typing import Annotated, Literal

from mydantic import PydanticBase, PydanticField


class Whitespace(PydanticBase):
    kind: Literal["whitespace"]
    bold: bool = False
    italic: bool = False
    highlighted: str | None = None


class Text(PydanticBase):
    kind: Literal["text"]
    bold: bool = False
    italic: bool = False
    highlighted: str | None = None
    text: str


class PassiveSequence(PydanticBase):
    kind: Literal["passiveSequence"]
    contents: list[PassiveRenderable]
    boxed: bool = False


PassiveRenderable = Whitespace | Text | PassiveSequence


class FreeTextInput(PydanticBase):
    kind: Literal["freeTextInput"]


class MultipleChoicesInput(PydanticBase):
    kind: Literal["multipleChoicesInput"]
    show_arrow_before: bool = False
    choices: list[list[PassiveRenderable]]
    show_choices_by_default: bool = False
    fixed_case: Annotated[bool, PydanticField(exclude=True)] = True


class SelectableInput(PydanticBase):
    kind: Literal["selectableInput"]
    colors: list[str]
    boxed: bool = False
    padding: tuple[float, float] = (0.0, 0.0)
    contents: list[PassiveRenderable]


AlmostAnyRenderable = PassiveRenderable | FreeTextInput | MultipleChoicesInput | SelectableInput


class AnySequence(PydanticBase):
    kind: Literal["sequence"]
    contents: list[AlmostAnyRenderable | AnySequence]
    vertical: bool = False


AnyRenderable = AlmostAnyRenderable | AnySequence


class Paragraph(PydanticBase):
    contents: list[AnyRenderable]


class Section(PydanticBase):
    paragraphs: list[Paragraph]
    centered: bool
    tricolored: bool


class Pagelet(PydanticBase):
    sections: list[Section]


class Exercise(PydanticBase):
    number: str
    textbook_page: int | None
    pagelets: list[Pagelet]
