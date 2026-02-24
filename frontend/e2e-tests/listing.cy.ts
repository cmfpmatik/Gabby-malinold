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

import { visit, login, loadFixtures, notBusy } from './utils'


describe('Gabby', () => {
  before(console.clear)

  beforeEach(() => {
    loadFixtures('test-exercises')
    login()
  })

  it('lists textbooks and exercises on project page', () => {
    visit('/project-xkopqm')

    cy.get('h3:contains("Français CE2, Slabeuf (2021)")').should('exist')
    cy.get('a:contains("Français CE2")').should('exist')
    cy.get('li a:contains("Page 6")').should('exist')
    cy.get('li:contains("Page 6") ul li:contains("3 Complète avec : le, une, …")').should('exist')
    cy.get('li:contains("Page 6") ul li:contains("4 Écris une phrase en respe…")').should('exist')
    cy.get('li a:contains("Page 7")').should('exist')
    cy.get('li:contains("Page 7") ul li:contains("9 Recopie l’intrus qui se c…")').should('exist')
  })

  it('lists independent exercises on project page', () => {
    visit('/project-fryrbl')

    cy.get('li:contains("L1 Faire des choses intellig…")').should('exist')
    cy.get('li:contains("L2 Faire d\'autres choses int…")').should('exist')
    cy.get('li:contains("L3 Prendre le temps de faire…")').should('exist')
  })

  it('lists exercises on textbook page', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7')

    cy.get('button:contains("Delete")').click()
    cy.get('button:contains("Confirm")').click()
    notBusy()
    cy.get('p:contains("No exercises yet.")').should('exist')

    visit('/project-xkopqm/textbook-klxufv/page-7')
    notBusy()
    cy.get('p:contains("No exercises yet.")').should('exist')

    cy.get('button:contains("<")').click()
    cy.get('li:contains("3 Complète avec : le, une, …")').should('exist')
    cy.get('li:contains("4 Écris une phrase en respe…")').should('exist')
  })
})
