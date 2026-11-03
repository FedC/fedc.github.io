import * as THREE from 'three'
import { gsap as GSAP } from 'gsap'

import Animations from './Animations'
import SmoothScroll from './SmoothScroll'
import { initContactForm } from './contactForm'
import { initWorkModal } from './workModal'
import { initSiteChrome } from './siteChrome'
import { initReveals } from './reveals'
import { initWorkCardSpotlight } from './playground'
import {
  prefersReducedMotion,
  prefersLeanGpu,
  onReducedMotionChange
} from './motion'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

class ScrollStage {
  constructor() {
    this.element = document.querySelector('.content')
    if (!this.element) return

    this.elements = {
      line: this.element.querySelector('.layout__line')
    }

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.mouse = {
      x: 0,
      y: 0
    }

    this.scroll = {
      height: 0,
      limit: 0,
      hard: 0,
      soft: 0,
      ease: 0.05,
      normalized: 0,
      running: false
    }

    this.settings = {
      uFrequency: { start: 0, end: 4 },
      uAmplitude: { start: 4, end: 4 },
      uDensity: { start: 1, end: 1 },
      uStrength: { start: 0, end: 1.1 },
      uDeepPurple: { start: 1, end: 0 },
      uOpacity: { start: .1, end: .66 }
    }

    this.reducedMotion = prefersReducedMotion()
    this.leanGpu = prefersLeanGpu()
    this.geometryDetail = this.resolveGeometryDetail()
    this.isVisible = !document.hidden
    this.rafId = 0
    this.needsRender = true

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.leanGpu,
      alpha: true,
      powerPreference: this.leanGpu ? 'low-power' : 'default'
    })

    this.canvas = this.renderer.domElement
    this.canvas.setAttribute('aria-hidden', 'true')
    this.canvas.setAttribute('role', 'presentation')

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.viewport.width / this.viewport.height,
      .1,
      10
    )

    this.clock = new THREE.Clock()

    this.smoothScroll = new SmoothScroll({
      element: this.element,
      viewport: this.viewport,
      scroll: this.scroll,
      enabled: !this.reducedMotion
    })

    GSAP.defaults({
      ease: 'power2',
      duration: 6.6,
      overwrite: true
    })

    this.updateScrollAnimations = this.updateScrollAnimations.bind(this)
    this.update = this.update.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onVisibilityChange = this.onVisibilityChange.bind(this)
    this.onContextLost = this.onContextLost.bind(this)
    this.onContextRestored = this.onContextRestored.bind(this)

    this.init()
  }

  resolveGeometryDetail() {
    if (this.reducedMotion) return 12
    if (this.leanGpu) return 24
    return 64
  }

  resolvePixelRatio() {
    const dpr = window.devicePixelRatio || 1
    if (this.leanGpu) return Math.min(dpr, 1)
    return Math.min(dpr, 1.5)
  }

  init() {
    this.addCanvas()
    this.addCamera()
    this.addMesh()
    this.addEventListeners()
    this.onResize()

    if (this.reducedMotion) {
      this.renderStaticFrame()
    } else {
      this.update()
    }
  }

  addCanvas() {
    this.canvas.classList.add('webgl')
    document.body.appendChild(this.canvas)
  }

  addCamera() {
    this.camera.position.set(0, 0, 2.5)
    this.scene.add(this.camera)
  }

  addMesh() {
    this.geometry = new THREE.IcosahedronGeometry(1, this.geometryDetail)

    this.material = new THREE.ShaderMaterial({
      wireframe: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uFrequency: { value: this.settings.uFrequency.start },
        uAmplitude: { value: this.settings.uAmplitude.start },
        uDensity: { value: this.settings.uDensity.start },
        uStrength: { value: this.settings.uStrength.start },
        uDeepPurple: { value: this.settings.uDeepPurple.start },
        uOpacity: { value: this.settings.uOpacity.start }
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  replaceGeometry(detail) {
    if (!this.mesh || detail === this.geometryDetail) return
    this.geometryDetail = detail
    const next = new THREE.IcosahedronGeometry(1, detail)
    this.mesh.geometry.dispose()
    this.mesh.geometry = next
    this.geometry = next
    this.needsRender = true
  }

  updateScrollAnimations() {
    this.scroll.running = false
    this.smoothScroll.update()
    if (!this.scroll.limit) return

    this.scroll.normalized = (this.scroll.hard / this.scroll.limit).toFixed(1)

    if (this.reducedMotion) {
      if (this.mesh) {
        this.mesh.rotation.x = this.scroll.normalized * Math.PI
      }
      if (this.elements.line) {
        this.elements.line.style.transformOrigin = 'left'
        this.elements.line.style.transform = 'scaleX(' + this.scroll.normalized + ')'
      }
      for (const key in this.settings) {
        if (this.settings[key].start !== this.settings[key].end && this.mesh) {
          this.mesh.material.uniforms[key].value =
            this.settings[key].start +
            this.scroll.normalized * (this.settings[key].end - this.settings[key].start)
        }
      }
      this.renderStaticFrame()
      return
    }

    GSAP.to(this.mesh.rotation, {
      x: this.scroll.normalized * Math.PI
    })

    if (this.elements.line) {
      GSAP.to(this.elements.line, {
        scaleX: this.scroll.normalized,
        transformOrigin: 'left',
        duration: 1.5,
        ease: 'ease'
      })
    }

    for (const key in this.settings) {
      if (this.settings[key].start !== this.settings[key].end) {
        GSAP.to(this.mesh.material.uniforms[key], {
          value: this.settings[key].start + this.scroll.normalized * (this.settings[key].end - this.settings[key].start)
        })
      }
    }

    this.needsRender = true
  }

  addEventListeners() {
    window.addEventListener('load', this.onLoad)
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onResize)
    document.addEventListener('visibilitychange', this.onVisibilityChange)
    this.canvas.addEventListener('webglcontextlost', this.onContextLost)
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored)

    this.unsubscribeMotion = onReducedMotionChange((reduced) => {
      this.setReducedMotion(reduced)
    })
  }

  setReducedMotion(reduced) {
    this.reducedMotion = reduced
    this.smoothScroll.setEnabled(!reduced)
    this.replaceGeometry(this.resolveGeometryDetail())

    if (reduced) {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId)
        this.rafId = 0
      }
      GSAP.killTweensOf(this.mesh.rotation)
      if (this.elements.line) GSAP.killTweensOf(this.elements.line)
      document.querySelectorAll('.js-animate-in').forEach(function (el) {
        el.style.opacity = ''
        el.style.visibility = ''
        el.style.transform = ''
      })
      document.querySelectorAll('.js-reveal').forEach(function (el) {
        el.classList.add('is-visible')
      })
      this.renderStaticFrame()
    } else if (!this.rafId && this.isVisible) {
      this.clock.start()
      this.update()
    }

    this.onResize()
  }

  onLoad() {
    document.body.classList.remove('loading')

    try {
      this.animations = new Animations(this.element, this.camera)
    } catch (error) {
      console.warn('Animations initialization failed:', error)
    }

    this.needsRender = true
  }

  onScroll() {
    if (!this.scroll.running) {
      window.requestAnimationFrame(this.updateScrollAnimations)
      this.scroll.running = true
    }
  }

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.leanGpu = prefersLeanGpu()
    this.replaceGeometry(this.resolveGeometryDetail())

    this.smoothScroll.onResize()

    if (this.mesh) {
      if (this.viewport.width < this.viewport.height) {
        this.mesh.scale.set(.75, .75, .75)
      } else {
        this.mesh.scale.set(1, 1, 1)
      }
    }

    this.camera.aspect = this.viewport.width / this.viewport.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.renderer.setPixelRatio(this.resolvePixelRatio())
    this.needsRender = true

    if (this.reducedMotion) {
      this.renderStaticFrame()
    }
  }

  onVisibilityChange() {
    this.isVisible = !document.hidden
    if (this.isVisible && !this.reducedMotion && !this.rafId) {
      this.clock.start()
      this.update()
    }
  }

  onContextLost(event) {
    event.preventDefault()
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = 0
    }
  }

  onContextRestored() {
    this.onResize()
    if (!this.reducedMotion && this.isVisible && !this.rafId) {
      this.update()
    } else {
      this.renderStaticFrame()
    }
  }

  update() {
    this.rafId = window.requestAnimationFrame(this.update)

    if (!this.isVisible || this.reducedMotion) {
      return
    }

    const elapsedTime = this.clock.getElapsedTime()
    this.mesh.rotation.y = elapsedTime * .05

    this.smoothScroll.update()

    // Continuous mesh rotation always changes the frame; keep rendering while visible.
    this.render()
  }

  renderStaticFrame() {
    if (!this.renderer || !this.scene || !this.camera) return
    this.smoothScroll.update()
    this.renderer.render(this.scene, this.camera)
    this.needsRender = false
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

new ScrollStage()

document.addEventListener('DOMContentLoaded', function () {
  initSiteChrome()
  initContactForm()
  initWorkModal()
  initWorkCardSpotlight()
  initReveals()

  document.querySelectorAll('.page-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href')
      if (!href || href.charAt(0) !== '#') return
      var targetElement = document.querySelector(href)
      if (!targetElement) return
      e.preventDefault()
      var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      })
    })
  })
})
