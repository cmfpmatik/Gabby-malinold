<!--
MALIN Platform https://malin.cahiersfantastiques.fr/
Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script lang="ts">
import { useDebouncedRefHistory } from '@vueuse/core'
</script>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'
import deepCopy from 'deep-copy'
import deepEqual from 'deep-equal'


import { BButton } from '$/frontend/components/opinion/bootstrap'
import type { Model } from './ExerciseFieldsForm.vue'


const props = defineProps<{
  reset: number  // @todo Find a better way to trigger reset
}>()

const model = defineModel<Model>({required: true})

// I don't know why 'useDebouncedRefHistory' doesn't work with 'model' directly
// (its undo/redo methods don't seem to have any effect)
// This two-way watch is a workaround
const model_ = ref(deepCopy(model.value))
watch(
  model_,
  m => {
    if (!deepEqual(model.value, m)) {
      Object.assign(model.value, deepCopy(m))
    }
  },
  {deep: true},
)
watch(
  model,
  m => {
    if (!deepEqual(model_.value, m)) {
      Object.assign(model_.value, deepCopy(m))
    }
  },
  {deep: true},
)

// @todo Consider using 'useThrottledRefHistory' instead of 'useDebouncedRefHistory'
let history = useDebouncedRefHistory(model_, {deep: true, debounce: 1000})

watch(() => props.reset, () => {
  history = useDebouncedRefHistory(model_, {deep: true, debounce: 1000})
})

const { Ctrl_Z, Ctrl_Y } = useMagicKeys()
watch(Ctrl_Z, (v) => {
  if (v && history.canUndo.value) {
    history.undo()
  }
})
watch(Ctrl_Y, (v) => {
  if (v && history.canRedo.value) {
    history.redo()
  }
})
</script>

<template>
  <BButton primary sm @click="history.undo" :disabled="!history.canUndo.value" title="Ctrl+Z" :data-gab="history.undoStack.value.length">{{ $t('undo') }}</BButton>
  <BButton primary sm @click="history.redo" :disabled="!history.canRedo.value" title="Ctrl+Y" :data-gab="history.redoStack.value.length">{{ $t('redo') }}</BButton>
</template>
