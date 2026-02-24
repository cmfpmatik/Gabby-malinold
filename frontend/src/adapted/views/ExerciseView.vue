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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import type { Data } from '$adapted/types'
import Exercise from '$adapted/components/Exercise.vue'
import PageletsNavigationControls from '$adapted/components/PageletsNavigationControls.vue'


const props = defineProps<{
  data: Data,
  blah: string
  exerciseId: string,
  pageletIndex: number,
}>()

const router = useRouter()

const exercise = computed(() => {
  return props.data.exercises[props.exerciseId]
})

const pageletsCount = computed(() => exercise.value.pagelets.length)

const exerciseComponent = ref<InstanceType<typeof Exercise> | null>(null)

function changePagelet(newPageletIndex: number) {
  if (newPageletIndex >= 0 && newPageletIndex < pageletsCount.value) {
    router.push({name: 'exercise', params: {exerciseId: props.exerciseId, pageletIndex: newPageletIndex.toString()}})
  }
}
</script>

<template>
  <PageletsNavigationControls :pageletsCount :modelValue="pageletIndex" @update:modelValue="changePagelet">
    <Exercise
      ref="exerciseComponent"
      :projectId="data.projectId"
      :exerciseId
      :exercise
      :pageletIndex
    />
  </PageletsNavigationControls>
</template>
