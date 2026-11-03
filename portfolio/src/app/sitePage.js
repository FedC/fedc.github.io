/**
 * Entry for informational OKCoded pages (no WebGL scroll stage).
 */
import { initSiteChrome } from './siteChrome'
import { initContactForm } from './contactForm'
import { initWorkModal } from './workModal'
import { initReveals } from './reveals'
import { prefersReducedMotion } from './motion'
import { initAnalytics } from './analytics'

document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')
document.body.classList.remove('loading')

initSiteChrome()
initContactForm()
initWorkModal()
initReveals()
initAnalytics()

if (prefersReducedMotion()) {
  document.querySelectorAll('video[autoplay]').forEach(function (video) {
    video.removeAttribute('autoplay')
    video.pause()
    video.currentTime = 0
  })
}
