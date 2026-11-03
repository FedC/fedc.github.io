/**
 * Formspree project inquiry — endpoint preserved; honeypot + loading/disabled UX.
 * Extra fields (e.g. project_type radios) submit via FormData automatically.
 */
const IDLE_LABEL = 'Send project inquiry'
const BUSY_LABEL = 'Sending…'

export function initContactForm() {
  const form = document.getElementById('contact-form')
  const responseElement = document.getElementById('form-response')
  const submitBtn = document.getElementById('contact-submit')
  if (!form || !responseElement) return

  let isSubmitting = false

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
      email.focus()
      return
    }
    if (message && !message.checkValidity()) {
      setStatus('Please include a short project description.', 'error')
      message.focus()
      return
    }

    const formData = new FormData(form)
    const xhr = new XMLHttpRequest()

    setSubmitting(true)
    setStatus('Sending…', 'pending')

    xhr.open('POST', form.action, true)
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.onload = function () {
      setSubmitting(false)

      if (xhr.status === 200) {
        setStatus("Thanks for reaching out. I'll get back to you soon.", 'success')
        form.reset()
        return
      }

      if (xhr.status === 422) {
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
        setStatus('Too many attempts. Please wait a moment, then try again.', 'error')
        return
      }

      setStatus(
        'Something went wrong. Please try again or email hello@okcd.io directly.',
        'error'
      )
    }

    xhr.onerror = function () {
      setSubmitting(false)
      setStatus(
        'Network error — check your connection, or email hello@okcd.io directly.',
        'error'
      )
    }

    xhr.send(formData)
  })
}
