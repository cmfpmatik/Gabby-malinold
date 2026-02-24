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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import bc from '$frontend/components/breadcrumbs'
import ProjectTextbookPageLayout from './ProjectTextbookPageLayout.vue'
import RectanglesHighlighter, { makeBoundingRectangles } from './RectanglesHighlighter.vue'
import { useProjectTextbookPageData } from './ProjectTextbookPageLayout.vue'
import ExercisesList from './ExercisesList.vue'
import { useExerciseCreationHistoryStore } from './ExerciseCreationHistoryStore'
import { useGloballyBusyStore } from '$frontend/stores/globallyBusy'


const props = defineProps<{
  projectId: string
  textbookId: string
  page: number
}>()
const projectId = computed(() => props.projectId)
const textbookId = computed(() => props.textbookId)
const page = computed(() => props.page)
const globallyBusy = useGloballyBusyStore()

const router = useRouter()
const exerciseCreationHistory = useExerciseCreationHistoryStore()

onMounted(() => {
  exerciseCreationHistory.reset()
})

const { project, textbook, exercisesOnDisplayedPage, exercisesOnPageBeforeDisplayed } = useProjectTextbookPageData(projectId, textbookId, page, page)
globallyBusy.register('loading exercises on page', computed(() => exercisesOnDisplayedPage.value.loading))
globallyBusy.register('loading exercises on previous page', computed(() => exercisesOnPageBeforeDisplayed.value.loading))

function makeGreyRectangles(pdfSha256: string, pdfPage: number) {
  return makeBoundingRectangles(pdfSha256, pdfPage, [...exercisesOnPageBeforeDisplayed.value.existingItems, ...exercisesOnDisplayedPage.value.existingItems])
}

function changePage(page: number) {
  router.push({name: 'project-textbook-page', params: {page}})
}
</script>

<template>
  <ProjectTextbookPageLayout
    :project :textbook :page :displayedPage="page" @update:displayedPage="changePage"
    :title="[]" :breadcrumbs="bc.empty"
  >
    <template #pdfOverlay="{ pdfFile, pdf, width, height, transform }">
      <RectanglesHighlighter
        v-if="pdfFile.inCache && pdfFile.exists"
        class="img w-100" style="position: absolute; top: 0; left: 0"
        :width :height :transform
        :greyRectangles="makeGreyRectangles(pdfFile.attributes.sha256, pdf.page.pageNumber)"
        :surroundedRectangles="[]"
      />
    </template>

    <h1>{{ $t('existingExercises') }}</h1>
    <p style="margin-left: 5em">
      <RouterLink class="btn btn-primary btn-lg" :to="{name: 'project-textbook-page-new-exercise'}" data-cy="new-exercise">
        {{ $t('create') }}
      </RouterLink>
    </p>
    <ExercisesList :exercises="exercisesOnDisplayedPage" />
  </ProjectTextbookPageLayout>
</template>
