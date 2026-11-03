/**
 * Shared motion / capability preferences (no UA sniffing).
 */

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Coarse pointer or narrow viewport → leaner GPU settings. */
export function prefersLeanGpu() {
  return window.matchMedia('(max-width: 900px), (pointer: coarse)').matches
}

/**
 * Subscribe to prefers-reduced-motion changes.
 * @param {(reduced: boolean) => void} callback
 * @returns {() => void} unsubscribe
 */
export function onReducedMotionChange(callback) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handler = function () {
    callback(mq.matches)
  }
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', handler)
    return function () {
      mq.removeEventListener('change', handler)
    }
  }
  mq.addListener(handler)
  return function () {
    mq.removeListener(handler)
  }
}
