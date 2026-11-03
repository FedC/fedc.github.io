/**
 * Lightweight GA4 helpers for OKCoded.
 * Uses the existing page-level gtag (G-KZHL6J943T). Never throws. No PII.
 */

const MEASUREMENT_ID = 'G-KZHL6J943T'

const ALLOWED_PROJECT_TYPES = {
  Website: true,
  'Web application': true,
  'Mobile application': true,
  'Automation / integration': true,
  'Not sure yet': true,
}

let caseStudyViewSent = false
let ctaTrackingBound = false

function safeGtag() {
  try {
    if (typeof window === 'undefined') return null
    if (typeof window.gtag === 'function') return window.gtag
  } catch (e) {
    /* ignore */
  }
  return null
}

/**
 * Send a GA4 event. No-ops when gtag is blocked or unavailable.
 * @param {string} name
 * @param {Record<string, string|number|boolean>|undefined} params
 */
export function trackEvent(name, params) {
  try {
    if (!name || typeof name !== 'string') return
    const gtag = safeGtag()
    if (!gtag) return

    const payload = { send_to: MEASUREMENT_ID }
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(function (key) {
        const value = params[key]
        if (value === undefined || value === null || value === '') return
        // Guard: never forward obvious PII keys (exact names only)
        if (/^(email|e-mail|message|name|full_?name|phone|tel|token|ip|user_?id)$/i.test(key)) {
          return
        }
        payload[key] = value
      })
    }
    gtag('event', name, payload)
  } catch (e) {
    /* analytics must never break the site */
  }
}

export function sanitizeProjectType(raw) {
  if (!raw || typeof raw !== 'string') return undefined
  return ALLOWED_PROJECT_TYPES[raw] ? raw : undefined
}

export function resolveFormLocation(pathname) {
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
  if (/\/contact\/?/.test(path)) return 'contact'
  return 'home'
}

export function initCtaTracking(root) {
  if (ctaTrackingBound) return
  const scope = root || (typeof document !== 'undefined' ? document : null)
  if (!scope) return
  ctaTrackingBound = true

  scope.addEventListener(
    'click',
    function (event) {
      try {
        const target = event.target
        if (!target || typeof target.closest !== 'function') return
        const link = target.closest('[data-cta]')
        if (!link) return
        const ctaName = link.getAttribute('data-cta')
        const ctaLocation = link.getAttribute('data-cta-location')
        if (!ctaName || !ctaLocation) return
        const destination = link.getAttribute('href') || ''
        trackEvent('cta_click', {
          cta_name: ctaName,
          cta_location: ctaLocation,
          destination: destination.split('?')[0],
        })
      } catch (e) {
        /* ignore */
      }
    },
    false
  )
}

export function initCaseStudyView(pathname) {
  try {
    if (caseStudyViewSent) return
    const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
    if (!/\/work\/reviver\/?/.test(path)) return
    caseStudyViewSent = true
    trackEvent('case_study_view', {
      project_name: 'reviver',
      content_type: 'case_study',
    })
  } catch (e) {
    /* ignore */
  }
}

/** Wire UI analytics used on both homepage and site pages. */
export function initAnalytics() {
  initCtaTracking()
  initCaseStudyView()
}

/** Test helpers — reset module guards between cases. */
export function __resetAnalyticsForTests() {
  caseStudyViewSent = false
  ctaTrackingBound = false
}

export const __ALLOWED_PROJECT_TYPES = ALLOWED_PROJECT_TYPES
