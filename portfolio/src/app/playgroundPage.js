/**
 * Playground page entry — interaction experiments without the homepage WebGL stage.
 */
import { initSiteChrome } from './siteChrome'
import { initPlayground } from './playground'
import { initReveals } from './reveals'

document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')
document.body.classList.remove('loading')

initSiteChrome()
initPlayground()
initReveals()
