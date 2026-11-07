import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, globSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function classes(attributes) {
  return (attributes.match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1] || '').split(/\s+/)
}

// This guards rendering structure, not freely editable article wording. A long
// article must not inherit opacity: 0 from an observer-controlled ancestor.
function assertVisibleArticleBody(html) {
  const main = html.match(/<main\b([^>]*)>/i)
  const article = html.match(/<article\b([^>]*)>([\s\S]*?)<\/article>/i)
  assert.ok(main, 'article page must have a main element')
  assert.ok(article, 'article page must have an article element')
  assert.equal(classes(main[1]).includes('js-reveal'), false, 'main must be visible without an observer callback')
  assert.equal(classes(article[1]).includes('js-reveal'), false, 'long article must be visible without an observer callback')
  const body = article[2].match(/<div\b([^>]*\bclass=["'][^"']*\binsights-article__body\b[^"']*["'][^>]*)>/i)
  assert.ok(body, 'article must have a content body')
  assert.equal(classes(body[1]).includes('js-reveal'), false, 'article body must not depend on reveal animation')
  const header = article[2].match(/<header\b([^>]*)>/i)
  assert.ok(header, 'article must have a heading')
  assert.ok(classes(header[1]).includes('js-reveal'), 'retain the decorative heading reveal')
}

test('the generator keeps long article bodies visible and reveals only their heading', (t) => {
  const cache = join(root, '.cache')
  mkdirSync(cache, { recursive: true })
  const fixture = mkdtempSync(join(cache, 'insights-visibility-'))
  t.after(() => rmSync(fixture, { recursive: true, force: true }))
  mkdirSync(join(fixture, 'scripts'), { recursive: true })
  mkdirSync(join(fixture, 'content/insights'), { recursive: true })
  cpSync(join(root, 'scripts/build-insights.mjs'), join(fixture, 'scripts/build-insights.mjs'))
  writeFileSync(join(fixture, 'content/insights/long-article.md'), [
    '---',
    'title: "Long article fixture"',
    'description: "Rendering regression fixture"',
    'date: "2026-01-01"',
    '---',
    ...Array.from({ length: 200 }, () => '\nA paragraph of article content.\n'),
  ].join('\n'))
  execFileSync(process.execPath, [join(fixture, 'scripts/build-insights.mjs')], { cwd: fixture })
  const html = readFileSync(join(fixture, 'src/insights/long-article/index.html'), 'utf8')
  assertVisibleArticleBody(html)
})

test('any checked-in generated articles keep the same visible-body structure', () => {
  const articles = globSync('src/insights/*/index.html', { cwd: root })
  for (const path of articles) assertVisibleArticleBody(readFileSync(join(root, path), 'utf8'))
})
