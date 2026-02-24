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

import PasswordResetModal from '$frontend/components/PasswordResetModal.vue'
import Navbar from '$frontend/components/Navbar.vue'
import bc from '$frontend/components/breadcrumbs'


defineProps<{
  emailAddress: string,
  token: string,
}>()

const i18n = useI18n()

const title = computed(() => ['MALIN', i18n.t('resetPasswordTitle')].join(' - '))
const breadcrumbs = computed(() => bc.last(i18n.t('home')))
</script>

<template>
  <div class="vh-100 d-flex flex-column overflow-hidden">
    <Navbar :title :breadcrumbs></Navbar>
    <PasswordResetModal :emailAddress :token />
  </div>
</template>
