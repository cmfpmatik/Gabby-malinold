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
import Pinger from '$frontend/components/opinion/Pinger.vue'
import { BBusy, BRow, BCol } from '$frontend/components/opinion/bootstrap'
import { useApiStore } from './api'


const api = useApiStore()

const pings = api.auto.getAll('ping')
</script>

<template>
  <b-row>
    <b-col>
      <pinger />
    </b-col>
    <b-col>
      <pinger />
    </b-col>
  </b-row>
  <b-busy :busy="pings.loading">
    <ul v-if="pings.allItems.length">
      <li v-for="ping in pings.allItems" :key="ping.id">
        <template v-if="ping.exists">
          {{ ping.id }} - {{ ping.attributes.createdAt }}<span v-if="ping.attributes.message">: {{ ping.attributes.message }}</span>
          <template v-if="ping.relationships.prev">Prev: {{ ping.relationships.prev.id }}</template>
          <template v-if="ping.relationships.next.length">Next:<template v-for="next in ping.relationships.next">&nbsp;{{ next.id }}</template></template>
        </template>
        <template v-else>
          {{ ping.id }} - Deleted
        </template>
      </li>
    </ul>
    <p v-else>{{ $t('opinion.noPings') }}</p>
  </b-busy>
</template>
