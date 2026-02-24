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

import SelectedText from './SelectedText.vue'


const props = defineProps<{
  colors: string[]
  boxed: boolean
  padding: [number, number] | undefined
}>()

const colorIndex = defineModel<number>({default: 0})

function increment() {
  colorIndex.value = (colorIndex.value + 1) % (props.colors.length + 1)
}

const style = computed(() => {
  if (props.padding !== undefined) {
    return {
      padding: `${props.padding[0]}px ${props.padding[1]}px`,
    }
  } else {
    return {}
  }
})
</script>

<template>
  <span v-if="colorIndex === 0" data-cy="selectable" @click="increment" :class="{boxed}" :style><slot></slot></span>
  <SelectedText v-else data-cy="selectable" @click="increment" :color="colors[colorIndex - 1]" :boxed :style><slot></slot></SelectedText>
</template>

<style scoped>
span {
  cursor: pointer;
  user-select: none;
  padding: 3.2px 0px;
}

span:hover {
  outline: 3px dotted #EEE;
}

span.boxed {
  padding: 4px;
  border: 2px solid black;
}
</style>
