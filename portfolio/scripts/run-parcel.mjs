#!/usr/bin/env node
/**
 * Discover Parcel HTML entries (including generated insights pages).
 */
import { spawnSync } from 'node:child_process'
import { globSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mode = process.argv[2] === 'serve' ? 'serve' : 'build'

const entries = globSync('src/**/index.html', { cwd: root }).sort()
if (!entries.length) {
  console.error('run-parcel: no HTML entries found under src/')
  process.exit(1)
}

const args =
  mode === 'serve'
    ? [...entries, '--open']
    : ['build', ...entries, '--no-source-maps', '--public-url', '/']

console.log(`run-parcel: ${mode} (${entries.length} entries)`)
const result = spawnSync('npx', ['parcel', ...args], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
process.exit(result.status ?? 1)
