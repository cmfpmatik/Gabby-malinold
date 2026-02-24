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
export interface Option<T> {
  value: T
  label: string
  disabled?: boolean
}

export function value(option: string): string
export function value<T>(option: Option<T>): T
export function value<T>(option: string | Option<T>): string | T
export function value<T>(option: string | Option<T>) {
  if (typeof option === 'string') {
    return option
  } else {
    return option.value
  }
}

export function label<T>(option: string | Option<T>) {
  if (typeof option === 'string') {
    return option
  } else {
    return option.label
  }
}

export function disabled<T>(option: string | Option<T>) {
  if (typeof option === 'string') {
    return false
  } else {
    return option.disabled
  }
}
</script>

<script setup lang="ts" generic="T">
defineProps<{
  options: (string | Option<T>)[],
}>()

const model = defineModel<T>()
</script>

<template>
  <select v-model="model" class="form-select">
    <template v-for="option in options" :key="value(option)">
      <option :value="value(option)" :disabled="disabled(option)">{{ label(option) }}</option>
    </template>
  </select>
</template>
