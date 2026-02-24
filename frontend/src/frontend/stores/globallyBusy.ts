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
import { type Ref, watch } from 'vue'


export const useGloballyBusyStore = defineStore('globallyBusy', {
  state: () => ({
    indicators: {} as Record<string, boolean>,
  }),
  getters: {
    busy(): boolean {
      return Object.values(this.indicators).some(ref => ref)
    },
    reasons(): string[] {
      return Object.entries(this.indicators).filter(([_, ref]) => ref).map(([reason, _]) => reason)
    },
  },
  actions: {
    register(reason: string, busy: Ref<boolean>): Ref<boolean> {
      this.indicators[reason] = busy.value
      watch(busy, (b) => { this.indicators[reason] = b })
      return busy
    },
  }
})
