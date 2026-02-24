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
import { useApiStore } from '../stores/api'
import bc from '$frontend/components/breadcrumbs'
import RootLayout from './RootLayout.vue'


const api = useApiStore()

const undef: any/* Voluntarily untyped */ = undefined
const nul: any/* Same */ = null

const errors: [string, () => void][] = [
  ['Assert without message (not caught, by design)', () => console.assert(false)],
  ['Assert with message (not caught, by design)', () => console.assert(false, 'This is the message')],
  ['Dereference undefined', () => undef.foo],
  ['Dereference null', () => nul.foo],
  ['Unhandled rejection', () => Promise.reject('This is the reason')],
  ['Throw exception', () => { throw new Error('This is the error') }],
  ['Generate a 422 response', () => api.client.getOne('syntheticError', '422')],
  ['Generate a 404 response (not caught, by design)', () => api.client.getOne('syntheticError', '404')],
  ['Generate a 500 response', () => api.client.getOne('syntheticError', '500')],
]

const title = ['Errors']
const breadcrumbs = bc.last('Errors', '/errors')

if (window.location.search.includes('reject')) {
  Promise.reject('This is the reason')
}
</script>

<template>
  <RootLayout :title :breadcrumbs>
    <p v-for="[title, f] of errors"><button @click="f">{{ title }}</button></p>
  </RootLayout>
</template>
