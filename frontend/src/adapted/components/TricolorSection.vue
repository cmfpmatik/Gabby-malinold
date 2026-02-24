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
import type { Paragraph } from '$adapted/types'
import TricolorLines from './TricolorLines.vue'
import MonocolorSection from './MonocolorSection.vue'


defineProps<{
  paragraphs: Paragraph[],
  centered: boolean
  first: boolean
}>()

const model = defineModel<Record<string, any/* @todo Type */>>({
  required: true,
})

const tricolorLines = ref<InstanceType<typeof TricolorLines> | null>(null)
</script>

<template>
  <TricolorLines ref="tricolorLines">
    <MonocolorSection :paragraphs :centered :first v-model="model" @layoutChanged="tricolorLines?.recolor()" />
  </TricolorLines>
</template>
