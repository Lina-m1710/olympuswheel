$(document).ready(function () {
  ;(function () {
    function bodyReset() {
      var body = document.querySelector('body')
      var main = document.createElement('main')
      var title = document.createElement('h1')
      var message = document.createElement('p')
      body.innerHTML = ''
      main.style = 'width: 100%; padding: 50px; margin: auto;'
      title.style = 'width: 100%; text-align: center; color: rgb(127,127,127);'
      title.textContent = "Website's Error"
      message.style = 'width: 100%; text-align: center; color: rgb(0,0,0);'
      message.textContent =
        "Sorry, your browser doesn't support this website. Please, check your browser for updates now or try to use any other modern browsers."
      body.appendChild(main)
      main.appendChild(title)
      main.appendChild(message)
    }

    if (
      navigator.userAgent.indexOf('MSIE') > -1 ||
      navigator.userAgent.indexOf('Trident') > -1
    ) {
      bodyReset()
    }

    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
      if (parseInt(v[1], 10) <= 9) {
        bodyReset()
      }
    }
  })()

  // closest polyfill
  ;(function (ELEMENT) {
    ELEMENT.matches =
      ELEMENT.matches ||
      ELEMENT.mozMatchesSelector ||
      ELEMENT.msMatchesSelector ||
      ELEMENT.oMatchesSelector ||
      ELEMENT.webkitMatchesSelector
    ELEMENT.closest =
      ELEMENT.closest ||
      function closest(selector) {
        if (!this) return null
        if (this.matches(selector)) return this
        if (!this.parentElement) {
          return null
        } else return this.parentElement.closest(selector)
      }
  })(Element.prototype)

  // remove polyfill
  ;(function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this)
        },
      })
    })
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype])
})

// SPINNING
var lastSpin = false
var spinning = false
var timer

$(document).ready(function () {
  function firstSpinCompleted() {
    spinning = false
    lastSpin = true
    $('.popup').removeClass('active')
    $('.popup.first-spin').addClass('active')
    $('.main__wheel, .main__image, .footer').css('opacity', '0')
    document.getElementById('winfs').volume = 0.6
    document.getElementById('winfs').play()
  }

  function lastSpinCompleted() {
    spinning = false
    lastSpin = true
    $('.popup').removeClass('active')
    $('.popup.last-spin').addClass('active')
    $('.main__wheel, .main__image, .footer').css('opacity', '1')
    document.getElementById('winfs').volume = 0.6
    document.getElementById('winfs').play()
    document.getElementById('wheel').pause()
  }

  $('.button, .main-wheel__title-additional').on('click', function () {
    if (!spinning) {
      if (!lastSpin) {
        $('.main-wheel__image').addClass('first-spin')
        spinning = true
        setTimeout(firstSpinCompleted, 5000)
      } else {
        $('.popup').removeClass('active')
        $('.main-wheel__image').removeClass('first-spin')
        spinning = false
        if (timer) {
          clearTimeout(timer)
        } else {
          timer = setTimeout(lastSpinCompleted, 5000)
        }
      }
    }
  })

  $('.main-wheel__button, .main-wheel__title-additional').on(
    'click',
    function () {
      if (spinning) {
        document.getElementById('wheel').volume = 0.6
        document.getElementById('wheel').play()
      }
    }
  )
})

document.addEventListener('DOMContentLoaded', function () {
  const userLang = navigator.language || navigator.userLanguage
  const defaultLang = userLang.startsWith('se') ? 'se' : 'no'
  setLanguage(defaultLang)

  document.getElementById('no').addEventListener('click', function () {
    setLanguage('no')
  })

  document.getElementById('se').addEventListener('click', function () {
    setLanguage('se')
  })

  function setLanguage(lang) {
    document.documentElement.lang = lang

    document.querySelectorAll('[data-no]').forEach((element) => {
      if (element.tagName === 'IMG') {
        const imgSrc = element.getAttribute(`data-${lang}`)
        element.setAttribute('src', imgSrc)
      } else {
        const text = element.getAttribute(`data-${lang}`)
        element.innerText = text
      }
    })
  }
})
