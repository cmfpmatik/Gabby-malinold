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

import { createI18n } from 'vue-i18n'

import opinionEn from './opinion/en.json'
import opinionFr from './opinion/fr.json'
import appEn from './en.json'
import appFr from './fr.json'


const defaultLocale = import.meta.env.VITE_OPINION_APP_DEFAULT_LOCALE ?? 'en'

const long = {
  year: 'numeric', month: 'long', day: 'numeric',
  weekday: 'long', hour: 'numeric', minute: 'numeric',
  timeZoneName: 'short',
}

export const i18n = (createI18n as any/* @todo Type */)({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  datetimeFormats: {
    en: {
      long,
    },
    fr: {
      long,
    },
  },
  messages: {
    en: {
      ...appEn,
      opinion: opinionEn,
    },
    fr: {
      ...appFr,
      opinion: opinionFr,
    },
  },
})
