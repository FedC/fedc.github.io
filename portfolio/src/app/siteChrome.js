/**
 * Shared site chrome helpers for multi-page OKCoded routes.
 */
export function initSiteChrome() {
  const path = window.location.pathname.replace(/index\.html$/, '')
  const normalized = path.endsWith('/') || path === '' ? path : `${path}/`

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    const href = link.getAttribute('href') || ''
    let target = href
    try {
      if (href.startsWith('http')) {
        target = new URL(href).pathname
      }
    } catch (e) {
      /* ignore */
    }
    target = target.replace(/index\.html$/, '')
    if (!target.endsWith('/') && target !== '/') target += '/'

    const isHome = (normalized === '/' || normalized === '') && (target === '/' || target === '')
    const isMatch = target !== '/' && normalized.startsWith(target)
    if (isHome || isMatch) {
      link.setAttribute('aria-current', 'page')
      link.classList.add('is-active')
    }
  })

  const year = document.getElementById('footer-year')
  if (year) year.textContent = String(new Date().getFullYear())
}
