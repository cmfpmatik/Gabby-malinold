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

import ContextMenu from './ContextMenu.vue'


defineProps<{
  colors: string[]
  backdropCovers1: string
  backdropCovers2: string
}>()

const model = defineModel<string>({required: true})

const contextMenu = ref<InstanceType<typeof ContextMenu> | null>(null)
function show(ref: HTMLElement) {
  console.assert(contextMenu.value !== null)
  contextMenu.value.show(ref)
}

function commit(value: string) {
  model.value = value
  console.assert(contextMenu.value !== null)
  contextMenu.value.hide()
}

defineExpose({show})
</script>

<template>
  <ContextMenu ref="contextMenu" :backdropCovers1 :backdropCovers2>
    <span class="color" :style="{background: color}" v-for="color in colors" @click="commit(color)"></span>
  </ContextMenu>
</template>

<style scoped>
span.color {
  display: inline flow-root;
  width: 1.25em;
  height: 1.25em;
  margin-left: 0.25em;
  margin-right: 0.25em;
  cursor: pointer;
}
</style>
