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

import { makeStore } from "./glue"
import type { ApiStore, Item, List, InCache, Exists } from "./interface"


// Multiple, lazy-instantiated singletons, à la Pinia, but handled manually for flexibility.
let stores: {[id: string]: ApiStore} = {}

export function resetApiStores() {
  stores = {}
}

export function defineApiStore(id: string, options: {baseUrl: string}): () => ApiStore {
  return function useApiStore() {
    if (stores[id] === undefined) {
      stores[id] = makeStore(options)
    }
    return stores[id]
  }
}

export const useApiStore = defineApiStore('api', {baseUrl: '/api'})

export type { Item, List, InCache, Exists }

export type ParsedExercise = Item<'parsedExercise'>
export type Exercise = Item<'exercise'>
export type PdfFile = Item<'pdfFile'>
export type PdfFileNaming = Item<'pdfFileNaming'>
export type Ping = Item<'ping'>
export type Project = Item<'project'>
export type RecoveryEmailRequest = Item<'recoveryEmailRequest'>
export type Section = Item<'section'>
export type Textbook = Item<'textbook'>
export type User = Item<'user'>
