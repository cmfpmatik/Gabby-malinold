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

import type { RouteLocationRaw } from 'vue-router'


const tag: unique symbol = Symbol()

export type Breadcrumbs = {
  [tag]: 'breadcrumb'
  intermediate: {title: string, to: RouteLocationRaw}[]
  last: string | null
}

function make(intermediate: {title: string, to: RouteLocationRaw}[], last: string | null) {
  return {intermediate, last} as Breadcrumbs
}

export function prepend(title: string, to: RouteLocationRaw, breadcrumbs: Breadcrumbs) {
  return make(
    [{title, to}, ...breadcrumbs.intermediate],
    breadcrumbs.last,
  )
}

export function last(title: string, to?: RouteLocationRaw) {
  if (to === undefined) {
    return make([], title)
  } else {
    return make([{title, to}], null)
  }
}

export const empty = make([], null)


export function normalize(breadcrumbs: Breadcrumbs) {
  if (breadcrumbs.intermediate.length === 0 && breadcrumbs.last === null) {
    return null
  } else if (breadcrumbs.last === null) {
    return make(
      breadcrumbs.intermediate.slice(0, -1),
      breadcrumbs.intermediate[breadcrumbs.intermediate.length - 1].title,
    )
  } else {
    return breadcrumbs
  }
}


export default {
  prepend,
  last,
  empty,
  normalize,
}
