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
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  label: string
}>()

const model = defineModel<string>()

const id = `input-${ Math.floor(Math.random() * 4000000000) }`

const inputElement = ref<HTMLInputElement | null>(null)

defineExpose({
  clear: () => {
    model.value = ''
  },
  focus: () => inputElement.value?.focus(),
  setSelectionRange: (start: number, end: number) => inputElement.value?.setSelectionRange(start, end),
  inputElement,
})
</script>

<template>
  <div class="mb-3">
    <label class="form-label" :for="id">{{ label }}</label>
    <input ref="inputElement" class="form-control" :id v-model="model" v-bind="$attrs" />
  </div>
</template>
