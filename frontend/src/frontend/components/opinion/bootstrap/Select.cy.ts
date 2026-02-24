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

import { BSelect } from '.'


describe('BSelect', () => {
  beforeEach(() => {
    cy.viewport(250, 150)
  })

  it('renders properly', () => {
    cy.mount(
      BSelect, 
      {
        props:{
          options: [
            {value: 'en', label: '🇺🇸 English'},
            {value: 'fr', label: '🇫🇷 Français'},
            {value: 'jp', label: '🇯🇵 日本語'},
          ],
        },
      },
    )

    cy.get('select').select('jp')
    cy.get('select').should('have.value', 'jp')
    cy.get('select').screenshot('jp')
  })

  it('reacts to options', () => {
    cy.mount(BSelect, {props: {options: [
      {value: '1', label: 'One'},
      {value: '2', label: 'Two'},
    ]}})

    cy.get('option').should('have.length', 2)

    cy.vue().then((w) => w.setProps({options: [
      {value: '1', label: 'One'},
      {value: '2', label: 'Two'},
      {value: '3', label: 'Three'},
    ]}))

    cy.get('option').should('have.length', 3)
  })

  it('supports string options', () => {
    cy.mount(BSelect, {props: {options: ['One', 'Two']}})

    cy.get('option').should('have.length', 2)
    cy.get('option').eq(0).should('have.value', 'One')
    cy.get('option').eq(1).should('have.value', 'Two')
  })

  it('reacts to its model', () => {
    cy.mount(BSelect, {props: {modelValue: 'Two', options: ['One', 'Two', 'Three']}})

    cy.get('select').should('have.value', 'Two')

    cy.vue().then((w) => w.setProps({modelValue: 'Three'}))
    cy.get('select').should('have.value', 'Three')
  })

  it('sends model updates', () => {
    cy.mount(BSelect, {props: {options: ['One', 'Two', 'Three']}})

    cy.get('select').select('Three')
    cy.get('select').should('have.value', 'Three')
    // @ts-ignore// @todo Type '.emitted' or test in another way
    cy.vue().then((w) => w.emitted('update:modelValue')[0]).should('deep.eq', ['Three'])

    cy.get('select').select('Two')
    cy.get('select').should('have.value', 'Two')
    // @ts-ignore// @todo Type '.emitted' or test in another way
    cy.vue().then((w) => w.emitted('update:modelValue')[1]).should('deep.eq', ['Two'])
  })
})
