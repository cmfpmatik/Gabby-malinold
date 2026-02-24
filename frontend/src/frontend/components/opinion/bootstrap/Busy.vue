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
import { ref, computed, watch } from 'vue'


const props = withDefaults(defineProps<{
  busy: boolean,
  showWhileBusy?: 'always' | 'afterNotBusy' | 'never',
  size?: string,
  tag?: string,
}>(), {
  showWhileBusy: 'always',
  size: '2rem',
  tag: 'div',
})

const hasEverBeenNotBusy = ref(false)
watch(
  () => props.busy,
  (busy) => {
    if (!busy) {
      hasEverBeenNotBusy.value = true
    }
  },
  {immediate: true}
)

const show = computed(() => {
  if (props.showWhileBusy === 'always') {
    return true
  } else if (props.showWhileBusy === 'afterNotBusy') {
    return hasEverBeenNotBusy.value
  } else {
    console.assert(props.showWhileBusy === 'never')
    return !props.busy
  }
})

const style = computed(() => {
  if (props.busy) {
    return {
      'min-height': props.size,
    }
  } else {
    return {}
  }
})
</script>

<template>
  <component :is="tag" style="position: relative" :style="style">
    <template v-if="show">
      <slot v-bind="$attrs"></slot>
    </template>
    <div v-if="busy" class="busy d-flex justify-content-center align-items-center" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.5); z-index: 20;">
      <div class="spinner-border" :style="{width: size, height: size}" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </component>
</template>
