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
import { useI18n } from 'vue-i18n'

import RootLayout from '../RootLayout.vue'
import bc, { type Breadcrumbs } from '$frontend/components/breadcrumbs'
import type { Project } from '$frontend/stores/api'
import { useGloballyBusyStore } from '$frontend/stores/globallyBusy'


const props = defineProps<{
  project: Project
  title: string[]
  breadcrumbs: Breadcrumbs
}>()

const i18n = useI18n()
const globallyBusy = useGloballyBusyStore()

globallyBusy.register('loading project', computed(() => props.project.loading))

const title = computed(() => {
  if (props.project.loading) {
    return []
  } else if (props.project.inCache && props.project.exists) {
    return [props.project.attributes.title, ...props.title]
  } else {
    return [i18n.t('projectNotFound')]
  }
})

const breadcrumbs = computed(() => {
  if (props.project.loading) {
    return bc.empty
  } else if (props.project.inCache && props.project.exists) {
    return bc.prepend(
      props.project.attributes.title,
      {name: 'project', params: {projectId: props.project.id}},
      props.breadcrumbs,
    )
  } else {
    return bc.last(i18n.t('projectNotFound'))
  }
})
</script>

<template>
  <RootLayout
    :title :breadcrumbs
  >
    <template v-if="project.inCache">
      <template v-if="project.exists">
        <slot :project></slot>
      </template>
      <template v-else>
        <h1>{{ i18n.t('projectNotFound') }}</h1>
      </template>
    </template>
  </RootLayout>
</template>
