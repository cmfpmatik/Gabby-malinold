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
    loadFixtures('admin-user')
    login()
  })

  it('lists no projects', () => {
    visit('/')

    cy.get('p').should('contain', 'No projects')
    cy.title().should('eq', 'MALIN')
  })

  it('enables the "Create project" button', () => {
    visit('/')

    cy.get('button:contains("Create project")').should('be.disabled')

    cy.get('label:contains("Title")').next().type('Test project')

    cy.get('button:contains("Create project")').should('be.enabled')

    cy.get('label:contains("Title")').next().clear()

    cy.get('button:contains("Create project")').should('be.disabled')
  })

  it('creates a minimal project', () => {
    visit('/')

    cy.get('label:contains("Title")').next().type('Test project')
    cy.get('button:contains("Create project")').click()

    cy.get('h1:contains("Test project")').should('exist')

    visit('/')

    cy.get('li a:contains("Test project")').should('exist')
  })

  it('creates a full project', () => {
    visit('/')

    cy.get('label:contains("Title")').next().type('Test project')
    cy.get('label:contains("Description")').next().type('This is a test project')
    cy.get('button:contains("Create project")').click()

    cy.get('h1:contains("Test project")').should('exist')
    cy.get('p:contains("This is a test project")').should('exist')

    visit('/')

    cy.get('li a:contains("Test project")').should('exist')
  })
})
