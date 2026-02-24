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

<script setup lang="ts" generic="T">
import { label as makeLabel, value as makeValue, disabled as makeDisabled, type Option } from './Select.vue'
import Radio from './Radio.vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  label: string,
  options: (string | Option<T>)[],
}>()

const model = defineModel<T>()
</script>

<template>
  <div class="mb-3">
    <p class="form-label">{{ label }}</p>
    <Radio v-for="option in options" v-model="model" :label="makeLabel(option)" :value="makeValue(option)" :disabled="makeDisabled(option)" />
  </div>
</template>
