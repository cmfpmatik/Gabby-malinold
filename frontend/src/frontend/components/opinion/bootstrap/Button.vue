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
import { computed } from 'vue'


const props = withDefaults(defineProps<{
  sm?: boolean,
  primary?: boolean,
  secondary?: boolean,
  close?: boolean,
}>(), {
  sm: false,
  primary: false,
  secondary: false,
  close: false,
})

const classes = computed(() => {
  return [
    'btn',
    {
      'btn-sm': props.sm,
      'btn-primary': props.primary,
      'btn-secondary': props.secondary,
      'btn-close': props.close,
    },
  ]
})
</script>

<template>
  <button type="button" :class="classes">
    <slot></slot>
  </button>
</template>
