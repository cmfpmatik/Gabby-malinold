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

import { watch } from "vue"
import { useMagicKeys } from "@vueuse/core"


type Thunk = () => void

let nextClosableIndex = 0
const closables: {
  [key: number]: {
    withEscape: boolean
    withEnter: boolean
    close: Thunk
  }
} = {}

type Options = {
  withEscape?: boolean
  withEnter?: boolean
}
export default function closeWithKeyboard(close: Thunk, options: Options = {}): Thunk {
  const withEnter = options.withEnter ?? false
  const withEscape = options.withEscape ?? true

  const index = nextClosableIndex++
  closables[index] = {withEscape, withEnter, close}

  return () => {
    delete closables[index]
  }
}

const { escape, enter } = useMagicKeys()

watch([escape, enter], ([escape, enter]) => {
  if (Object.keys(closables).length > 0) {
    const index = Math.max(...Object.keys(closables).map(Number))
    const closable = closables[index]
    if (closable.withEscape && escape || closable.withEnter && enter) {
      closable.close()
    }
  }
})
