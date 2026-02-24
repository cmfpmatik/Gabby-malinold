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
import { ref } from 'vue'

import { BModal, BButton } from './opinion/bootstrap'


const modal = ref<InstanceType<typeof BModal> | null>(null)

let resolve: ((value: boolean) => void) | null = null

async function show() {
  console.assert(modal.value !== null)
  console.assert(resolve === null)

  const promise = new Promise<boolean>(r => {
    resolve = r
  })
  modal.value.show()
  const confirmed = await promise

  resolve = null
  return confirmed
}

function confirm() {
  console.assert(modal.value !== null)
  console.assert(resolve !== null)

  modal.value.hide()
  resolve(true)
}

function cancel() {
  console.assert(modal.value !== null)
  console.assert(resolve !== null)

  modal.value.hide()
  resolve(false)
}

defineExpose({
  show,
})
</script>

<template>
  <BModal ref="modal" :close="false" backdrop="static" :keyboard="false" :fade="false">
    <template #header>
      <h1>{{ $t('confirmTitle') }}</h1>
    </template>
    <template #body>
      <slot></slot>
    </template>
    <template #footer>
      <BButton lg secondary @click="cancel">{{ $t('confirmNo') }}</BButton>
      <BButton lg primary @click="confirm">{{ $t('confirmYes') }}</BButton>
    </template>
  </BModal>
</template>
