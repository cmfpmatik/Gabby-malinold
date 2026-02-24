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
import { InlineBlot } from '$frontend/components/Quill.vue'
import { allColorsForSelectableEffect, cleanupModel } from './ExerciseFieldsForm.vue'


export class SelBlot extends InlineBlot {
  static override blotName = 'sel'
  static override tagName = 'sel-blot'

  static override create(s: number) {
    let node = super.create()
    node.setAttribute('data-sel', s.toString())
    return node
  }

  static override formats(node: HTMLElement) {
    const data = node.getAttribute('data-sel')
    console.assert(data !== null)
    return Number.parseInt(data)
  }
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { BLabeledCheckbox } from '../../../../components/opinion/bootstrap'
import FloatingColorPicker from '$frontend/components/FloatingColorPicker.vue'
import type { Model } from './ExerciseFieldsForm.vue'


defineProps<{
  disabled: boolean
}>()

const model = defineModel<Model>({required: true})

const colorPickers = ref<InstanceType<typeof FloatingColorPicker>[]>([])

watch(
  [
    () => model.value.adaptationSettings.itemized.effects.isSelectable,
    () => model.value.adaptationSettings.itemized.effects.selectable.colorsCount,
  ],
  () => {
    cleanupModel(model.value)
  },
)
</script>

<template>
  <FloatingColorPicker
    v-for="i in model.adaptationSettings.itemized.effects.selectable.allColors.length"
    ref="colorPickers"
    v-model="model.adaptationSettings.itemized.effects.selectable.allColors[i - 1]"
    :colors="allColorsForSelectableEffect"
    backdropCovers1="#left-col-2"
    backdropCovers2="#gutter-2"
  />

  <BLabeledCheckbox :label="$t('effectsSelectable')" v-model="model.adaptationSettings.itemized.effects.isSelectable" :disabled />
  <span class="maybe-usable-colors-container">
    <span v-for="i in model.adaptationSettings.itemized.effects.selectable.allColors.length" :class="model.adaptationSettings.itemized.effects.isSelectable && i - 1 < model.adaptationSettings.itemized.effects.selectable.colorsCount ? 'usable-colors-container' : 'unusable-colors-container'">
      <span
        class="usable-colors-button"
        :style="{backgroundColor: model.adaptationSettings.itemized.effects.selectable.allColors[i - 1], cursor: disabled ? 'default' : 'pointer'}"
        :data-cy-colors="i"
        @click="if (!disabled) { model.adaptationSettings.itemized.effects.isSelectable = true; model.adaptationSettings.itemized.effects.selectable.colorsCount = i }"
        @contextmenu.prevent="(event) => colorPickers[i - 1].show(event.target as HTMLElement)"
      ></span>
    </span>
  </span>
</template>

<style scoped>
span.maybe-usable-colors-container {
  display: block flow-root;
  line-height: 0;
}

span.usable-colors-container {
  display: inline flow-root;
  background-color: var(--bs-primary);
}

span.unusable-colors-container {
  display: inline flow-root;
  background-color: var(--bs-secondary);
}

span.usable-colors-button {
  display: inline flow-root;
  margin: 0.25em;
  width: 1.25em;
  height: 1.25em;
}
</style>

<style>
/* Keep this section consistent with the length of 'defaultColors' array in 'defaultAdaptationSettings' */
div.ql-editor sel-blot[data-sel="1"] {
  background: var(--sel-blot-color-1);
}

div.ql-editor sel-blot[data-sel="2"] {
  background: var(--sel-blot-color-2);
}

div.ql-editor sel-blot[data-sel="3"] {
  background: var(--sel-blot-color-3);
}

div.ql-editor sel-blot[data-sel="4"] {
  background: var(--sel-blot-color-4);
}

div.ql-editor sel-blot[data-sel="5"] {
  background: var(--sel-blot-color-5);
}
</style>
