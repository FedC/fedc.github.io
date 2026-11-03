#!/usr/bin/env node
/**
 * Assemble portfolio/build-out for GitHub Pages from:
 *   1) Parcel dist/ (hashed HTML/CSS/JS/icons)
 *   2) publish-static/ (CNAME, SEO, PWA icons, 404)
 *
 * Intentionally excludes repo-root legacy pages (about.html,
 * geltenpro.html, nutridentist.html) and unused media trees.
 */
import { cpSync, mkdirSync, rmSync, readdirSync, statSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const staticDir = join(root, 'publish-static')
const outDir = join(root, 'build-out')

function fail(msg) {
  console.error(`prepare-publish: ${msg}`)
  process.exit(1)
}

if (!existsSync(distDir)) fail(`missing ${distDir} — run npm run build first`)
if (!existsSync(join(distDir, 'index.html'))) fail('dist/index.html missing')
if (!existsSync(staticDir)) fail(`missing ${staticDir}`)

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

cpSync(distDir, outDir, { recursive: true })
cpSync(staticDir, outDir, { recursive: true })

const required = [
  'index.html',
  'CNAME',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '404.html',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
]

for (const name of required) {
  if (!existsSync(join(outDir, name))) fail(`required publish file missing: ${name}`)
}

const html = readFileSync(join(outDir, 'index.html'), 'utf8')
const checks = {
  formspree: html.includes('formspree.io/f/xpwzwrev'),
  ga: html.includes('G-KZHL6J943T'),
  canonical: /rel=['"]?canonical['"]?/.test(html) || html.includes('canonical'),
  jsonld: html.includes('application/ld+json'),
  contact: html.includes('contact-form'),
}

for (const [k, ok] of Object.entries(checks)) {
  if (!ok) fail(`index.html check failed: ${k}`)
}

// Ensure CSS/JS emitted by Parcel are present and referenced
const assets = readdirSync(outDir).filter((f) => /\.(css|js)$/.test(f))
if (!assets.some((f) => f.endsWith('.css'))) fail('no CSS in build-out')
if (!assets.some((f) => f.endsWith('.js'))) fail('no JS in build-out')

const forbidden = [
  'geltenpro.html',
  'nutridentist.html',
  'about.html',
  'node_modules',
  '.git',
]
for (const name of forbidden) {
  if (existsSync(join(outDir, name))) fail(`forbidden path published: ${name}`)
}

const listing = readdirSync(outDir)
  .map((f) => {
    const s = statSync(join(outDir, f))
    return `${s.isDirectory() ? 'd' : 'f'} ${f}`
  })
  .sort()

console.log('prepare-publish: build-out ready')
for (const line of listing) console.log(`  ${line}`)

console.log('prepare-publish: checks ok', checks)
