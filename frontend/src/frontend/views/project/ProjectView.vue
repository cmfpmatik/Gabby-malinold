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

import PdfPreview from '$frontend/components/PdfPreview.vue'
import { BRow, BCol } from '$frontend/components/opinion/bootstrap'
import ProjectLayout from './ProjectLayout.vue'
import { useApiStore } from '$frontend/stores/api'
import bc from '$frontend/components/breadcrumbs'
import ExercisesList from './ExercisesList.vue'
import EditableProjectHeader from './EditableProjectHeader.vue'
import CreateTextbookForm from './CreateTextbookForm.vue'
import CreateIndependentExerciseForm from './CreateIndependentExerciseForm.vue'


const props = defineProps<{
  projectId: string,
}>()

const api = useApiStore()

const project = computed(() => api.auto.getOne('project', props.projectId, {include: ['textbooks', 'exercises.textbook']}))

const createTextbookForm = ref<InstanceType<typeof CreateTextbookForm> | null>(null)
</script>

<template>
  <ProjectLayout
    :project
    :title="[]" :breadcrumbs="bc.empty"
    #="{ project }"
  >
    <EditableProjectHeader :project />
    <p>{{ $t('download') }} <a :href="`/api/project-${project.id}.html?token=${api.auth.token.value}`">{{ $t('theExportedHtml') }}</a>.</p>

    <BRow>
      <BCol>
        <h2>{{ $t('newTextbook') }}</h2>
        <BRow>
          <BCol>
            <CreateTextbookForm ref="createTextbookForm" :project />
          </BCol>
          <BCol v-if="createTextbookForm !== null && createTextbookForm.pdfToPreview !== null" :w="6">
            <PdfPreview :pdf="createTextbookForm.pdfToPreview.document as any/* @todo Understand typing issue and fix it */" />
          </BCol>
        </BRow>
      </BCol>
      <BCol v-if="createTextbookForm === null || createTextbookForm.pdfToPreview === null">
        <h2>{{ $t('newIndependentExercise') }}</h2>
        <CreateIndependentExerciseForm :project />
      </BCol>
      <BCol :w="4">
        <h2>{{ $t('existingTextbooksAndExercises') }}</h2>
        <ExercisesList :project />
      </BCol>
    </BRow>
  </ProjectLayout>
</template>
