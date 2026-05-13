import anime from 'animejs'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** UTM params appended to outbound project URLs for referral analytics. */
const REFERRAL_UTM = {
  utm_source: 'okcd_portfolio',
  utm_medium: 'referral',
  utm_campaign: 'portfolio_selected_work',
}

function buildReferralUrl(siteUrl, slug) {
  try {
    const u = new URL(siteUrl, window.location.origin)
    const params = new URLSearchParams(u.search)
    params.set('utm_source', REFERRAL_UTM.utm_source)
    params.set('utm_medium', REFERRAL_UTM.utm_medium)
    params.set('utm_campaign', REFERRAL_UTM.utm_campaign)
    params.set('utm_content', slug)
    u.search = params.toString()
    return u.href
  } catch (e) {
    return siteUrl
  }
}

function siteHostname(siteUrl) {
  try {
    return new URL(siteUrl).hostname.replace(/^www\./, '')
  } catch (e) {
    return 'site'
  }
}

const PROJECTS = {
  reviver: {
    theme: 'reviver',
    eyebrow: 'Headless commerce',
    title: 'Reviver.com',
    paragraphs: [
      'Headless, route-level splitting, layout primitives tied to the CMS shape. Platform auth integration with commerce.',
    ],
    tags: ['Integration', 'Animation'],
    siteUrl: 'https://reviver.com',
  },
  futiki: {
    theme: 'futiki',
    eyebrow: 'Consumer product',
    title: 'Futiki.app',
    paragraphs: [
      'Optimistic client state, server reconciliation, and explicit handling.',
    ],
    tags: ['Product UI', 'Maps & state'],
    siteUrl: 'https://futiki.app',
  },
  squeeze: {
    theme: 'squeeze',
    eyebrow: 'Insurance software',
    title: 'Squeeze.com',
    paragraphs: [
      'Integrations sit between vendors, internal services, and third parties — Narrow HTTP contracts and defensive logic with partial responses.',
      'Recovery, validation, and layout discipline for multi-step work.',
    ],
    tags: ['Embedded UX', 'Automation'],
    siteUrl: 'https://squeeze.com',
  },
  myyellow: {
    theme: 'myyellow',
    eyebrow: 'Mortgage platform',
    title: 'MyYellow.ai',
    paragraphs: [
      'Optimistic edits, idempotent handlers, retry-safe UI, clear copy, and document state aligned across sessions with realtime updates.',
    ],
    tags: ['Document', 'Realtime'],
    siteUrl: 'https://myyellow.ai',
  },
}

export function initWorkModal() {
  const root = document.getElementById('work-modal')
  if (!root) return

  const backdrop = root.querySelector('.work-modal__backdrop')
  const sheet = root.querySelector('.work-modal__sheet')
  const closeBtn = root.querySelector('.work-modal__close')
  const eyebrowEl = root.querySelector('.work-modal__eyebrow')
  const titleEl = root.querySelector('.work-modal__title')
  const copyEl = root.querySelector('.work-modal__copy')
  const tagsEl = root.querySelector('.work-modal__tags')
  const ctaRow = root.querySelector('.work-modal__cta')
  const externalLink = root.querySelector('#work-modal-external')

  if (!backdrop || !sheet || !closeBtn || !eyebrowEl || !titleEl || !copyEl || !tagsEl) return

  const cards = document.querySelectorAll('.work-card[data-work]')
  if (!cards.length) return

  let lastFocus = null
  let activeCard = null
  let isClosing = false
  let openTimeline = null

  function onDocumentKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeModal()
    }
  }

  function getStaggerNodes() {
    return sheet.querySelectorAll('.wm-stagger')
  }

  function populate(slug) {
    const project = PROJECTS[slug]
    if (!project) return

    eyebrowEl.textContent = project.eyebrow
    titleEl.textContent = project.title

    copyEl.textContent = ''
    project.paragraphs.forEach(function (text) {
      const p = document.createElement('p')
      p.className = 'work-modal__para wm-stagger'
      p.textContent = text
      copyEl.appendChild(p)
    })

    tagsEl.textContent = ''
    tagsEl.className = 'work-modal__tags wm-stagger'
    project.tags.forEach(function (t) {
      const s = document.createElement('span')
      s.className = 'tag'
      s.textContent = t
      tagsEl.appendChild(s)
    })

    eyebrowEl.classList.add('wm-stagger')
    titleEl.classList.add('wm-stagger')

    if (ctaRow && externalLink) {
      if (project.siteUrl) {
        externalLink.href = buildReferralUrl(project.siteUrl, slug)
        var host = siteHostname(project.siteUrl)
        var label = project.linkLabel || 'Visit ' + host
        externalLink.textContent = label
        externalLink.setAttribute('aria-label', label + ' (opens in a new tab)')
        ctaRow.removeAttribute('hidden')
        ctaRow.classList.add('wm-stagger')
      } else {
        externalLink.removeAttribute('href')
        externalLink.textContent = ''
        ctaRow.setAttribute('hidden', '')
        ctaRow.classList.remove('wm-stagger')
      }
    }
  }

  function openModal(slug) {
    if (!PROJECTS[slug] || isClosing) return
    if (root.classList.contains('is-open')) return

    populate(slug)
    root.dataset.art = PROJECTS[slug].theme

    lastFocus = document.activeElement
    activeCard = document.querySelector('.work-card[data-work="' + slug + '"]')
    if (activeCard) activeCard.setAttribute('aria-expanded', 'true')

    root.classList.add('is-open')
    root.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onDocumentKey)

    const reduce = prefersReducedMotion()

    anime.set(backdrop, { opacity: 0 })
    anime.set(sheet, { opacity: 0, translateY: 36, scale: 0.93 })
    anime.set(getStaggerNodes(), { opacity: 0, translateY: 22 })

    requestAnimationFrame(function () {
      openTimeline = anime
        .timeline({
          easing: reduce ? 'linear' : 'easeOutExpo',
          complete: function () {
            closeBtn.focus()
            openTimeline = null
          },
        })
        .add({
          targets: backdrop,
          opacity: [0, 1],
          duration: reduce ? 1 : 380,
          easing: reduce ? 'linear' : 'easeOutQuad',
        })
        .add(
          {
            targets: sheet,
            opacity: [0, 1],
            translateY: [36, 0],
            scale: [0.93, 1],
            duration: reduce ? 1 : 620,
            easing: reduce ? 'linear' : 'easeOutCubic',
          },
          reduce ? 0 : '-=200'
        )
        .add(
          {
            targets: getStaggerNodes(),
            opacity: [0, 1],
            translateY: [22, 0],
            duration: reduce ? 1 : 480,
            delay: anime.stagger(reduce ? 0 : 58, { start: reduce ? 0 : 90 }),
            easing: reduce ? 'linear' : 'easeOutQuad',
          },
          reduce ? 0 : '-=400'
        )
    })
  }

  function closeModal() {
    if (!root.classList.contains('is-open') || isClosing) return
    isClosing = true
    if (openTimeline) {
      openTimeline.pause()
      openTimeline = null
    }

    const reduce = prefersReducedMotion()
    const staggers = Array.from(getStaggerNodes()).reverse()

    anime
      .timeline({
        easing: reduce ? 'linear' : 'easeInExpo',
        complete: function () {
          root.classList.remove('is-open')
          root.removeAttribute('data-art')
          root.setAttribute('aria-hidden', 'true')
          document.body.style.overflow = ''
          if (activeCard) activeCard.setAttribute('aria-expanded', 'false')
          activeCard = null
          document.removeEventListener('keydown', onDocumentKey)
          if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus()
          lastFocus = null
          isClosing = false
        },
      })
      .add({
        targets: staggers,
        opacity: 0,
        translateY: 14,
        duration: reduce ? 1 : 200,
        easing: reduce ? 'linear' : 'easeInQuad',
        delay: anime.stagger(reduce ? 0 : 32),
      })
      .add(
        {
          targets: sheet,
          opacity: 0,
          translateY: 22,
          scale: 0.96,
          duration: reduce ? 1 : 360,
          easing: reduce ? 'linear' : 'easeInCubic',
        },
        reduce ? 0 : '-=120'
      )
      .add(
        {
          targets: backdrop,
          opacity: 0,
          duration: reduce ? 1 : 300,
          easing: reduce ? 'linear' : 'easeInQuad',
        },
        reduce ? 0 : '-=260'
      )
  }

  cards.forEach(function (card) {
    const slug = card.getAttribute('data-work')
    if (!slug || !PROJECTS[slug]) return

    card.setAttribute('role', 'button')
    card.setAttribute('tabindex', '0')
    card.setAttribute('aria-haspopup', 'dialog')
    card.setAttribute('aria-expanded', 'false')

    const titleNode = card.querySelector('.work-card__title')
    const label = titleNode ? titleNode.textContent.trim() : slug
    card.setAttribute('aria-label', 'Open details: ' + label)

    card.addEventListener('click', function () {
      openModal(slug)
    })

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModal(slug)
      }
    })
  })

  root.querySelectorAll('[data-work-modal-dismiss]').forEach(function (el) {
    el.addEventListener('click', function () {
      closeModal()
    })
  })
}
