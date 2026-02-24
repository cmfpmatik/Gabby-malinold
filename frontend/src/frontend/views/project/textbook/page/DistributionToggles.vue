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
import { useI18n } from 'vue-i18n'

const model = defineModel<number | null>({required: true})

const i18n = useI18n()

const possibleValues = [1, 2, 3, 4, 5]

function toggle(v: number) {
  if (model.value === v) {
    model.value = null
  } else {
    model.value = v
  }
}
</script>

<template>
  <p>
    <span v-for="value in possibleValues" class="value" :class="{selected: model === value}" :title="i18n.t('exerciseLinesPerPage', value)" @click="toggle(value)">{{ value }}</span>
  </p>
</template>

<style scoped>
p {
  user-select: none;
}

span.value {
  display: inline flow-root;
  margin: 0.25em;
  padding: 0;
  border: 1px solid black;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  cursor: pointer;
}

span.value.selected {
  background-color: var(--bs-primary);
  color: white;
}
</style>
