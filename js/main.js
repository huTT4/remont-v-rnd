// ========================= Бургер меню =========================
const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header__content')

burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  headerContent.classList.toggle('active')
})

//  =========================Изменение текста в таблице =========================
function updateInvid() {
  const el = document.querySelector('.services__invid')
  if (window.innerWidth <= 700) {
    el.textContent = 'Индив.'
  } else {
    el.textContent = 'Индивидуально'
  }
}
updateInvid()
window.addEventListener('resize', updateInvid)

// ========================= Галерея (Fancybox) =========================
Fancybox.bind('[data-fancybox="gallery"]', {
  placeFocusBack: false
})

// ========================= Слайдер (Swiper) =========================
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    800: {
      slidesPerView: 3,
    },
    1100: {
      spaceBetween: 20,
    }
  }
})

// ========================= Маска для телефона в форме =========================
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
  let x = e.target.value.replace(/\D/g, '') // оставляем только цифры
  if (x.startsWith('8')) x = '7' + x.slice(1) // если начали с 8 → меняем на 7
  if (x.length > 11) x = x.slice(0, 11) // максимум 11 цифр для России

  let formatted = '+7 '
  if (x.length > 1) formatted += '(' + x.slice(1, 4)
  if (x.length >= 5) formatted += ') ' + x.slice(4, 7)
  if (x.length >= 8) formatted += '-' + x.slice(7, 9)
  if (x.length >= 10) formatted += '-' + x.slice(9, 11)

  e.target.value = formatted
})

// ========================= Настройки формы =========================
const form = document.getElementById('contact-form')
const alert = document.querySelector('.alert')
const alertSuccesImg = document.getElementById('success')
const alertErrorImg = document.getElementById('error')
const result = document.getElementById('result')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const formData = new FormData(form)
  const object = Object.fromEntries(formData)
  const json = JSON.stringify(object)
  alertSuccesImg.style.display = 'none'
  alertErrorImg.style.display = 'none'
  alert.classList.add('active')
  result.textContent = "Пожалуйста подождите..."

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json()
      if (response.status == 200) {
        alert.classList.add('active')
        alertSuccesImg.style.display = 'block'
        result.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
      } else {
        console.log(response)
        alertSuccesImg.style.display = 'block'
        alert.classList.add('active')
        result.textContent = json.message
      }
    })
    .catch(error => {
      console.log(error)
      alertSuccesImg.style.display = 'none'
      alertErrorImg.style.display = 'block'
      alert.classList.add('active')
      result.textContent = "Что-то пошло не так!"
    })
    .then(function () {
      form.reset()
      setTimeout(() => {
        alert.classList.remove('active')
      }, 3000)
    })
})

// Закрытие уведомления (модалки) при клике по оверлею
const alertOverlay = document.querySelector('.alert__overlay')
alertOverlay.addEventListener('click', () => {
  alert.classList.remove('active')
})
