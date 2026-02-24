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

import { type Model } from './Quill.vue'
import WysiwygEditor from './WysiwygEditor.vue'

describe('WysiwygEditor', () => {
  before(console.clear)

  it("updates its model", () => {
    let modelValue: Model = [{insert: 'hell\n\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
    }})
    cy.get('div.ql-editor').type('o').then(() => {
      expect(modelValue).to.deep.equal([{insert: 'hell\no\n', attributes: {}}])
    })
  })

  it("adds characters before the trailing line end when typing at the end", () => {
    let modelValue: Model = [{insert: 'hell\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
    }})
    cy.get('div.ql-editor').type('o')
    cy.wait(0).then(() => {
      expect(modelValue).to.deep.equal([{insert: 'hello\n', attributes: {}}])
    })
  })

  it("add characters at the start when typing at the start", () => {
    let modelValue: Model = [{insert: 'ello\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
    }})
    cy.get('div.ql-editor').type('{moveToStart}h').then(() => {
      expect(modelValue).to.deep.equal([{insert: 'hello\n', attributes: {}}])
    })
  })

  it("keeps a freshly-added trailing line end", () => {
    let modelValue: Model = [{insert: 'hello\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
    }})
    cy.get('div.ql-editor').type('\n').then(() => {
      expect(modelValue).to.deep.equal([{insert: 'hello\n\n', attributes: {}}])
    })
  })

  it("keeps an ever-present trailing line end", () => {
    let modelValue: Model = [{insert: 'ello\n\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
      delta: [{insert: modelValue, attributes: {}}],
    }})
    cy.get('div.ql-editor').type('{moveToStart}h').then(() => {
      expect(modelValue).to.deep.equal([{insert: 'hello\n\n', attributes: {}}])
    })
  })

  it("removes an ever-present trailing line end when deleting all", () => {
    let modelValue: Model = [{insert: 'hello\n\n', attributes: {}}]
    cy.mount(WysiwygEditor, {props: {
      label: 'Test',
      blots: [],
      formatsNestingOrder: [],
      compatibleFormats: [],
      contagiousFormats: [],
      modelValue,
      'onUpdate:modelValue': (m: Model) => {modelValue = m},
      delta: [{insert: modelValue, attributes: {}}],
    }})
    cy.get('div.ql-editor').type('{selectAll}{del}').then(() => {
      expect(modelValue).to.deep.equal([{insert: '\n', attributes: {}}])
    })
  })
})
