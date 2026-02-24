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

import { useApiStore } from '$frontend/stores/api'
import LoginModal from '$frontend/components/LoginModal.vue'
import Navbar from '$frontend/components/Navbar.vue'
import ErrorReportingModal from '$frontend/components/ErrorReportingModal.vue'
import type { Breadcrumbs } from '$frontend/components/breadcrumbs'
import { BBusy } from '../components/opinion/bootstrap'
import bc from '$frontend/components/breadcrumbs'
import { useGloballyBusyStore } from '$frontend/stores/globallyBusy'


const props = defineProps<{
  title: string[]
  breadcrumbs: Breadcrumbs
}>()

const api = useApiStore()
const i18n = useI18n()
const globallyBusy = useGloballyBusyStore()

const unavailableUntil = (() => {
  const envVar = import.meta.env.VITE_GABBY_UNAVAILABLE_UNTIL
  if (envVar === undefined) {
    return null
  } else {
    return new Date(envVar)
  }
})()

const title = computed(() => {
  return ['MALIN', ...props.title].join(' - ')
})

const breadcrumbs = computed(() => {
  return bc.prepend(i18n.t('home'), {name: 'index'}, props.breadcrumbs)
})
</script>

<template>
  <div class="vh-100 d-flex flex-column overflow-hidden">
    <Navbar :title :breadcrumbs></Navbar>
    <ErrorReportingModal />
    <template v-if="unavailableUntil">
      <div class="alert alert-danger" role="alert">
        <i18n-t keypath="siteUnavailableUntil" #date>
          {{ $d(unavailableUntil, 'long') }}
        </i18n-t>
      </div>
    </template>
    <template v-else>
      <LoginModal />
      <template v-if="api.auth.isAuthenticated.value">
        <BBusy :busy="globallyBusy.busy" size="20rem" class="h-100 flex-fill container-fluid overflow-auto" data-cy="root-container">
          <slot></slot>
        </BBusy>
      </template>
    </template>
  </div>
</template>
