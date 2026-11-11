#!/usr/bin/env node
/**
 * Regression checks for OKCoded GA4 helpers and contact conversion events.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function fail(msg) {
  console.error(`check-analytics: ${msg}`)
  process.exit(1)
}

const analyticsSrc = readFileSync(join(root, 'src/app/analytics.js'), 'utf8')
const contactSrc = readFileSync(join(root, 'src/app/contactForm.js'), 'utf8')

if (!contactSrc.includes("trackEvent('generate_lead'")) {
  fail('contactForm.js must fire generate_lead')
}
if (!contactSrc.includes("trackEvent('contact_form_submit'")) {
  fail('contactForm.js must fire contact_form_submit')
}
if (!contactSrc.includes("trackEvent('contact_form_start'")) {
  fail('contactForm.js must fire contact_form_start')
}
if (!contactSrc.includes("trackEvent('contact_form_error'")) {
  fail('contactForm.js must fire contact_form_error')
}

// generate_lead only inside status === 200 branch (ignore doc comments)
const leadCall = /if\s*\(\s*xhr\.status\s*===\s*200\s*\)\s*\{[\s\S]*?trackEvent\(\s*['"]generate_lead['"]/
if (!leadCall.test(contactSrc)) {
  fail('generate_lead must be gated on Formspree HTTP 200')
}
if (/trackEvent\(\s*['"]generate_lead['"][\s\S]*?xhr\.status\s*===\s*200/.test(contactSrc.replace(leadCall, ''))) {
  // ignore — primary pattern is the gated call above
}

// Must not send PII fields
const forbidden = [
  /trackEvent\([^)]*email/i,
  /trackEvent\([^)]*message/i,
  /params\.(email|message)\s*=/,
  /gtag\(\s*['"]event['"][\s\S]{0,120}email/,
]
for (const re of forbidden) {
  if (re.test(contactSrc) || re.test(analyticsSrc)) {
    fail(`possible PII leak matching ${re}`)
  }
}

// Honeypot still present / not cleared on submit path before send
if (!contactSrc.includes('Do not clear `_gotcha`')) {
  fail('honeypot submit guidance comment missing — verify honeypot behavior unchanged')
}

const events = []
globalThis.window = {
  gtag: function () {
    events.push(Array.from(arguments))
  },
  location: { pathname: '/contact/' },
}

const mod = await import(pathToFileURL(join(root, 'src/app/analytics.js')).href + '?t=' + Date.now())
mod.__resetAnalyticsForTests()

mod.trackEvent('cta_click', {
  cta_name: 'discuss_project',
  cta_location: 'home_hero',
  destination: '/contact/',
  email: 'should-not-send@example.com',
})
const cta = events.find(function (e) {
  return e[0] === 'event' && e[1] === 'cta_click'
})
if (!cta) fail('trackEvent did not call gtag for cta_click')
if (cta[2].email) fail('trackEvent leaked email parameter')
if (cta[2].cta_name !== 'discuss_project') fail('cta_name missing')

if (mod.sanitizeProjectType('Website') !== 'Website') fail('sanitizeProjectType Website')
if (mod.sanitizeProjectType('please call me at 555') !== undefined) {
  fail('sanitizeProjectType must reject free text')
}
if (mod.resolveFormLocation('/contact/') !== 'contact') fail('resolveFormLocation contact')
if (mod.resolveFormLocation('/') !== 'home') fail('resolveFormLocation home')
if (mod.resolveFormLocation('/services/web-development/') !== 'web_development') {
  fail('resolveFormLocation web development')
}

mod.__resetAnalyticsForTests()
mod.initCaseStudyView('/work/reviver/')
mod.initCaseStudyView('/work/reviver/')
const views = events.filter(function (e) {
  return e[0] === 'event' && e[1] === 'case_study_view'
})
if (views.length !== 1) fail('case_study_view must fire once, got ' + views.length)

// Blocked gtag must not throw
mod.__resetAnalyticsForTests()
window.gtag = undefined
mod.trackEvent('generate_lead', { form_location: 'home', form_type: 'project_inquiry' })
mod.initCaseStudyView('/work/reviver/')

console.log('check-analytics: ok', { eventsSampled: events.length })
