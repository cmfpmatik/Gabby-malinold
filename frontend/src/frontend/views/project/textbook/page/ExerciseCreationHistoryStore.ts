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

import { defineStore } from 'pinia'


export const useExerciseCreationHistoryStore = defineStore('exerciseCreationHistory', {
  state: () => ({
    _previous: [] as string[],
    _next: [] as string[],
    _current: null as string | null,
    suggestedNumber: null as string | null,
  }),
  getters: {
    previous(): string | null {
      return this._previous[this._previous.length - 1] || null
    },
    current(): string | null {
      return this._current
    },
    next(): string | null {
      return this._next[this._next.length - 1] || null
    },
    empty(): boolean {
      return this._previous.length === 0 && this._current === null && this._next.length === 0
    },
  },
  actions: {
    reset() {
      this._previous.length = 0
      this._next.length = 0
      this._current = null
      this.suggestedNumber = null
    },
    push(id: string) {
      console.assert(this._next.length === 0)
      this._previous.push(id)
    },
    rewind() {
      if (this._current !== null) {
        this._next.push(this._current)
      }
      const newCurrent = this._previous.pop()
      console.assert(newCurrent !== undefined)
      this._current = newCurrent
    },
    forward() {
      console.assert(this._current !== null)
      this._previous.push(this._current)
      const newCurrent = this._next.pop()
      if (newCurrent === undefined) {
        this._current = null
      } else {
        this._current = newCurrent
      }
    },
  },
})
