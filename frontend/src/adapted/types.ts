// MALIN Platform https://malin.cahiersfantastiques.fr/
// Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import type { paths } from '$/openapi'


export interface Settings {
  centeredInstructions: boolean
  tricolorWording: boolean
}

export type Exercise = Exclude<paths['/api/parsedExercises/{id}']['get']['responses']['200']['content']['application/vnd.api+json']['data']['attributes']['adapted'], null>

export type Paragraph = Exercise['pagelets'][number]['sections'][number]['paragraphs'][number]


export interface Data {
  projectId: string,
  exercises: {
    [id: string]: Exercise,
  },
}
