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

import { BRow, BCol } from '$frontend/components/opinion/bootstrap'
import { useApiStore } from '$frontend/stores/api'
import RootLayout from './RootLayout.vue'
import ProjectsList from './ProjectsList.vue'
import bc from '$frontend/components/breadcrumbs'
import CreateProjectForm from './CreateProjectForm.vue'


const api = useApiStore()

const projects = computed(() => api.auto.getAll('project'))
</script>

<template>
  <RootLayout
    :title="[]" :breadcrumbs="bc.empty"
  >
    <BRow>
      <BCol>
        <h1>{{ $t('newProject') }}</h1>
        <CreateProjectForm :projects />
      </BCol>
      <BCol>
        <h1>{{ $t('existingProjects' )}}</h1>
        <ProjectsList :projects />
      </BCol>
    </BRow>
  </RootLayout>
</template>
