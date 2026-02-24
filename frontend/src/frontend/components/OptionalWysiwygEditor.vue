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
import { ref, computed } from 'vue'
import { nextTick } from 'vue'

import WysiwygEditor from './WysiwygEditor.vue'
import { type Model, BoldBlot } from './Quill.vue'
import deepEqual from 'deep-equal'


defineProps<{
  label: string,
  blots: (typeof BoldBlot)[]
  formatsNestingOrder: string[]
  compatibleFormats: string[][]
  contagiousFormats: string[]
}>()

const model = defineModel<Model>({required: true})

const forced = ref(false)

const editor = ref<InstanceType<typeof WysiwygEditor> | null>(null)

function force() {
  forced.value = true
  nextTick(() => editor.value?.focus())  // @todo Fix
}

function unforce() {
  forced.value = false
}

const expanded = computed(() => !deepEqual(model.value, [{insert: '\n', 'attributes': {}}]) || forced.value)

defineExpose({
  expanded,
  toggle(format: string, value: unknown = true) {
    console.assert(editor.value !== null)
    editor.value.toggle(format, value)
  },
  focus: () => editor.value?.focus(),
  setSelection(index: number, length: number) {
    editor.value?.setSelection(index, length)
  },
  getSelectedRange() {
    console.assert(editor.value !== null)
    return editor.value.getSelectedRange()
  },
  getLength() {
    return editor.value?.getLength() ?? 0
  },
  hasFocus: computed(() => editor.value !== null && editor.value.hasFocus),
  currentFormat: computed(() => editor.value === null ? {} : editor.value.currentFormat),
})
</script>

<template>
  <WysiwygEditor
    v-if="expanded"
    ref="editor"
    :label
    :blots
    :formatsNestingOrder
    :compatibleFormats
    :contagiousFormats
    v-model="model"
    @focus="force"
    @blur="unforce"
  />
  <p v-else @click="force">{{ label }} <button class="btn btn-sm btn-primary">+</button></p>
</template>
