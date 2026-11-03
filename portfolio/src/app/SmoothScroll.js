import GSAP from 'gsap'

export default class {
  constructor({ element, viewport, scroll, enabled = true }) {
    this.element = element
    this.viewport = viewport
    this.scroll = scroll
    this.enabled = enabled

    this.elements = {
      scrollContent: this.element.querySelector('.scroll__content')
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled

    if (!this.enabled) {
      if (this.elements.scrollContent) {
        this.elements.scrollContent.style.transform = ''
      }
      document.body.style.height = ''
      this.scroll.hard = window.scrollY
      this.scroll.soft = this.scroll.hard
      this.scroll.limit = Math.max(0, document.documentElement.scrollHeight - this.viewport.height)
      return
    }

    this.setSizes()
  }

  setSizes() {
    if (!this.enabled || !this.elements.scrollContent) return

    this.scroll.height = this.elements.scrollContent.getBoundingClientRect().height
    this.scroll.limit = this.elements.scrollContent.clientHeight - this.viewport.height

    document.body.style.height = `${this.scroll.height}px`
  }

  update() {
    if (!this.enabled) {
      this.scroll.hard = window.scrollY
      this.scroll.soft = this.scroll.hard
      this.scroll.limit = Math.max(0, document.documentElement.scrollHeight - this.viewport.height)
      return
    }

    this.scroll.hard = window.scrollY
    this.scroll.hard = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.hard)
    this.scroll.soft = GSAP.utils.interpolate(this.scroll.soft, this.scroll.hard, this.scroll.ease)

    if (this.scroll.soft < 0.01) {
      this.scroll.soft = 0
    }

    this.elements.scrollContent.style.transform = `translateY(${-this.scroll.soft}px)`
  }

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    if (this.enabled) {
      this.setSizes()
    } else {
      this.scroll.limit = Math.max(0, document.documentElement.scrollHeight - this.viewport.height)
    }
  }
}
