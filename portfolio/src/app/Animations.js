import { gsap as GSAP } from 'gsap'

export default class {
  constructor(element, camera) {
    this.element = element

    this.elements = {
      number: element.querySelector('.section__title-number'),
      title: element.querySelector('.section__title-text'),
      arrows: element.querySelectorAll('.scroll-arrow'),
      paragraph: element.querySelector('.section__paragraph'),
      button: element.querySelector('.section__button'),
      scrollHint: element.querySelector('.scroll-hint'),
    }

    this.camera = camera

    this.animateIn()
  }

  animateIn() {
    try {
      const animateIn = GSAP.timeline({ 
        defaults: {
          ease: 'expo'
        }
      })
      
      // Filter out null elements
      const elementsToAnimate = [
        this.elements.number, 
        this.elements.title, 
        this.elements.paragraph, 
        this.elements.button,
        this.elements.scrollHint
      ].filter(element => element !== null)
      
      animateIn
        .from(this.camera.position, {
          z: 4,
          duration: 3
        })
        
        .from(elementsToAnimate, {
            y: -100,
            autoAlpha: 0,
            stagger: .2,
            duration: 1.6
        }, '<.3')
    } catch (error) {
      console.warn('Animation failed:', error)
    }
  }
}
