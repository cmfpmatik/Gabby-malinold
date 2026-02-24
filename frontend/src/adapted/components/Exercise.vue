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
import { reactive, computed, watch } from 'vue'

import type { Exercise } from '$adapted/types'
import TricolorSection from './TricolorSection.vue'
import MonocolorSection from './MonocolorSection.vue'


const props = withDefaults(defineProps<{
  projectId: string
  exerciseId: string
  exercise: Exercise
  pageletIndex: number
  isPreview?: boolean
}>(), {
  isPreview: false,
})

// @todo Make this key depend on when the exercise (or its adaptation ) was last modified
const storageKey = computed(() => `exerciseAnswers/v2/project-${props.projectId}/exercise-${props.exerciseId}`)

const pagelet = computed(() => {
  console.assert(props.pageletIndex >= 0 && props.pageletIndex < props.exercise.pagelets.length)
  return props.exercise.pagelets[props.pageletIndex]
})

const models = reactive<
  {
    instructions: {[index: string]: any/* @todo Type */},
    wording: {[index: string]: any/* @todo Type */},
  }[]
>([])
function reinitModels() {
  models.splice(0, models.length, ...props.exercise.pagelets.map(() => ({instructions: {}, wording: {}})))
}
watch(() => props.exercise, reinitModels, {deep: true, immediate: true})
watch(
  models,
  () => {
    if (!props.isPreview) {
      localStorage.setItem(storageKey.value, JSON.stringify(models))
      console.log('Saved models to', storageKey.value)
    }
  },
  {deep: true},
)
watch(
  storageKey,
  () => {
    if (!props.isPreview) {
      const storedModels = localStorage.getItem(storageKey.value)
      if (storedModels) {
        const parsedStoredModels = JSON.parse(storedModels)
        if (typeof parsedStoredModels === 'object') {
          models.splice(0, models.length, ...parsedStoredModels)
          console.log('Loaded models from', storageKey.value, models)
        }
      }
    }
  },
  {immediate: true},
)

defineExpose({
  reinitModels,
  disabledReinitModels: computed(() => models.every(pagelet => Object.keys(pagelet.wording).length === 0)),
})
</script>

<template>
  <div style="position: relative; font-family: Arial, sans-serif;">
    <template v-for="section, sectionIndex in pagelet.sections">
      <template v-if="section.tricolored">
        <div style="padding-left: 6px; padding-right: 6px;">
          <TricolorSection :paragraphs="section.paragraphs" :centered="section.centered" :first="sectionIndex == 0" v-model="models[pageletIndex].wording" />
        </div>
      </template>
      <template v-else>
        <MonocolorSection :paragraphs="section.paragraphs" :centered="section.centered" :first="sectionIndex == 0" v-model="models[pageletIndex].instructions" />
      </template>
    </template>
  </div>
</template>
