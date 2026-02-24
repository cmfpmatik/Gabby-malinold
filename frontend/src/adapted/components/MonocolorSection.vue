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
import { computed, watch } from 'vue'
import { nextTick } from 'vue'

import type { Paragraph } from '$adapted/types'
import Renderable from './Renderable.vue'


const props = defineProps<{
  paragraphs: Paragraph[]
  centered: boolean
  first: boolean
}>()

const models = defineModel<Record<string, any/* @todo Type */>>({
  required: true,
})

const emit = defineEmits<{
  layoutChanged: []
}>()

watch(models, () => nextTick(() => emit('layoutChanged')), { deep: true })

const style = computed(() => ({
  textAlign: props.centered ? 'center' as const : 'left' as const,
}))
</script>

<template>
  <p v-for="(paragraph, paragraphIndex) in paragraphs" :style :class="{first: first && paragraphIndex === 0}">
    <Renderable v-for="(node, nodeIndex) in paragraph.contents" :node="node" v-model="models" :nested="false" :modelKey="[paragraphIndex, nodeIndex]" />
  </p>
</template>

<style scoped>
p {
  font-size: 32px;
  line-height: 3;
  margin: 0px;
}

p.first {
  margin-top: -19px;
}
</style>
