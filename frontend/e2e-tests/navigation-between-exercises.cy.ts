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

import { loadFixtures, login, visit } from './utils'


describe('Gabby\'s new exercise view', () => {
  before(console.clear)

  beforeEach(() => {
    loadFixtures('more-test-exercises')
    login()
  })

  it('navigates using "Save then next" and "Previous" buttons', () => {
    visit('/project-xkopqm/textbook-klxufv/page-1/new-exercise')

    cy.get('label:contains("Number")').next().type('1')

    cy.get('button:contains("Previous (without saving)")').should('be.disabled')

    cy.get('button:contains("Save then next")').click()

    cy.get('label:contains("Number")').next().should('have.value', '2')
    cy.get('button:contains("Previous (without saving)")').should('be.enabled')
    cy.get('button:contains("Save then next")').click()

    cy.get('label:contains("Number")').next().should('have.value', '3')

    cy.get('button:contains("Previous (without saving)")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/exercise-fxcuac')
    cy.get('label:contains("Number")').next().should('have.value', '2')

    cy.get('button:contains("Save then next")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/new-exercise')
    cy.get('label:contains("Number")').next().should('have.value', '3')

    cy.get('button:contains("Previous (without saving)")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/exercise-fxcuac')
    cy.get('label:contains("Number")').next().should('have.value', '2')

    cy.get('button:contains("Previous (without saving)")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/exercise-pghtfo')
    cy.get('label:contains("Number")').next().should('have.value', '1')

    cy.get('button:contains("Save then next")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/exercise-fxcuac')
    cy.get('label:contains("Number")').next().should('have.value', '2')

    cy.get('button:contains("Save then next")').click()

    cy.location('pathname').should('equal', '/project-xkopqm/textbook-klxufv/page-1/new-exercise')
    cy.get('label:contains("Number")').next().should('have.value', '3')
  })

  it('resets history when going back to list', () => {
    visit('/project-xkopqm/textbook-klxufv/page-1/new-exercise')

    cy.get('label:contains("Number")').next().type('1')

    cy.get('button:contains("Save then next")').click()

    cy.get('label:contains("Number")').next().should('have.value', '2')
    cy.get('button:contains("Previous (without saving)")').should('be.enabled')

    cy.get('a:contains("Back to list (without saving)")').click()

    cy.get('a:contains("New exercise")').click()

    cy.get('label:contains("Number")').next().should('have.value', '')
    cy.get('button:contains("Previous (without saving)")').should('be.disabled')
  })
})
