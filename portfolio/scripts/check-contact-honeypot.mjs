#!/usr/bin/env node
/**
 * Regression checks for Formspree `_gotcha` honeypot on contact forms.
 * Ensures autofill-friendly labeling is not reintroduced and JS does not
 * populate the honeypot from other fields.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const forms = [
  join(root, 'src/index.html'),
  join(root, 'src/contact/index.html'),
]
const contactFormJs = join(root, 'src/app/contactForm.js')

function fail(msg) {
  console.error(`check-contact-honeypot: ${msg}`)
  process.exit(1)
}

function extractHoneypotBlock(html, file) {
  const start = html.indexOf('name="_gotcha"')
  if (start === -1) fail(`${file}: missing name="_gotcha"`)
  const blockStart = html.lastIndexOf('<div', start)
  const blockEnd = html.indexOf('</div>', start)
  if (blockStart === -1 || blockEnd === -1) fail(`${file}: could not isolate honeypot markup`)
  return html.slice(blockStart, blockEnd + 6)
}

for (const file of forms) {
  if (!existsSync(file)) fail(`missing ${file}`)
  const html = readFileSync(file, 'utf8')
  const rel = file.slice(root.length + 1)
  const block = extractHoneypotBlock(html, rel)

  if (/company\s+website/i.test(block)) {
    fail(`${rel}: honeypot label must not say "Company website" (triggers autofill)`)
  }
  const labelMatch = block.match(/<label\b[^>]*>([\s\S]*?)<\/label>/i)
  const labelText = labelMatch ? labelMatch[1].replace(/<[^>]+>/g, '').trim() : ''
  if (/\b(website|url|company|email|phone|address)\b/i.test(labelText)) {
    fail(`${rel}: honeypot label "${labelText}" uses autofill-prone wording`)
  }
  if (!/value\s*=\s*["']["']/.test(block)) {
    fail(`${rel}: honeypot must initialize with value=""`)
  }
  if (!/autocomplete\s*=\s*["']new-password["']/.test(block)) {
    fail(`${rel}: honeypot must use autocomplete="new-password"`)
  }
  if (!/\breadonly\b/.test(block)) {
    fail(`${rel}: honeypot must be readonly to resist autofill`)
  }
  if (!/data-lpignore\s*=\s*["']true["']/.test(block)) {
    fail(`${rel}: honeypot should set data-lpignore="true"`)
  }
  if (!/tabindex\s*=\s*["']-1["']/.test(block)) {
    fail(`${rel}: honeypot must use tabindex="-1"`)
  }
}

const js = readFileSync(contactFormJs, 'utf8')
if (/_gotcha["']\s*\]\.value\s*=\s*(?!['"]['"])/.test(js) && /email\.value|message\.value|project_type/.test(js)) {
  // Soft signal — stronger checks below
}
if (/name=["']_gotcha["'][\s\S]{0,80}\.value\s*=\s*(email|message|project)/i.test(js)) {
  fail('contactForm.js appears to assign another field into _gotcha')
}
if (!js.includes('resetHoneypot')) {
  fail('contactForm.js must export/use resetHoneypot')
}
if (!js.includes('buildContactFormData')) {
  fail('contactForm.js must export buildContactFormData')
}

// Runtime: FormData must not invent a non-empty _gotcha from other fields.
const { JSDOM } = await import('jsdom').catch(() => ({ JSDOM: null }))
if (JSDOM) {
  const dom = new JSDOM(`<!doctype html><form id="contact-form">
    <input name="_gotcha" value="" readonly />
    <input name="email" value="you@company.com" />
    <textarea name="message">Hello</textarea>
    <input type="radio" name="project_type" value="Website" checked />
  </form>`)
  const form = dom.window.document.getElementById('contact-form')
  const mod = await import(pathToFileURL(contactFormJs).href)
  const fd = mod.buildContactFormData(form)
  const gotcha = fd.get('_gotcha')
  if (gotcha !== '' && gotcha !== null) {
    fail(`FormData _gotcha should be empty, got ${JSON.stringify(gotcha)}`)
  }
  if (fd.get('email') !== 'you@company.com') fail('FormData email mismatch')
  mod.resetHoneypot(form)
  if (form.querySelector('[name="_gotcha"]').value !== '') {
    fail('resetHoneypot did not clear _gotcha')
  }
  // Simulate autofill, then reset
  form.querySelector('[name="_gotcha"]').value = 'https://evil.example'
  mod.resetHoneypot(form)
  if (form.querySelector('[name="_gotcha"]').value !== '') {
    fail('resetHoneypot failed to clear autofilled value')
  }
  console.log('check-contact-honeypot: jsdom FormData checks ok')
} else {
  console.log('check-contact-honeypot: jsdom not installed — HTML/source checks only')
}

console.log('check-contact-honeypot: ok', { forms: forms.length })
