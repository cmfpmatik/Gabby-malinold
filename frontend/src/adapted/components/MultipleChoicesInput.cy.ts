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

import MultipleChoicesInput from './MultipleChoicesInput.vue'


describe('MultipleChoicesInput', () => {
  before(console.clear)

  it('closes without value when clicking the backdrop', () => {
    let value: number | undefined = undefined

    cy.mount(MultipleChoicesInput, {props: {
      showArrowBefore: false,
      choices: [[{kind: 'text', text: 'alpha'}], [{kind: 'text', text: 'beta'}]],
      placeholder: '....',
      showChoicesByDefault: false,
      modelValue: value,
      'onUpdate:modelValue': (v: number | undefined) => {
        value = v
        Cypress.vueWrapper.setProps({ modelValue: v })
      }
    }})

    cy.get('div.backdrop').should('not.exist')
    cy.get('span.main').should('have.text', '....').click()
    cy.get('div.backdrop').should('exist').click()
    cy.get('span.main').should('have.text', '....')
    cy.wait(0).then(() => expect(value).to.be.undefined)
  })

  it('closes with a value when clicking a value', () => {
    let value: number | undefined = undefined

    cy.mount(MultipleChoicesInput, {props: {
      showArrowBefore: false,
      choices: [[{kind: 'text', text: 'alpha'}], [{kind: 'text', text: 'beta'}]],
      placeholder: '....',
      showChoicesByDefault: false,
      modelValue: value,
      'onUpdate:modelValue': (v: number | undefined) => {
        value = v
        Cypress.vueWrapper.setProps({ modelValue: v })
      }
    }})

    cy.get('span.choice0').should('not.exist')
    cy.get('span.main').should('have.text', '....').click()
    cy.get('span.choice0').should('exist').click()
    cy.get('span.main').should('have.text', 'alpha')
    cy.wait(0).then(() => expect(value).to.equal(0))
  })

  it('closes without value when clicking the main span', () => {
    let value: number | undefined = undefined

    cy.mount(MultipleChoicesInput, {props: {
      showArrowBefore: false,
      choices: [[{kind: 'text', text: 'alpha'}], [{kind: 'text', text: 'beta'}]],
      placeholder: '....',
      showChoicesByDefault: true,
      modelValue: value,
      'onUpdate:modelValue': (v: number | undefined) => {
        value = v
        Cypress.vueWrapper.setProps({ modelValue: v })
      }
    }})

    cy.get('div.backdrop').should('not.exist')
    cy.get('span.choice0').should('exist')
    cy.get('span.main').click()
    cy.get('span.main').should('have.text', '....')
    cy.get('span.choice0').should('not.exist')
    cy.wait(0).then(() => expect(value).to.be.undefined)
  })

  it('shows up again with a backdrop after selecting a value', () => {
    let value: number | undefined = undefined

    cy.mount(MultipleChoicesInput, {props: {
      showArrowBefore: false,
      choices: [[{kind: 'text', text: 'alpha'}], [{kind: 'text', text: 'beta'}]],
      placeholder: '....',
      showChoicesByDefault: false,
      modelValue: value,
      'onUpdate:modelValue': (v: number | undefined) => {
        value = v
        Cypress.vueWrapper.setProps({ modelValue: v })
      }
    }})

    cy.get('span.main').should('have.text', '....').click()
    cy.get('span.choice0').should('exist').click().should('not.exist')
    cy.get('span.main').should('have.text', 'alpha').click()
    cy.get('div.backdrop').should('exist')
    cy.get('span.choice0').should('exist')
    cy.get('span.choice1').should('exist').click().should('not.exist')
    cy.get('span.main').should('have.text', 'beta')
  })

  it('shows up again without backdrop after selecting a value', () => {
    let value: number | undefined = undefined

    cy.mount(MultipleChoicesInput, {props: {
      showArrowBefore: false,
      choices: [[{kind: 'text', text: 'alpha'}], [{kind: 'text', text: 'beta'}]],
      placeholder: '....',
      showChoicesByDefault: true,
      modelValue: value,
      'onUpdate:modelValue': (v: number | undefined) => {
        value = v
        Cypress.vueWrapper.setProps({ modelValue: v })
      }
    }})

    cy.get('span.choice0').click().should('not.exist')
    cy.get('span.main').should('have.text', 'alpha').click()
    cy.get('div.backdrop').should('not.exist')
    cy.get('span.choice0').should('exist')
    cy.get('span.choice1').should('exist').click().should('not.exist')
    cy.get('span.main').should('have.text', 'beta')
  })
})
