import { prefersReducedMotion } from './motion'

/**
 * Fade-in for .js-reveal nodes. Safe to call on every page that uses the pattern.
 */
export function initReveals() {
  const nodes = document.querySelectorAll('.js-reveal')
  if (!nodes.length) return

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    nodes.forEach(function (el) {
      el.classList.add('is-visible')
    })
    return
  }

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  nodes.forEach(function (el) {
    io.observe(el)
  })
}
