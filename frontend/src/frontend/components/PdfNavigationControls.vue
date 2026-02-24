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
import { ref, watch } from 'vue'

import { BButton } from './opinion/bootstrap'


const props = withDefaults(defineProps<{
  pagesCount: number,
  disabled?: boolean,
}>(), {
  disabled: false,
})

const pageNumber = defineModel<number>('page', {default: 1})
const requestedPageNumber = ref('1')

function resetRequestedPageNumber() {
  requestedPageNumber.value = pageNumber.value.toString()
}

watch(pageNumber, resetRequestedPageNumber, {immediate: true})

watch(requestedPageNumber, () => {
  const page = Number.parseInt(requestedPageNumber.value, 10)
  if (Number.isInteger(page) && page >= 1 && page <= props.pagesCount) {
    pageNumber.value = page
  }
})
</script>

<template>
  <p class="text-center">
    <BButton sm primary :disabled="disabled || pageNumber <= 1" @click="--pageNumber">&lt;</BButton>
    <label>
      {{ $t('pdfNavigationPage') }}
      <input type="number" min="1" :max="pagesCount" size="4" :disabled v-model="requestedPageNumber" @blur="resetRequestedPageNumber" />
      {{ $t('pdfNavigationPageOver', pagesCount) }}
    </label>
    <BButton sm primary :disabled="disabled || pageNumber >= pagesCount" @click="++pageNumber">&gt;</BButton>
    <slot></slot>
  </p>
</template>

<style scoped>
/* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */
input {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
