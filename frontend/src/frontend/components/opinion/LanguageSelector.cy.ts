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

import LanguageSelector from './LanguageSelector.vue'
import { i18n } from '$/locales'


describe('LanguageSelector', () => {
  it('changes locale', () => {
    cy.mount(LanguageSelector)
    cy.get('select[data-cy="language"]').should('have.value', 'en')
    cy.wrap(i18n).then(p => (p as any/* Work around Cypress typing limitations */).global.t('opinion.ping')).should('eq', 'Ping (in English)')

    cy.get('select[data-cy="language"]').select('fr')
    cy.get('select[data-cy="language"]').should('have.value', 'fr')
    cy.wrap(i18n).then(p => (p as any/* Work around Cypress typing limitations */).global.t('opinion.ping')).should('eq', 'Ping (en français)')

    cy.get('select[data-cy="language"]').select('en')
  })
})
