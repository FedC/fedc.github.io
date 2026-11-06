import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'

function readProjectFile(path) {
  return readFileSync(new URL('../' + path, import.meta.url), 'utf8')
}

// Execute the real entry point with browser/vendor boundaries stubbed. No build,
// browser process, network requests, or additional test dependencies are needed.
function runHomepage({ webglUnavailable = false, reducedMotion = false } = {}) {
  const documentEvents = new Map()
  const windowEvents = new Map()
  const initialized = []
  const loading = new Set(['loading'])
  const visible = new Set()
  const hero = { style: { opacity: '', visibility: '', transform: '' } }
  const revealed = { classList: { add: (value) => visible.add(value) } }
  const calls = { canvases: 0, frames: 0, renders: 0, meshes: 0, animations: 0 }
  const content = { querySelector: () => null }
  const scrollStage = { style: { position: 'fixed', height: '100vh', transform: '' } }
  const scrollContent = { style: { position: 'absolute', height: '', transform: '' } }
  const bodyStyle = { height: '' }
  const context = {
    console: { warn() {} },
    document: {
      hidden: false,
      body: {
        style: bodyStyle,
        classList: { remove: (value) => loading.delete(value) },
        appendChild: () => calls.canvases++,
      },
      querySelector: () => content,
      querySelectorAll: (selector) => selector === '.js-animate-in' ? [hero]
        : selector === '.js-reveal' ? [revealed]
          : selector === '.scroll__stage, .scroll__content' ? [scrollStage, scrollContent] : [],
      addEventListener: (event, handler) => documentEvents.set(event, handler),
    },
    window: {
      innerWidth: 1280, innerHeight: 800,
      addEventListener: (event, handler) => windowEvents.set(event, handler),
      requestAnimationFrame: () => ++calls.frames,
    },
    prefersReducedMotion: () => reducedMotion,
    prefersLeanGpu: () => false,
    onReducedMotionChange: () => () => {},
    requestAnimationFrame: () => ++calls.frames,
    cancelAnimationFrame() {},
    vertexShader: '', fragmentShader: '',
    GSAP: { defaults() {}, to() {}, killTweensOf() {} },
    SmoothScroll: class { update() {} onResize() {} setEnabled() {} },
    Animations: class { constructor() { calls.animations++ } },
    THREE: {
      Scene: class { add() {} },
      WebGLRenderer: class {
        constructor() {
          if (webglUnavailable) throw new Error('WebGL unavailable')
          this.domElement = { setAttribute() {}, classList: { add() {} }, addEventListener() {} }
        }
        setSize() {} setPixelRatio() {}
        render() { calls.renders++ }
      },
      PerspectiveCamera: class {
        position = { set() {} }
        updateProjectionMatrix() {}
      },
      Clock: class { getElapsedTime() { return 0 } start() {} },
      IcosahedronGeometry: class { dispose() {} },
      ShaderMaterial: class { constructor(settings) { Object.assign(this, settings) } },
      Mesh: class {
        constructor(geometry, material) {
          this.geometry = geometry
          this.material = material
          this.rotation = {}
          this.scale = { set() {} }
          calls.meshes++
        }
      },
    },
  }
  for (const name of ['initSiteChrome', 'initContactForm', 'initWorkModal',
    'initWorkCardSpotlight', 'initReveals', 'initAnalytics']) {
    context[name] = () => initialized.push(name)
  }
  const source = readProjectFile('src/app/index.js')
    .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
  vm.runInNewContext(source, context, { filename: 'src/app/index.js' })
  documentEvents.get('DOMContentLoaded')?.()
  return { calls, initialized, loading, visible, windowEvents, scrollStage, scrollContent }
}

test('homepage uses native document scrolling when WebGL is unavailable', () => {
  const page = runHomepage({ webglUnavailable: true })
  assert.equal(page.scrollStage.style.position, 'relative')
  assert.equal(page.scrollStage.style.height, 'auto')
  assert.equal(page.scrollContent.style.position, 'relative')
  assert.equal(page.scrollContent.style.transform, '')
})

test('homepage keeps core functionality and removes the loader when WebGL fails', () => {
  const page = runHomepage({ webglUnavailable: true })
  assert.deepEqual(page.initialized, ['initSiteChrome', 'initContactForm', 'initWorkModal',
    'initWorkCardSpotlight', 'initReveals', 'initAnalytics'])
  assert.equal(page.loading.has('loading'), false)
  assert.equal(page.visible.has('is-visible'), true)
})

test('homepage retains the WebGL stage and entrance animations when supported', () => {
  const page = runHomepage()
  assert.equal(page.calls.canvases, 1)
  assert.equal(page.calls.meshes, 1)
  assert.equal(page.calls.frames, 1)
  assert.equal(page.calls.renders, 1)
  assert.equal(page.scrollStage.style.position, 'fixed')
  assert.equal(page.scrollContent.style.position, 'absolute')
  page.windowEvents.get('load')()
  assert.equal(page.calls.animations, 1)
  assert.equal(page.loading.has('loading'), false)
})

test('homepage retains static WebGL rendering for reduced motion', () => {
  const page = runHomepage({ reducedMotion: true })
  assert.equal(page.calls.canvases, 1)
  assert.equal(page.calls.meshes, 1)
  assert.equal(page.calls.frames, 0)
  assert.ok(page.calls.renders > 0)
})

function runContactForm() {
  const handlers = new Map()
  const requests = []
  const events = []
  const classes = new Set()
  const email = { value: 'reader@example.com', checkValidity: () => true }
  const message = { value: 'Please help with my website.', checkValidity: () => true }
  const honeypot = { value: '', setAttribute() {} }
  const status = {
    hidden: true, textContent: '',
    classList: {
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      add: (name) => classes.add(name),
    },
  }
  const label = { textContent: 'Send project inquiry' }
  const button = {
    disabled: false, attributes: {},
    setAttribute(name, value) { this.attributes[name] = value },
    querySelector: () => label,
  }
  let resets = 0
  const form = {
    action: 'https://formspree.io/f/xpwzwrev',
    querySelector(selector) {
      if (selector.includes('_gotcha')) return honeypot
      if (selector === '[name="email"]') return email
      if (selector === '[name="message"]') return message
      if (selector.includes('project_type')) return { value: 'Website' }
      return null
    },
    addEventListener: (event, handler) => handlers.set(event, handler),
    reset() { resets++; email.value = ''; message.value = '' },
  }
  const context = {
    document: {
      getElementById: (id) => ({
        'contact-form': form, 'form-response': status, 'contact-submit': button,
      })[id],
    },
    setTimeout() {},
    trackEvent: (name, params) => events.push({ name, params }),
    sanitizeProjectType: (value) => value,
    resolveFormLocation: () => 'contact',
    FormData: class extends Map {
      constructor() {
        super([['email', email.value], ['message', message.value], ['_gotcha', honeypot.value]])
      }
    },
    XMLHttpRequest: class {
      timeout = 0
      constructor() { requests.push(this) }
      open(...args) { this.openArgs = args }
      setRequestHeader() {}
      send(data) { this.data = data }
    },
  }
  const source = readProjectFile('src/app/contactForm.js')
    .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^export /gm, '')
  vm.runInNewContext(source + '\ninitContactForm()', context, { filename: 'src/app/contactForm.js' })
  const submit = () => handlers.get('submit')({ preventDefault() {} })
  return { submit, requests, events, email, message, honeypot, status, button, label,
    classes, resets: () => resets }
}

test('contact submissions have a finite request timeout', () => {
  const form = runContactForm()
  form.submit()
  assert.equal(form.requests[0].timeout, 30000)
  assert.equal(typeof form.requests[0].ontimeout, 'function')
})

test('a timed-out contact submission preserves input and allows a successful retry', () => {
  const form = runContactForm()
  form.submit()
  assert.equal(form.button.disabled, true)
  assert.equal(form.label.textContent, 'Sending…')
  form.submit()
  assert.equal(form.requests.length, 1, 'duplicate submits stay blocked while pending')
  assert.equal(typeof form.requests[0].ontimeout, 'function')
  form.requests[0].ontimeout()
  assert.equal(form.button.disabled, false)
  assert.equal(form.button.attributes['aria-busy'], 'false')
  assert.equal(form.label.textContent, 'Send project inquiry')
  assert.equal(form.status.hidden, false)
  assert.equal(form.classes.has('contact-status--error'), true)
  assert.match(form.status.textContent, /timed out/i)
  assert.match(form.status.textContent, /hello@okcd\.io/)
  assert.equal(form.email.value, 'reader@example.com')
  assert.equal(form.message.value, 'Please help with my website.')
  assert.equal(form.resets(), 0)
  assert.equal(form.events.filter((event) => event.name === 'generate_lead').length, 0)
  assert.equal(form.events.at(-1).params.error_type, 'timeout')
  form.submit()
  assert.equal(form.requests.length, 2)
  assert.equal(form.requests[1].data.get('message'), 'Please help with my website.')
  assert.equal(form.requests[1].data.get('_gotcha'), '')
  form.requests[1].status = 200
  form.requests[1].onload()
  assert.equal(form.button.disabled, false)
  assert.equal(form.classes.has('contact-status--success'), true)
  assert.equal(form.resets(), 1)
  assert.equal(form.events.filter((event) => event.name === 'generate_lead').length, 1)
})

test('contact submissions retain server and network error recovery', () => {
  for (const status of [422, 429, 500, 'network']) {
    const form = runContactForm()
    form.submit()
    const xhr = form.requests[0]
    if (status === 'network') xhr.onerror()
    else { xhr.status = status; xhr.responseText = '{}'; xhr.onload() }
    assert.equal(form.button.disabled, false)
    assert.equal(form.classes.has('contact-status--error'), true)
    assert.equal(form.email.value, 'reader@example.com')
    assert.equal(form.events.filter((event) => event.name === 'generate_lead').length, 0)
  }
})

test('the publishable 404 page provides a home recovery link', () => {
  const html = readProjectFile('publish-static/404.html')
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || ''
  assert.match(body, /<a\b[^>]*href=["']\/["'][^>]*>\s*Back to home\s*<\/a>/i)
})
