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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { BButton, BBusy } from '$frontend/components/opinion/bootstrap'
import ProjectFieldsForm from '$frontend/components/ProjectFieldsForm.vue'
import { useApiStore } from '$frontend/stores/api'
import type { List } from '$frontend/stores/api'
import { makeModel, resetModel } from '$frontend/components/ProjectFieldsForm.vue'


const props = defineProps<{
  projects: List<'project'>
}>()

const router = useRouter()
const api = useApiStore()

const fields = ref<InstanceType<typeof ProjectFieldsForm> | null>(null)

const model = reactive(makeModel())

const busy = ref(false)
async function create() {
  busy.value = true
  const project = await api.client.createOne(
    'project',
    {title: model.title, description: model.description},
    {},
  )
  busy.value = false

  resetModel(model)

  /* no await */ props.projects.refresh()

  router.push({name: 'project', params: {projectId: project.id}})
}
</script>

<template>
  <BBusy :busy>
    <ProjectFieldsForm ref="fields" v-model="model" />
    <BButton primary :disabled="fields === null || fields.saveDisabled" @click="create" data-cy="create-project">{{ $t('createProject' )}}</BButton>
  </BBusy>
</template>
