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

import { visit, login, loadFixtures } from './utils'


describe('Gabby', () => {
  before(console.clear)

  beforeEach(() => {
    loadFixtures('empty-project')
    login()
  })

  it('lands', () => {
    visit('/project-xkopqm')

    cy.get('h1:contains("Test project")').should('exist')
    cy.title().should('eq', 'MALIN - Test project')
    cy.get('p:contains("This is a test project, created empty in a fixture.")').should('exist')
    cy.get('.navbar').should('contain', 'Test project')
    cy.get('h2:contains("New textbook")').should('exist')
    cy.get('h2:contains("New independent exercise")').should('exist')
    cy.get('h2:contains("Existing textbooks and exercises")').should('exist')
  })

  it('edits title and description', () => {
    visit('/project-xkopqm')

    cy.get('h1:contains("Test project") button:contains("Edit")').click()
    cy.get('label:contains("Title")').first().next().clear().type('New title')
    cy.get('label:contains("Description")').next().clear().type('New description.')
    cy.get('button:contains("Save")').click()

    cy.get('h1:contains("New title")').should('exist')
    cy.title().should('eq', 'MALIN - New title')
    cy.get('p:contains("New description.")').should('exist')

    visit('/project-xkopqm')
    cy.get('h1:contains("New title")').should('exist')
    cy.title().should('eq', 'MALIN - New title')
    cy.get('p:contains("New description.")').should('exist')
  })

  it('refuses to empty title', () => {
    visit('/project-xkopqm')

    cy.get('h1:contains("Test project") button:contains("Edit")').click()
    cy.get('label:contains("Title")').first().next().clear()
    cy.get('button:contains("Save")').should('be.disabled')
  })
})
