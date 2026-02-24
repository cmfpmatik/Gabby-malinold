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
import { ref, toRaw } from 'vue'
import { computedAsync } from '@vueuse/core'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'

import PdfNavigationControls from './PdfNavigationControls.vue'
import PdfRenderer from './PdfRenderer.vue'


const props = defineProps<{
  pdf: PDFDocumentProxy,
}>()

const pageNumber = ref(1)

const page = computedAsync(
  async () => {
    return await toRaw(props.pdf).getPage(pageNumber.value)
  },
  null,
)
</script>

<template>
  <PdfNavigationControls :pagesCount="pdf.numPages" v-model:page="pageNumber" :disabled="false" />
  <template v-if="page">
    <PdfRenderer
      class="img img-fluid"
      style="border: 1px solid black"
      :page="page"
    />
  </template>
</template>
