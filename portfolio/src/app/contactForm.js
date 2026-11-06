/**
 * Formspree project inquiry — endpoint preserved; honeypot + loading/disabled UX.
 * Extra fields (e.g. project_type radios) submit via FormData automatically.
 *
 * Honeypot (`_gotcha`) must remain empty for legitimate users. Never copy other
 * field values into it. Delayed clears defeat browser autofill without removing
 * bot protection for values set after the settle window.
 *
 * GA4: contact_form_start / contact_form_submit / generate_lead / contact_form_error.
 * Never send email, message, or other free-text/PII.
 */
import {
  trackEvent,
  sanitizeProjectType,
  resolveFormLocation,
} from './analytics'

const IDLE_LABEL = 'Send project inquiry'
const BUSY_LABEL = 'Sending…'
const HONEYPOT_NAME = '_gotcha'
const AUTOFILL_CLEAR_MS = [0, 50, 250, 1000]
const FORM_TYPE = 'project_inquiry'
const REQUEST_TIMEOUT_MS = 30000

export function getHoneypotInput(form) {
  return form.querySelector('input[name="' + HONEYPOT_NAME + '"]')
}

/** Ensure the honeypot is empty and not editable by accident. */
export function resetHoneypot(form) {
  const gotcha = getHoneypotInput(form)
  if (!gotcha) return null
  gotcha.value = ''
  gotcha.setAttribute('readonly', 'readonly')
  gotcha.setAttribute('autocomplete', 'new-password')
  return gotcha
}

/**
 * Build FormData for Formspree. Does not invent or remap `_gotcha`.
 * Exported for regression tests.
 */
export function buildContactFormData(form) {
  return new FormData(form)
}

function readProjectType(form) {
  const selected = form.querySelector('input[name="project_type"]:checked')
  return sanitizeProjectType(selected ? selected.value : '')
}

export function initContactForm() {
  const form = document.getElementById('contact-form')
  const responseElement = document.getElementById('form-response')
  const submitBtn = document.getElementById('contact-submit')
  if (!form || !responseElement) return

  let isSubmitting = false
  let formStartSent = false
  let leadSentForAttempt = false
  const formLocation = resolveFormLocation()

  resetHoneypot(form)
  AUTOFILL_CLEAR_MS.forEach(function (ms) {
    setTimeout(function () {
      resetHoneypot(form)
    }, ms)
  })

  function markFormStart() {
    if (formStartSent) return
    formStartSent = true
    trackEvent('contact_form_start', {
      form_location: formLocation,
      form_type: FORM_TYPE,
    })
  }

  // User engagement only (input/change)
  form.addEventListener('input', function (event) {
    const t = event.target
    if (!t || !t.name) return
    if (t.name === 'email' || t.name === 'message' || t.name === 'project_type') {
      markFormStart()
    }
  })
  form.addEventListener('change', function (event) {
    const t = event.target
    if (!t || t.name !== 'project_type') return
    markFormStart()
  })

  function setStatus(message, type) {
    responseElement.hidden = !message
    responseElement.textContent = message || ''
    responseElement.classList.remove(
      'contact-status--success',
      'contact-status--error',
      'contact-status--pending'
    )
    if (type) responseElement.classList.add('contact-status--' + type)
  }

  function setSubmitting(busy) {
    isSubmitting = busy
    if (!submitBtn) return
    submitBtn.disabled = busy
    submitBtn.setAttribute('aria-busy', busy ? 'true' : 'false')
    const label = submitBtn.querySelector('.contact-submit__label')
    if (label) label.textContent = busy ? BUSY_LABEL : IDLE_LABEL
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (isSubmitting) return

    const email = form.querySelector('[name="email"]')
    const message = form.querySelector('[name="message"]')
    if (email && !email.checkValidity()) {
      setStatus('Please enter a valid email address.', 'error')
      trackEvent('contact_form_error', {
        form_location: formLocation,
        error_type: 'validation',
      })
      email.focus()
      return
    }
    if (message && !message.checkValidity()) {
      setStatus('Please include a short project description.', 'error')
      trackEvent('contact_form_error', {
        form_location: formLocation,
        error_type: 'validation',
      })
      message.focus()
      return
    }

    // Do not clear `_gotcha` here — a filled honeypot is a bot signal for Formspree.
    // Also do not assign email/message/project_type into it.
    const projectType = readProjectType(form)
    const formData = buildContactFormData(form)
    const xhr = new XMLHttpRequest()
    leadSentForAttempt = false

    const submitParams = {
      form_location: formLocation,
      form_type: FORM_TYPE,
    }
    if (projectType) submitParams.project_type = projectType
    trackEvent('contact_form_submit', submitParams)

    setSubmitting(true)
    setStatus('Sending…', 'pending')

    xhr.open('POST', form.action, true)
    xhr.timeout = REQUEST_TIMEOUT_MS
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.onload = function () {
      setSubmitting(false)

      if (xhr.status === 200) {
        // Primary conversion — Formspree accepted the HTTP submission.
        // Limitation: client-side cannot verify Inbox vs spam folder placement.
        if (!leadSentForAttempt) {
          leadSentForAttempt = true
          const leadParams = {
            form_location: formLocation,
            form_type: FORM_TYPE,
          }
          if (projectType) leadParams.project_type = projectType
          trackEvent('generate_lead', leadParams)
        }
        setStatus("Thanks for reaching out. I'll get back to you soon.", 'success')
        form.reset()
        resetHoneypot(form)
        return
      }

      if (xhr.status === 422) {
        trackEvent('contact_form_error', {
          form_location: formLocation,
          error_type: 'validation',
        })
        try {
          const data = JSON.parse(xhr.responseText)
          const err = data.errors && data.errors[0]
          if (err && err.field === 'email') {
            setStatus('Please enter a valid email address.', 'error')
          } else if (err && err.message) {
            setStatus(err.message, 'error')
          } else {
            setStatus('Could not send — please check the fields and try again.', 'error')
          }
        } catch (e) {
          setStatus(
            'Something went wrong. Please try again or email hello@okcd.io directly.',
            'error'
          )
        }
        return
      }

      if (xhr.status === 429) {
        trackEvent('contact_form_error', {
          form_location: formLocation,
          error_type: 'server',
        })
        setStatus('Too many attempts. Please wait a moment, then try again.', 'error')
        return
      }

      trackEvent('contact_form_error', {
        form_location: formLocation,
        error_type: 'server',
      })
      setStatus(
        'Something went wrong. Please try again or email hello@okcd.io directly.',
        'error'
      )
    }

    xhr.onerror = function () {
      setSubmitting(false)
      trackEvent('contact_form_error', {
        form_location: formLocation,
        error_type: 'network',
      })
      setStatus(
        'Network error — check your connection, or email hello@okcd.io directly.',
        'error'
      )
    }

    xhr.ontimeout = function () {
      setSubmitting(false)
      trackEvent('contact_form_error', {
        form_location: formLocation,
        error_type: 'timeout',
      })
      setStatus(
        'The request timed out. Please try again or email hello@okcd.io directly.',
        'error'
      )
    }

    xhr.send(formData)
  })
}
