// Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net>

import { mount } from 'cypress/vue'

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      vue<C>(): Chainable<{
        componentVM: InstanceType<C>
        setProps(props: {[key: string]: unknown}): void
      }>
    }
  }
}
