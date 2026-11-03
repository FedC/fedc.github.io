/**
 * Entry for informational OKCoded pages (no WebGL scroll stage).
 */
import { initSiteChrome } from './siteChrome'
import { initContactForm } from './contactForm'
import { initWorkModal } from './workModal'
import { initReveals } from './reveals'

document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')
document.body.classList.remove('loading')

initSiteChrome()
initContactForm()
initWorkModal()
initReveals()
