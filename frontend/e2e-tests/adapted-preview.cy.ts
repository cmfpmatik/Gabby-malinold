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

import { loadFixtures, login, notBusy, visit } from './utils'

describe('Gabby', () => {
  before(console.clear)

  beforeEach(() => {
    loadFixtures('more-test-exercises')
    login()
    cy.viewport(1000, 1000)
  })

  it('resets responses when changing adaptation type', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7/exercise-dymwin')
    cy.get('label:contains("Number")').next().should('have.value', '11')

    cy.get('span[contenteditable]').first().type('Abcd')

    cy.get('label:contains("Adaptation type")').next().select('generic')
    cy.get('div:contains("Words") >input').check()
    cy.get('div:contains("Selectable") >input').check()
    notBusy()

    cy.get('span:contains("tracter")').first().click()
    cy.get('span:contains("tracter")').first().should('have.css', 'background-color', 'rgb(255, 255, 0)')

    cy.get('label:contains("Adaptation type")').next().select('fill-with-free-text')
    notBusy()

    cy.get('span[contenteditable]').first().should('have.value', '')

    cy.get('label:contains("Adaptation type")').next().select('generic')
    cy.get('div:contains("Selectable") >input').check()
    notBusy()

    cy.get('span:contains("tracter")').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  })
})
