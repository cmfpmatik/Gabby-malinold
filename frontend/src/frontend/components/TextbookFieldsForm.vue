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
import type { Textbook, InCache, Exists } from '$frontend/stores/api'


export interface Model {
  title: string
  publisher: string
  year: number | null
  isbn: string
}

export function makeModel(): Model {
  return {
    title: '',
    publisher: '',
    year: null,
    isbn: '',
  }
}

export function assignModelFrom(model: Model, textbook: Textbook & InCache & Exists) {
  model.title = textbook.attributes.title
  model.publisher = textbook.attributes.publisher || ''
  model.year = textbook.attributes.year
  model.isbn = textbook.attributes.isbn || ''
}

export function resetModel(model: Model) {
  Object.assign(model, makeModel())
}

// @todo Add 'create' and 'save' functions (cf. ExerciseFieldsForm)
</script>

<script setup lang="ts">
import { computed } from 'vue'

import { BLabeledInput, BLabeledNumberInput } from './opinion/bootstrap'


const model = defineModel<Model>({required: true})

const saveDisabled = computed(() => model.value.title === '')

defineExpose({
  saveDisabled,
})
</script>

<template>
  <BLabeledInput :label="$t('textbookTitle')" v-model="model.title"/>
  <BLabeledInput :label="$t('textbookPublisher')" v-model="model.publisher"/>
  <BLabeledNumberInput :label="$t('textbookYear')" v-model="model.year"/>
  <BLabeledInput :label="$t('textbookIsbn')" v-model="model.isbn"/>
</template>
