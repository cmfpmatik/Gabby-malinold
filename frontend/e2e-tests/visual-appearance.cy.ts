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

import { loadFixtures, login, loadPdf, visit } from './utils'


function test(path: string, title: string, f = () => {}, it_: Mocha.ExclusiveTestFunction = it) {
  it_(`${title} looks like this`, () => {
    visit(path, {locale: 'fr'})
    f()
    cy.screenshot(title)
  })
}

test['only'] = (path: string, title: string, f = () => {}) => test(path, title, f, it['only'])

const loadTestPdf = () => loadPdf('test')

describe('Gabby', () => {
  before(() => {
    console.clear()
    loadFixtures('more-test-exercises', 'empty-project')
  })

  beforeEach(() => {
    cy.viewport(1600, 1200)
    login()
  })

  test('/', 'home')

  test('/project-xkopqm', 'project-with-textbook')
  test('/project-fryrbl', 'project-with-independent-exercises')
  test('/project-ztmcex', 'empty-project')
  test('/project-xkopqm', 'edit-project', () => cy.get('button:contains("Modifier")').click())

  test('/project-xkopqm/textbook-klxufv/page-6', 'list-exercises-without-pdf')
  test('/project-xkopqm/textbook-klxufv/page-6', 'list-exercises', loadTestPdf)
  test('/project-xkopqm/textbook-klxufv/page-6/new-exercise', 'create-exercise', loadTestPdf)
  test('/project-xkopqm/textbook-klxufv/page-6/exercise-wbqloc', 'edit-exercise', loadTestPdf)

  test('/project-nope', 'project-not-found')
  test('/project-xkopqm/textbook-nope/page-1', 'textbook-not-found')
  test('/project-xkopqm/textbook-klxufv/page-6/exercise-nope', 'exercise-not-found')
})
