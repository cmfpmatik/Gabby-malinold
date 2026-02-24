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
defineOptions({
  // Disable attribute inheritance to apply all fallthrough attributes to the textarea
  // https://vuejs.org/guide/components/attrs#disabling-attribute-inheritance
  inheritAttrs: false
})

defineProps<{
  label: string,
}>()

const model = defineModel<boolean>({default: false})

const id = `checkbox-${ Math.floor(Math.random() * 4000000000) }`
</script>

<template>
  <div class="form-check">
    <input class="form-check-input" :id="id" type="checkbox" v-model="model" v-bind="$attrs" />
    <label class="form-check-label" :for="id">{{ label }}</label>
    <slot></slot>
  </div>
</template>
