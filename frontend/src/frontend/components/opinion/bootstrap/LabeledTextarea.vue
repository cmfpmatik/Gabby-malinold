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

<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  // Disable attribute inheritance to apply all fallthrough attributes to the textarea
  // https://vuejs.org/guide/components/attrs#disabling-attribute-inheritance
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  label?: string
  maxRows?: number
  enforceTrailingLineEnd?: boolean
}>(), {
  maxRows: Infinity,
  enforceTrailingLineEnd: false,
})

const model = defineModel<string>({default: '\n'})

const modelWithoutTrailingLineEnd = computed({
  get() {
    if (props.enforceTrailingLineEnd) {
      console.assert(model.value.endsWith('\n'))
      return model.value.slice(0, -1)
    } else {
      return model.value
    }
  },
  set(value) {
    if (props.enforceTrailingLineEnd) {
      model.value = value + '\n'
    } else {
      model.value = value
    }
  },
})

const id = `textarea-${ Math.floor(Math.random() * 4000000000) }`

const textarea = ref<HTMLTextAreaElement | null>(null)

defineExpose({
  focus: () => textarea.value?.focus(),
  setSelectionRange: (start: number, end: number) => textarea.value?.setSelectionRange(start, end),
  textarea,
})
</script>

<template>
  <div class="mb-3">
    <label v-if="label !== undefined" class="form-label" :for="id">{{ label }}</label>
    <textarea class="form-control" :id="id" ref="textarea" v-model="modelWithoutTrailingLineEnd" v-bind="$attrs" :rows="Math.min(modelWithoutTrailingLineEnd.split('\n').length + 1, maxRows)"></textarea>
  </div>
</template>
