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


describe('Gabby has routes that', () => {
  before(() => {
    console.clear
    loadFixtures('test-exercises')
  })

  beforeEach(() => {
    login()
  })

  it('can access the default Vue Router view', () => {
    visit('/')
    cy.contains('h1', 'Existing projects')
  })

  it('can access a Vue Router view without trailing /', () => {
    visit('/project-xkopqm/textbook-klxufv/page-6')
    cy.contains('h1', 'Existing exercises')
  })

  it('can access a Vue Router view with trailing /', () => {
    visit('/project-xkopqm/textbook-klxufv/page-6/')
    cy.contains('h1', 'Existing exercises')
  })

  it('can access Vue statics', () => {
    cy.request('/logo-cartable-fantastique.png').then(response => {
      expect(response.headers['content-type']).to.equal('image/png')
    })
  })

  it('can access its documentation as path to index file', () => {
    cy.visit('/doc/index.html')
    cy.contains('h1', 'Documentation de MALIN')
  })

  it('can access its documentation as path to directory with trailing /', () => {
    cy.visit('/doc/')
    cy.contains('h1', 'Documentation de MALIN')
  })

  it('can access its documentation as path to directory without trailing /', () => {
    cy.visit('/doc')
    cy.contains('h1', 'Documentation de MALIN')
  })

  it('can access API docs without trailing /', () => {
    cy.visit('/api/docs')
    cy.contains('h2', 'FastAPI')
  })

  it('can access API docs with trailing /', () => {
    cy.visit('/api/docs/')
    cy.contains('h2', 'FastAPI')
  })

  it('can assess Adminer without trailing /', () => {
    cy.visit('/api/adminer')
    cy.contains('h1', 'Adminer')
  })

  it('can assess Adminer with trailing /', () => {
    cy.visit('/api/adminer/')
    cy.contains('h1', 'Adminer')
  })
})
