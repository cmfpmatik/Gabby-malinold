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


describe('Not found message', () => {
  before(() => {
    console.clear()
    loadFixtures('more-test-exercises')
  })

  beforeEach(() => {
    login()
  })

  it('on the project view when the project does not exist', () => {
    visit('/project-nope')

    cy.get('h1:contains("Project not found")').should('exist')
    cy.title().should('eq', 'MALIN - Project not found')
  })

  it('on the textbook page view when the project does not exist', () => {
    visit('/project-nope/textbook-klxufv/page-6')

    cy.get('h1:contains("Project not found")').should('exist')
    cy.title().should('eq', 'MALIN - Project not found')
  })

  it('on the textbook page view when the textbook does not exist', () => {
    visit('/project-xkopqm/textbook-nope/page-6')

    cy.get('h1:contains("Textbook not found")').should('exist')
    cy.title().should('eq', 'MALIN - Premier projet de test - Textbook not found')
  })

  it('on the textbook page view when the textbook does not belong to this project', () => {
    visit('/project-fryrbl/textbook-klxufv/page-6')

    cy.get('h1:contains("Textbook not found")').should('exist')
    cy.title().should('eq', 'MALIN - Deuxième projet de test - Textbook not found')
  })

  it('on the exercise creation view when the project does not exist', () => {
    visit('/project-nope/textbook-klxufv/page-6/new-exercise')

    cy.get('h1:contains("Project not found")').should('exist')
    cy.title().should('eq', 'MALIN - Project not found')
  })

  it('on the exercise creation view when the textbook does not exist', () => {
    visit('/project-xkopqm/textbook-nope/page-6/new-exercise')

    cy.get('h1:contains("Textbook not found")').should('exist')
    cy.title().should('eq', 'MALIN - Premier projet de test - Textbook not found')
  })

  it('on the exercise creation view when the textbook does not belong to this project', () => {
    visit('/project-fryrbl/textbook-klxufv/page-6/new-exercise')

    cy.get('h1:contains("Textbook not found")').should('exist')
    cy.title().should('eq', 'MALIN - Deuxième projet de test - Textbook not found')
  })
})
