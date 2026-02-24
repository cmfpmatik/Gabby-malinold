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
import { onMounted, onBeforeUpdate } from 'vue'


const model = defineModel<string>()

const span = ref<HTMLSpanElement | null>(null)

function updateModel() {
  console.assert(span.value !== null)
  model.value = span.value.innerText
}

// Can't just put '{{ model }}' in the 'span' because it resets the caret to the beginning after each change
function updateContent() {
  console.assert(span.value !== null)
  const innerText = model.value ?? ''
  if (span.value.innerText !== innerText) {  // Avoid resetting the caret to the beginning: change only if necessary
    span.value.innerText = innerText
  }
}

onMounted(updateContent)
onBeforeUpdate(updateContent)  // For re-used components

function forbidNewlines(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
}
</script>

<template>
  <span ref="span" :class="{empty: model === '' || model === undefined}" contenteditable @input="updateModel" @keypress="forbidNewlines"></span>
</template>

<style scoped>
/* Based on Etude_de_la_langue_CE1_Belin/P34Ex6_hrl2.html */

span {
  line-height: 1em;  /* Fix caret position on Chrome */
  padding: 4px;
  border: 2px outset black;
}

.empty {
  padding-left: 1ch;
  padding-right: 1ch;
}

span:hover {
  background-color: #FFFDD4;
}
</style>
