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
import { ref, reactive } from 'vue'

import ProjectFieldsForm from '$frontend/components/ProjectFieldsForm.vue'
import { BButton, BBusy } from '$frontend/components/opinion/bootstrap'
import type { Project, InCache, Exists } from '$frontend/stores/api'
import type { Model } from '$frontend/components/ProjectFieldsForm.vue'
import { makeModel, assignModelFrom } from '$frontend/components/ProjectFieldsForm.vue'


const props = defineProps<{
  project: Project & InCache & Exists,
}>()

const fields = ref<InstanceType<typeof ProjectFieldsForm> | null>(null)

  
const editing = ref(false)
const model: Model = reactive(makeModel())

function start() {
  editing.value = true
  assignModelFrom(model, props.project)
}

function cancel() {
  editing.value = false
}

const busy = ref(false)
async function save() {
  busy.value = true
  await props.project.patch({title: model.title, description: model.description}, {})
  busy.value = false
  editing.value = false
}
</script>

<template>
  <template v-if="editing">
    <h1>{{ $t('project') }}</h1>
    <BBusy :busy>
      <ProjectFieldsForm ref="fields" v-model="model" />
      <BButton secondary @click="cancel">{{ $t('cancel') }}</BButton>
      <BButton primary @click="save" :disabled="fields === null || fields.saveDisabled">{{ $t('saveProject') }}</BButton>
    </BBusy>
  </template>
  <template v-else>
    <h1>{{ $t('projectHeader', {title: project.attributes?.title}) }} <BButton sm secondary @click="start">{{ $t('edit') }}</BButton></h1>
    <p>{{ project.attributes?.description }}</p>
  </template>
</template>
