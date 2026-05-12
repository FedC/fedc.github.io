/**
 * Formspree contact form — preserves existing endpoint and XHR behavior.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form')
  const responseElement = document.getElementById('form-response')
  if (!form || !responseElement) return

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(form)
    const xhr = new XMLHttpRequest()

    responseElement.style.display = 'block'
    responseElement.textContent = 'Sending...'
    responseElement.style.color = ''

    xhr.open('POST', form.action, true)
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.onload = function () {
      if (xhr.status === 200) {
        responseElement.textContent = 'Thank you — message sent.'
        responseElement.style.color = 'rgb(144, 238, 144)'
        form.reset()
        form.querySelectorAll('.input__field').forEach(function (field) {
          field.classList.remove('input--filled')
        })
      } else if (xhr.status === 422) {
        try {
          const data = JSON.parse(xhr.responseText)
          const err = data.errors && data.errors[0]
          if (err && err.field === 'email') {
            responseElement.textContent = 'Please enter a valid email address.'
          } else if (err && err.message) {
            responseElement.textContent = err.message
          } else {
            responseElement.textContent = 'Could not send — please check the fields.'
          }
          responseElement.style.color = 'rgb(255, 160, 160)'
        } catch (e) {
          console.error('Error parsing Formspree response:', e)
          responseElement.textContent = 'Something went wrong. Try again in a moment.'
          responseElement.style.color = 'rgb(255, 160, 160)'
        }
      } else if (xhr.status === 400) {
        responseElement.textContent = 'Could not send — please try again.'
        responseElement.style.color = 'rgb(255, 160, 160)'
      } else {
        responseElement.textContent = 'Unexpected response. Please try again.'
        responseElement.style.color = 'rgb(255, 160, 160)'
      }
    }

    xhr.onerror = function () {
      responseElement.textContent = 'Network error — check your connection and retry.'
      responseElement.style.color = 'rgb(255, 160, 160)'
    }

    xhr.send(formData)
  })

  form.querySelectorAll('.input__field').forEach(function (input) {
    if (input.value) {
      input.classList.add('input--filled')
    }
    input.addEventListener('focus', function () {
      input.classList.add('input--filled')
    })
    input.addEventListener('blur', function () {
      if (input.value === '') {
        input.classList.remove('input--filled')
      }
    })
  })
}
