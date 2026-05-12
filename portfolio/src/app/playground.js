function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initMagneticButtons() {
  if (prefersReducedMotion()) return

  document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
    const wrap = btn.closest('.magnetic-wrap') || btn.parentElement
    if (!wrap) return

    const strength = 0.35
    let raf = 0

    wrap.addEventListener('mousemove', function (e) {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(function () {
        btn.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)'
      })
    })

    wrap.addEventListener('mouseleave', function () {
      cancelAnimationFrame(raf)
      btn.style.transform = 'translate3d(0,0,0)'
    })
  })
}

function initTiltCards() {
  if (prefersReducedMotion()) return

  document.querySelectorAll('.js-tilt').forEach(function (card) {
    const max = parseFloat(card.getAttribute('data-tilt-strength') || '12')

    card.addEventListener('mousemove', function (e) {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      const rx = (-py * max).toFixed(2)
      const ry = (px * max).toFixed(2)
      card.style.transform =
        'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.02,1.02,1)'
    })

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    })
  })
}

function initGlowZones() {
  if (prefersReducedMotion()) return

  document.querySelectorAll('[data-glow-zone]').forEach(function (zone) {
    const glow = zone.querySelector('[data-glow]')
    const hint = zone.querySelector('.play-glow-zone__hint')
    if (!glow) return

    zone.addEventListener('mousemove', function (e) {
      const r = zone.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'
      if (hint) hint.style.opacity = '0'
    })

    zone.addEventListener('mouseleave', function () {
      if (hint) hint.style.opacity = '1'
    })
  })
}

function initWorkCardSpotlight() {
  document.querySelectorAll('.work-card--spotlight').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      card.style.setProperty('--mx', x + '%')
      card.style.setProperty('--my', y + '%')
    })
  })
}

function initChipRipple() {
  document.querySelectorAll('[data-chip-ripple]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (prefersReducedMotion()) return
      const fx = document.createElement('span')
      fx.className = 'chip-ripple__fx'
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.2
      fx.style.width = fx.style.height = size + 'px'
      fx.style.left = e.clientX - rect.left - size / 2 + 'px'
      fx.style.top = e.clientY - rect.top - size / 2 + 'px'
      btn.appendChild(fx)
      window.setTimeout(function () {
        fx.remove()
      }, 600)
    })
  })
}

function initScrollReveal() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.js-reveal').forEach(function (el) {
      el.classList.add('is-visible')
    })
    return
  }

  const els = document.querySelectorAll('.js-reveal')
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(function (el) {
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
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  els.forEach(function (el) {
    io.observe(el)
  })
}

export function initPlayground() {
  initMagneticButtons()
  initTiltCards()
  initGlowZones()
  initWorkCardSpotlight()
  initChipRipple()
  initScrollReveal()
}
