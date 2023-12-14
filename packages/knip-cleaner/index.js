#!/usr/bin/env node

import { dirname, relative } from 'node:path'
import { chdir, cwd } from 'node:process'
import { fileURLToPath } from 'node:url'

import { $ } from 'execa'

console.log(`⚙️ ${new Date().toLocaleString()} start kniping...`)

const __dirname = dirname(fileURLToPath(import.meta.url))
const dir = cwd()
const relativePath = relative(dir, __dirname)
chdir(__dirname)

await $({ stdio: 'inherit' })`knip --version`

// await $({
//   stdio: 'inherit',
// })`knip --config ${relativePath}/knip.ts --directory ${dir}`
await $({
  stdio: 'inherit',
})`knip --config ${relativePath}/knip.ts --reporter ${relativePath}/knip-reporter.js --directory ${dir}`

console.log('🎉 knip done!')
