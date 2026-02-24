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

import { defineConfig } from 'cypress'


export default defineConfig({
  e2e: {
    baseUrl: 'http://fanout:8080/',
    specPattern: 'e2e-tests/**/*.cy.{js,ts}',
    screenshotsFolder: 'e2e-tests/screenshots',
    async setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        console.assert(browser.family === 'chromium')
        console.assert(browser.name === 'electron')

        // Disable spellcheck
        // https://docs.cypress.io/api/plugins/browser-launch-api#Changing-browser-preferences
        // https://github.com/electron/electron/blob/main/docs/api/structures/browser-window-options.md
        // https://github.com/electron/electron/blob/main/docs/api/structures/web-preferences.md
        launchOptions.preferences.webPreferences.spellcheck = false

        // Enable high-resolution snapshots
        // https://github.com/cypress-io/cypress/issues/19505#issuecomment-1003740653
        // https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots#the-window-size-on-ci
        if (browser.isHeadless) {
          launchOptions.preferences.width = 1600
          launchOptions.preferences.height = 1200
        }

        return launchOptions
      })
    },
  },
  component: {
    specPattern: 'src/**/*.cy.{js,ts}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
