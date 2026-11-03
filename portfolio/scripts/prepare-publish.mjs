#!/usr/bin/env node
/**
 * Assemble portfolio/build-out for GitHub Pages from:
 *   1) Parcel dist/ (multi-page HTML + hashed assets)
 *   2) publish-static/ (CNAME, SEO, PWA icons, 404, legacy about.html redirect)
 *
 * Excludes prospect estimate pages. Generates sitemap for public routes.
 */
import {
  cpSync,
  mkdirSync,
  rmSync,
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const staticDir = join(root, 'publish-static')
const outDir = join(root, 'build-out')

const PUBLIC_ROUTES = ['/', '/services/', '/work/', '/about/', '/contact/']

function fail(msg) {
  console.error(`prepare-publish: ${msg}`)
  process.exit(1)
}

function walkFiles(dir, base = dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walkFiles(abs, base, acc)
    else acc.push(abs.slice(base.length + 1).replace(/\\/g, '/'))
  }
  return acc
}

if (!existsSync(distDir)) fail(`missing ${distDir} — run npm run build first`)
if (!existsSync(join(distDir, 'index.html'))) fail('dist/index.html missing')
if (!existsSync(staticDir)) fail(`missing ${staticDir}`)

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

cpSync(distDir, outDir, { recursive: true })
cpSync(staticDir, outDir, { recursive: true })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map((route) => `  <url>\n    <loc>https://okcd.io${route}</loc>\n  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(outDir, 'sitemap.xml'), sitemap)

const required = [
  'index.html',
  'services/index.html',
  'work/index.html',
  'about/index.html',
  'contact/index.html',
  'about.html',
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
  servicesNav: html.includes('/services/'),
}

for (const [k, ok] of Object.entries(checks)) {
  if (!ok) fail(`index.html check failed: ${k}`)
}

const aboutLegacy = readFileSync(join(outDir, 'about.html'), 'utf8')
const aboutChecks = {
  noindex: /noindex/i.test(aboutLegacy),
  canonicalAbout: aboutLegacy.includes('https://okcd.io/about/'),
  metaRefresh: /http-equiv=["']?refresh["']?/i.test(aboutLegacy),
  noLegacyCss: !/\.css/i.test(aboutLegacy),
}

for (const [k, ok] of Object.entries(aboutChecks)) {
  if (!ok) fail(`about.html check failed: ${k}`)
}

const contactPage = readFileSync(join(outDir, 'contact/index.html'), 'utf8')
if (!contactPage.includes('formspree.io/f/xpwzwrev')) fail('contact page missing Formspree')
if (!contactPage.includes('G-KZHL6J943T')) fail('contact page missing GA4')

const assets = walkFiles(outDir).filter((f) => /\.(css|js)$/.test(f))
if (!assets.some((f) => f.endsWith('.css'))) fail('no CSS in build-out')
if (!assets.some((f) => f.endsWith('.js'))) fail('no JS in build-out')

const forbidden = ['geltenpro.html', 'nutridentist.html', 'node_modules', '.git', 'estimate']
for (const name of forbidden) {
  if (existsSync(join(outDir, name))) fail(`forbidden path published: ${name}`)
}

const listing = walkFiles(outDir).sort()
console.log('prepare-publish: build-out ready')
for (const line of listing) console.log(`  ${line}`)
console.log('prepare-publish: checks ok', { ...checks, about: aboutChecks, routes: PUBLIC_ROUTES })
