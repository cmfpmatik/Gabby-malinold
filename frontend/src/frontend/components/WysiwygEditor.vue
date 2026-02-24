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
import { ref, computed, watch } from 'vue'

import Quill, { type Model, type SelectionRange, type Blot } from './Quill.vue'

defineProps<{
  label: string
  blots: Blot[]
  formatsNestingOrder: string[]
  compatibleFormats: string[][]
  contagiousFormats: string[]
}>()

const model = defineModel<Model>({required: true})

const emit = defineEmits<{
  focus: []
  blur: []
  selectionChange: [SelectionRange]
}>()

const quill = ref<InstanceType<typeof Quill> | null>(null)

watch(
  model,
  delta => {
    console.assert(delta.length > 0)
    const lastOp = delta[delta.length - 1]
    console.assert(typeof lastOp.insert === 'string')
    console.assert(lastOp.insert.endsWith('\n'))
  },
  {immediate: true, deep: true},
)

const quill_ = computed(() => {
  if (quill.value === null) {
    return null
  } else {
    return quill.value.quill
  }
})

defineExpose({
  quill: quill_,
  toggle(format: string, value: unknown = true) {
    console.assert(quill.value !== null)
    quill.value.toggle(format, value)
  },
  focus() {
    console.assert(quill.value !== null)
    quill.value.focus()
  },
  setSelection(index: number, length: number) {
    console.assert(quill.value !== null)
    quill.value.setSelection(index, length)
  },
  getSelectedRange() {
    console.assert(quill.value !== null)
    return quill.value.getSelectedRange()
  },
  getLength() {
    console.assert(quill.value !== null)
    return quill.value.getLength()
  },
  hasFocus: computed(() => quill.value !== null && quill.value.hasFocus),
  currentFormat: computed(() => quill.value === null ? {} : quill.value.currentFormat),
})
</script>

<template>
  <div class="mb-3">
    <label class="form-label" @click="quill?.focus()">{{ label }}</label>
    <Quill
      ref="quill"
      v-model="model"
      :blots
      :formatsNestingOrder
      :compatibleFormats
      :contagiousFormats
      @focus="emit('focus')"
      @blur="emit('blur')"
      @selectionChange="range => emit('selectionChange', range)"
    />
  </div>
</template>
