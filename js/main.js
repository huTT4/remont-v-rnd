// BURGER
const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header__content')

burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  headerContent.classList.toggle('active')
})
