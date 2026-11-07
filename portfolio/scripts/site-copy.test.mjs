import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const routes = ['', 'about', 'services', 'work', 'playground']
const pages = new Map(routes.map((route) => [route, read(`src/${route ? route + '/' : ''}index.html`)]))

// These are specific editorial notes that previously leaked into public copy,
// not a general ban on particular words, punctuation, or writing styles.
test('public copy does not repeat internal positioning instructions', () => {
  const leakedNotes = [
    /not a large agency/i,
    /growth agency.{0,30}whole identity/i,
    /not AI theater/i,
    /teams evaluating senior engineering ownership/i,
    /primary languages and frameworks first/i,
    /client case studies will be published/i,
  ]
  for (const [route, html] of pages) {
    for (const note of leakedNotes) assert.doesNotMatch(html, note, `/${route}: ${note}`)
  }
})

test('About includes a short career background and distinguishes selected project work', () => {
  const html = pages.get('about')
  assert.match(html, /lead frontend engineering at Squeeze/)
  assert.match(html, /previously worked at Citrix/)
  assert.match(html, /University of Florida/)
  assert.match(html, /Alongside my work at Squeeze, I take on selected projects through OKCoded/)
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/federicocommisso\/"/)
  assert.doesNotMatch(html, /available immediately|full-time freelanc|open to work/i)
})

test('About search and social descriptions use the same factual introduction', () => {
  const html = pages.get('about')
  const descriptions = [...html.matchAll(/<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content="([^"]+)"/g)]
    .map((match) => match[1])
  assert.equal(descriptions.length, 3)
  assert.equal(new Set(descriptions).size, 1)
  assert.match(descriptions[0], /tech lead/)
})

test('edited pages retain their canonical routes, navigation, and script entry points', () => {
  for (const [route, html] of pages) {
    const path = route ? `/${route}/` : '/'
    assert.ok(html.includes(`rel="canonical" href="https://okcd.io${path}"`), path)
    for (const nav of ['services', 'work', 'insights', 'about', 'contact']) {
      assert.match(html, new RegExp(`href="/${nav}/"[^>]*data-nav`))
    }
    const entry = route === '' ? './app/index.js'
      : route === 'playground' ? '../app/playgroundPage.js' : '../app/sitePage.js'
    assert.ok(html.includes(`type="module" src="${entry}"`), entry)
    assert.ok(html.includes('G-KZHL6J943T'))
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
  }
})

test('service planning copy cannot reintroduce the removed disclaimers', () => {
  const plan = read('src/app/data/services-plan.js')
  assert.doesNotMatch(plan, /padded client portfolio|not AI theater|owned together so features actually ship/i)
})
