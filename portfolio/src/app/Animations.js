import { gsap as GSAP } from 'gsap'

export default class {
  constructor(element, camera) {
    this.element = element
    this.camera = camera

    this.heroItems = [...element.querySelectorAll('.js-animate-in')].filter(Boolean)

    this.animateIn()
  }

  animateIn() {
    try {
      const tl = GSAP.timeline({
        defaults: {
          ease: 'expo.out'
        }
      })

      tl.from(this.camera.position, {
        z: 4,
        duration: 2.8
      })

      if (this.heroItems.length) {
        tl.from(
          this.heroItems,
          {
            y: 48,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 1.25
          },
          '<0.25'
        )
      }
    } catch (error) {
      console.warn('Animation failed:', error)
    }
  }
}
