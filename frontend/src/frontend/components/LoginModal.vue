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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { BBusy, BModal, BButton, BRow, BCol, BLabeledInput } from './opinion/bootstrap'
import LanguageSelector from './opinion/LanguageSelector.vue'
import { useApiStore } from '../stores/api'


const api = useApiStore()
const i18n = useI18n()

const modal = ref<InstanceType<typeof BModal> | null>(null)

watch(
  [modal, api.auth.isAuthenticated, api.auth.expiresSoon],
  () => {
    if (modal.value !== null && (!api.auth.isAuthenticated.value || api.auth.expiresSoon.value)) {
      modal.value.show()
    }
  },
)

const username = ref('')
const password = ref('')

const busy = ref(false)
const failed = ref(false)
const lostPassword = ref(false)
const submitted = ref(false)

watch(lostPassword, () => {
  password.value = ''
  failed.value = false
  submitted.value = false
})

async function login() {
  busy.value = true
  const success = await api.auth.login(username.value, password.value)
  busy.value = false
  password.value = ''
  failed.value = !success

  console.assert(modal.value !== null)
  if (success) {
    modal.value.hide()
  }
}

async function sendRecoveryMail() {
  busy.value = true
  await api.client.createOne('recoveryEmailRequest', { address: username.value, language: i18n.locale.value }, {})
  busy.value = false
  submitted.value = true
}
</script>

<template>
  <BModal ref="modal" :close="false" backdrop="static" :keyboard="false">
    <template #header>
      <div class="container-fluid">
        <BRow>
          <BCol>
            <h1>{{ $t(lostPassword ? 'lostPasswordTitle' : 'pleaseLogin') }}</h1>
          </BCol>
          <BCol :w="3">
            <LanguageSelector />
          </BCol>
        </BRow>
      </div>
    </template>
    <template #body>
      <template  v-if="lostPassword">
        <BBusy :busy>
          <BLabeledInput :label="$t('lostPasswordEmailAddress')" name="username" v-model="username" />
        </BBusy>
      </template>
      <template v-else>
        <p class="alert alert-secondary">{{ $t('demoCredentials') }} "demo@gabby.vincent-jacques.net" / "demo".</p>
        <BBusy :busy>
          <BLabeledInput :label="$t('emailAddress')" name="username" v-model="username" />
          <BLabeledInput :label="$t('password')" name="password" type="password" v-model="password" />
        </BBusy>
        <a href="#" @click.prevent="lostPassword = true">{{ $t('lostPasswordQuestion') }}</a>
      </template>
    </template>
    <template #footer>
      <template  v-if="lostPassword">
        <p v-if="submitted" class="text-success">{{ $t('recoveryMailSubmitted') }}</p>
        <BButton secondary @click="lostPassword = false">{{ $t('backFromLostPassword') }}</BButton>
        <BButton primary @click="sendRecoveryMail" :disabled="busy || username === ''">{{ $t('sendRecoveryMail') }}</BButton>
      </template>
      <template v-else>
        <p v-if="failed" class="text-danger">{{ $t('loginFailed') }}</p>
        <BButton primary @click="login" :disabled="busy || username === '' || password === ''">{{ $t('loginButton') }}</BButton>
      </template>
    </template>
  </BModal>
</template>
