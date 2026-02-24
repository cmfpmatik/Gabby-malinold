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

import type { List, Exercise } from '$frontend/stores/api'
import { BBusy, BButton } from '$frontend/components/opinion/bootstrap'
import ConfirmationModal from '$frontend/components/ConfirmationModal.vue'
import type { Model as Deltas } from '$frontend/components/Quill.vue'


const props = defineProps<{
  exercises: List<'exercise'>
}>()

function ellipsis(deltas: Deltas) {
  const s = deltas.map(delta => typeof delta.insert === 'string' ? delta.insert : '').join('')
  return s.length > 25 ? s.slice(0, 25) + '…' : s
}

const exerciseDeletionConfirmationModal = ref<InstanceType<typeof ConfirmationModal> | null>(null)
async function delete_(exercise: Exercise) {
  console.assert(exerciseDeletionConfirmationModal.value !== null)
  if (await exerciseDeletionConfirmationModal.value.show()) {
    await exercise.delete()
    await props.exercises.refresh()
  }
}
</script>

<template>
  <ConfirmationModal ref="exerciseDeletionConfirmationModal">{{ $t('exerciseDeletionConfirmationMessage') }}</ConfirmationModal>
  <BBusy :busy="exercises.loading">
    <ul v-if="exercises.existingItems.length">
      <template v-for="exercise in exercises.existingItems">
        <li>
          <BBusy :busy="exercise.busy">
            <strong>{{ exercise.attributes.number }}</strong>
            {{ ellipsis(exercise.attributes.instructions) }}
            <em>{{ exercise.attributes.adaptation.kind !== 'generic' ? $t(exercise.attributes.adaptation.kind) : '' }}</em>
            <RouterLink class="btn btn-primary btn-sm" :to="{name: 'project-textbook-page-exercise', params: {exerciseId: exercise.id}}">{{ $t('edit') }}</RouterLink>
            <BButton secondary sm @click="delete_(exercise)">{{ $t('delete') }}</BButton>
          </BBusy>
        </li>
      </template>
    </ul>
    <p v-else>{{ $t('noExercises') }}</p>
  </BBusy>
</template>
