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

import { fileURLToPath, URL } from 'node:url'
import { promises as fs } from 'fs'

import { defineConfig, Plugin } from 'vite'
import { viteSingleFile } from "vite-plugin-singlefile"
import vue from '@vitejs/plugin-vue'


const entryPointName = process.env.GABBY_ENTRY_POINT_NAME as string

function renameIndexHtml(name : string) : Plugin {
  return {
    name: 'vite-plugin-rename-index-html',
    transformIndexHtml: {
      order: 'pre',
      async handler() {
        return await fs.readFile(`src/${name}/index.html`, 'utf8');
      },
    },
  }
}

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const plugins = [
    renameIndexHtml(entryPointName),
    vue({
      template: {
        compilerOptions: {
          // Fix this problem: https://github.com/vuejs/core/pull/1600#issuecomment-721717095
          whitespace: 'preserve',
        },
      },
    }),
  ]

  if (command === 'build' && entryPointName === 'adapted') {
    // Generate a single HTML file that can be downloaded and opened offline
    // (actually used as a Jinja2 template in the FastAPI app first)
    plugins.push(viteSingleFile() as Plugin)
  }

  return {
    publicDir: `src/${entryPointName}/public`,
    plugins,
    // This section works around the following error when importing pdfjs-dist@4:
    //     "Top-level await is not available in the configured target environment"
    // It's a mix of these solutions:
    // - https://stackoverflow.com/a/77859823/905845
    // - https://stackoverflow.com/a/77643886/905845
    optimizeDeps: {esbuildOptions: {target: 'esnext'}},
    esbuild: {supported: {'top-level-await': true}},
    // End of section
    resolve: {
      alias: {
        '$': fileURLToPath(new URL('./src', import.meta.url)),
        '$adapted': fileURLToPath(new URL('./src/adapted', import.meta.url)),
        '$frontend': fileURLToPath(new URL('./src/frontend', import.meta.url)),
      }
    }
  }
})
