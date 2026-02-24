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
import { ref, computed, type Ref } from 'vue'

import { BBusy, BLabeledNumberInput, BButton, BRow, BCol, BModal } from '$frontend/components/opinion/bootstrap'
import { useApiStore } from '$frontend/stores/api'


const sectionId = ref<string | null>(null)

const labelId = `modal-${ Math.floor(Math.random() * 4000000000) }`

const api = useApiStore()

const pdfFileFirstPage = ref(0)
const pdfFileLastPage = ref(0)
const textbookFirstPage = ref(0)
const textbookLastPage = computed(() => textbookFirstPage.value + pdfFileLastPage.value - pdfFileFirstPage.value)

const disabled = computed(() => {
  function isValid(n: Ref<number>) {
    return Number.isInteger(n.value) && n.value >= 1
  }
  return (
    !isValid(pdfFileFirstPage)
    || !isValid(pdfFileLastPage)
    || !isValid(textbookFirstPage)
    || !isValid(textbookLastPage)
    || pdfFileFirstPage.value > pdfFileLastPage.value
  )
})

const modal = ref<InstanceType<typeof BModal> | null>(null)
const saving = ref(false)
async function save() {
  console.assert(sectionId.value !== null)

  try {
    saving.value = true
    await api.cache.getOne('section', sectionId.value).patch(
      {
        pdfFileStartPage: pdfFileFirstPage.value,
        textbookStartPage: textbookFirstPage.value,
        pagesCount: pdfFileLastPage.value - pdfFileFirstPage.value + 1,
      },
      {},
    )
  } finally {
    saving.value = false
  }
}

function show(id: string) {
  console.assert(modal.value !== null)

  sectionId.value = id
  const section = api.cache.getOne('section', id)
  console.assert(section.inCache && section.exists)

  pdfFileFirstPage.value = section.attributes.pdfFileStartPage
  pdfFileLastPage.value = section.attributes.pdfFileStartPage + section.attributes.pagesCount - 1
  textbookFirstPage.value = section.attributes.textbookStartPage
  modal.value.show()
}

function hide() {
  console.assert(modal.value !== null)

  modal.value.hide()
}

const active = computed(() => modal.value?.active)

defineExpose({
  show,
  hide,
  active,
})
</script>

<template>
  <BModal ref="modal" :aria-labelledby="labelId">
    <template #header>
      <h1 class="modal-title" :id="labelId">Lien entre PDF et manuel</h1>
    </template>
    <template #body>
      <BBusy :busy="saving">
        <BRow>
          <BCol>
            <BLabeledNumberInput label="Début dans le PDF" v-model="pdfFileFirstPage" min="1" />
          </BCol>
          <BCol>
            <BLabeledNumberInput label="Fin dans le PDF" v-model="pdfFileLastPage" min="1" />
          </BCol>
        </BRow>
        <BRow>
          <BCol>
            <BLabeledNumberInput label="Début dans le manuel" v-model="textbookFirstPage" min="1" />
          </BCol>
          <BCol>
            <BLabeledNumberInput label="Fin dans le manuel" v-model="textbookLastPage" min="1" disabled />
          </BCol>
        </BRow>
        <hr>
        <p>
          Les pages {{ pdfFileFirstPage }} à {{ pdfFileLastPage }} du PDF
          correspondent aux pages {{ textbookFirstPage }} à {{ textbookLastPage }} du manuel.
        </p>
      </BBusy>
    </template>
    <template #footer>
      <BBusy :busy="saving">
        <BButton secondary @click="hide" :disabled="!active">Annuler</BButton>
        <BButton primary @click="save().then(hide)" :disabled="!active || disabled">Enregistrer</BButton>
      </BBusy>
    </template>
  </BModal>
</template>
