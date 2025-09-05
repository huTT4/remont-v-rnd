// Бургер меню
const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header__content')

burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  headerContent.classList.toggle('active')
})

// Галерея (Fancybox)
Fancybox.bind('[data-fancybox="gallery"]', {
  placeFocusBack: false
})

// Слайдер (Swiper)
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
