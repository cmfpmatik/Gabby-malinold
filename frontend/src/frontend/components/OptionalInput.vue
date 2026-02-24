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

import { BLabeledInput } from './opinion/bootstrap'


defineProps<{
  label: string,
}>()

const model = defineModel<string>({required: true})

const forced = ref(false)

const inputElement = ref<InstanceType<typeof BLabeledInput> | null>(null)

function force() {
  forced.value = true
  nextTick(() => inputElement.value?.focus())
}

function unforce() {
  forced.value = false
}

const expanded = computed(() => model.value !== '' || forced.value)

defineExpose({
  expanded,
  focus: () => inputElement.value?.focus(),
  setSelectionRange: (start: number, end: number) => inputElement.value?.setSelectionRange(start, end),
  inputElement: inputElement.value?.inputElement,
})
</script>

<template>
  <BLabeledInput v-if="expanded" ref="inputElement" :label v-model="model" @focus="force" @blur="unforce" />
  <p v-else @click="force">{{ label }} <button class="btn btn-sm btn-primary">+</button></p>
</template>
