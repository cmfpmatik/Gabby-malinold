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
import { useHead } from '@unhead/vue'

import AboutModal from './AboutModal.vue'
import LanguageSelector from './opinion/LanguageSelector.vue'
import { useApiStore } from '$frontend/stores/api'
import type { Breadcrumbs } from './breadcrumbs'
import bc from './breadcrumbs'
import { useGloballyBusyStore } from '$frontend/stores/globallyBusy'


const props = defineProps<{
  title: string
  breadcrumbs: Breadcrumbs
}>()

const api = useApiStore()
const globallyBusy = useGloballyBusyStore()

useHead({
  title: computed(() => props.title)  // 'useHead' does not react to props directly,
})

const breadcrumbs = computed(() => bc.normalize(props.breadcrumbs))

const about = ref<InstanceType<typeof AboutModal> | null>(null)
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand"><img src="/logo-cartable-fantastique.png" alt="Logo Cartable Fantastique" width="28" height="28"> MALIN</RouterLink>
      <span v-if="globallyBusy.reasons.length !== 0"><wbr/> ({{ globallyBusy.reasons.join(', ') }})</span>
      <nav v-else-if="breadcrumbs !== null" style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <!-- @todo Fix vertical alignment of the breadcrumbs -->
        <ol class="breadcrumb">
          <li v-for="breadcrumb in breadcrumbs.intermediate" class="breadcrumb-item">
            <RouterLink :to="breadcrumb.to">{{ breadcrumb.title }}</RouterLink>
          </li>
          <li class="breadcrumb-item active">{{ breadcrumbs.last }}</li>
        </ol>
      </nav>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a href="/doc/" class="nav-link">{{ $t('help') }}</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click.prevent="about?.show()">{{ $t('about') }}</a></li>
          <li class="nav-item"><a href="#" class="nav-link" @click.prevent="api.auth.logout">{{ $t('logoutButton') }}</a></li>
          <li><LanguageSelector class="w-auto" /></li>
        </ul>
      </div>
    </div>
  </nav>
  <AboutModal ref="about"/>
</template>
