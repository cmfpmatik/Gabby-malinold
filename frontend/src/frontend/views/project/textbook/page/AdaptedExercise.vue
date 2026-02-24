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
import { ref, computed, watch, provide } from 'vue'
import { useWindowSize, useElementBounding } from '@vueuse/core'

import type { Exercise } from '$adapted/types'
import { BButton } from '$frontend/components/opinion/bootstrap'
import ExerciseComponent from '$adapted/components/Exercise.vue'
import PageletsNavigationControls from '$adapted/components/PageletsNavigationControls.vue'
import closeWithKeyboard from '$/frontend/components/closeWithKeyboard'


const props = defineProps<{
  projectId: string,
  exerciseId: string,
  exercise: Exercise,
}>()

const pageletIndex = ref(0)
const pageletsCount = computed(() => props.exercise.pagelets.length)

watch(pageletsCount, pageletsCount => {
  if (pageletIndex.value >= pageletsCount) {
    pageletIndex.value = pageletsCount - 1
  }
})

const exerciseComponent = ref<InstanceType<typeof ExerciseComponent> | null>(null)

const { width: windowWidth, height: windowHeight } = useWindowSize()
const aspectRatio = computed(() => windowWidth.value / windowHeight.value)

const container = ref<HTMLElement | null>(null)
const { width: containerWidth } = useElementBounding(container)

const fullScreen = ref(false)

let cancelClosingOnEscape: (() => void) | null = null

function show() {
  fullScreen.value = true
  console.assert(cancelClosingOnEscape === null)
  cancelClosingOnEscape = closeWithKeyboard(hide)
}

function hide() {
  fullScreen.value = false
  console.assert(cancelClosingOnEscape !== null)
  cancelClosingOnEscape()
  cancelClosingOnEscape = null
}

const containerStyle  = computed(() => {
  if (container.value === null) {
    return {}
  } else {
    const borderWidth = Number.parseFloat(container.value.style.borderWidth.slice(0, -2))
    const actualContainerWidth = containerWidth.value - 2 * borderWidth
    const maxHeight = actualContainerWidth / aspectRatio.value + 2 * borderWidth
    return {
      maxHeight: `${maxHeight}px`,
    }
  }
})

const previewStyle = computed(() => {
  if (container.value === null) {
    return {}
  } else {
    const actualContainerWidth = containerWidth.value - 2 * Number.parseFloat(container.value.style.borderWidth.slice(0, -2))
    const scale = actualContainerWidth / windowWidth.value

    if (fullScreen.value) {
      return {
        aspectRatio: aspectRatio.value,
        overflow: 'hidden',
        position: 'fixed' as const,
        backgroundColor: 'white',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 30,
      }
    } else {
      return {
        aspectRatio: aspectRatio.value,
        overflow: 'hidden',
        width: `${actualContainerWidth / scale}px`,
        transform: `translate(-50%, -50%) scale(${scale}) translate(50%, 50%)`,
      }
    }
  }
})

const preview = ref<HTMLElement | null>(null)
provide('adaptedExerciseBackdropCovers', preview)
</script>

<template>
  <div ref="container" class="overflow-hidden" style="border: 1px solid black" :style="containerStyle">
    <div ref="preview" :style=previewStyle>
      <PageletsNavigationControls :pageletsCount="pageletsCount" v-model="pageletIndex">
        <ExerciseComponent
          ref="exerciseComponent"
          :projectId="props.projectId"
          :exerciseId="props.exerciseId"
          :exercise
          :pageletIndex
          :isPreview="true"
        />
      </PageletsNavigationControls>

      <div v-if="fullScreen" style="position: relative;">
        <div style="position: absolute; left: 50%; transform: translate(-50%, 0); bottom: 1rem; z-index: 40;">
          <BButton secondary sm @click="hide">{{ $t('exitFullScreen') }}</BButton>
        </div>
      </div>
    </div>
  </div>
  <p style="margin-top: 1rem">
    Page {{ pageletIndex + 1 }} / {{ pageletsCount }}
    <BButton
      data-cy="erase-responses"
      secondary sm
      @click="exerciseComponent?.reinitModels"
      :disabled="exerciseComponent?.disabledReinitModels"
    >
      {{ $t('eraseAnswers') }}
    </BButton>
    <BButton secondary sm @click="show">{{ $t('fullScreen') }}</BButton>
  </p>
</template>
