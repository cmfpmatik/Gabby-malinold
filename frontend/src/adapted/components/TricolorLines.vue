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
import { ref, watch } from 'vue'
import { onMounted, onUpdated, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'


const container = ref<HTMLDivElement | null>(null)
const { width } = useElementSize(container)
watch(width, () => nextTick(recolor))
onMounted(recolor)
onUpdated(recolor)

// Client found a situation where the colors were not updated. I have no idea why :-/
// (https://github.com/jacquev6/Gabby/issues/76)
// So, better safe than sorry, let's update the colors periodically.
setInterval(recolor, 1000)

/* Colors provided by client */
const colors = ['#00F', '#F00', '#0C0']

function recolor() {
  if (container.value !== null) {
    const tricolorables = Array.from(container.value.getElementsByClassName('tricolorable') as HTMLCollectionOf<HTMLElement>)

    type Line = { top: number, bottom: number, tricolorables: HTMLElement[] }
    const lines: Line[] = []

    tricolorables.forEach(element => {
      const { top, bottom } = element.getBoundingClientRect()
      const line = lines.find(line => line.top < bottom && line.bottom > top)
      if (line) {
        line.top = Math.min(line.top, top)
        line.bottom = Math.max(line.bottom, bottom)
        line.tricolorables.push(element)
      } else {
        lines.push({ top, bottom, tricolorables: [element] })
      }
    })

    lines.sort((a, b) => a.top - b.top)

    lines.forEach((line, i) => {
      const color = colors[i % colors.length]
      line.tricolorables.forEach(element => {
        element.style.color = color
      })
    })
  }
}

defineExpose({ recolor })
</script>

<template>
  <div ref="container"><slot></slot></div>
</template>

<style>
.tricolorable .tricolorable {
  background-color: rgba(255, 0, 0, 0.5);
}

.tricolorable .tricolorable::after {
  content: 'THERE IS A BUG (nested tricolorable)';
  color: black;
}
</style>
