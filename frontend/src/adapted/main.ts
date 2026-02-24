// MALIN Platform https://malin.cahiersfantastiques.fr/
// Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'

import { i18n } from '$/locales'
import ExerciseView from './views/ExerciseView.vue'
import IndexView from './views/IndexView.vue'
import type { Data } from './types'


const data = JSON.parse('{{ data }}') as Data

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      props: () => ({ data }),
    },
    {
      path: '/exercise-:exerciseId/:pageletIndex',
      name: 'exercise',
      component: ExerciseView,
      props: (route) => {
        console.assert(typeof(route.params.pageletIndex) === 'string')
        return {
          data,
          exerciseId: route.params.exerciseId,
          pageletIndex: Number.parseInt(route.params.pageletIndex, 10),
        }
      },
    },
  ],
})

createApp(RouterView)
  .use(i18n)
  .use(router)
  .mount('#app')
