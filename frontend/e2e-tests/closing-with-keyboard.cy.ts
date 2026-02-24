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

import { loadFixtures, login, visit, selectRange, pressEscape, pressEnter } from './utils'


describe('Gabby', () => {
  before(console.clear)

  beforeEach(() => {
    loadFixtures('more-test-exercises')
    login()
    cy.viewport(1000, 1000)
  })

  it('closes the QCM settings dialog for an existing exercise with escape', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7/exercise-xnyegk')

    cy.get('label:contains("Start")').should('not.exist')

    cy.get('choices2-blot').rightclick()

    cy.get('label:contains("Start")').should('exist')

    pressEscape()

    cy.get('label:contains("Start")').should('not.exist')
  })

  it('closes the QCM settings dialog for an existing exercise with enter', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7/exercise-xnyegk')

    cy.get('label:contains("Start")').should('not.exist')

    cy.get('choices2-blot').rightclick()

    cy.get('label:contains("Start")').should('exist')

    pressEnter()

    cy.get('label:contains("Start")').should('not.exist')
  })

  it('closes the QCM settings dialog for a new exercise', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7/new-exercise')

    cy.get('label:contains("Instructions") + .ql-container > .ql-editor').as('instructions')

    cy.get('@instructions').click().type('{selectAll}alpha/bravo/charlie', {delay: 0})

    cy.get('button:contains("Multiple choices")').click()
    cy.get('label:contains("Start")').should('not.exist')
    cy.get('@instructions').find('p').then($el => {
      const node = $el[0].firstChild
      console.assert(node !== null)
      selectRange(node, 0, node, 19)
    })

    cy.get('label:contains("Start")').should('exist')

    pressEscape()

    cy.get('label:contains("Start")').should('not.exist')
  })

  it('closes the fullscreen preview without closing the MCQ settings dialog', () => {
    visit('/project-xkopqm/textbook-klxufv/page-7/new-exercise')

    cy.get('label:contains("Instructions") + .ql-container > .ql-editor').as('instructions')
    cy.get('label:contains("Wording") + .ql-container > .ql-editor').as('wording')

    cy.get('@instructions').click().type('{selectAll}alpha/bravo/charlie', {delay: 0})
    cy.get('@wording').click().type('{selectAll}QCM: @@@.', {delay: 0})

    cy.get('button:contains("Multiple choices")').click()
    cy.get('@instructions').find('p').then($el => {
      const node = $el[0].firstChild
      console.assert(node !== null)
      selectRange(node, 0, node, 19)
    })
    cy.get('label:contains("Placeholder to fill") + input').click().type('@@@')

    cy.get('button:contains("Full screen")').click()
    cy.get('button:contains("Exit full screen")').should('exist')
    pressEscape()
    cy.get('button:contains("Exit full screen")').should('not.exist')

    cy.get('label:contains("Start")').should('exist')
    pressEnter()

    cy.get('button:contains("Full screen")').click()
    cy.get('button:contains("Exit full screen")').should('exist')
    cy.get('span.choice0').should('not.exist')
    cy.get('span.main').click()
    cy.get('span.choice0').should('exist')
    pressEscape()
    cy.get('button:contains("Exit full screen")').should('not.exist')
    cy.get('span.choice0').should('exist')
  })
})
