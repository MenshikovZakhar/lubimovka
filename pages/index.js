import { toggleNav, closeNav, toggleHeader } from '../scripts/components/nav.js';

/* ---------------Запуск видео--------------- */
const videoPlayButton = document.querySelector('.video__play-button');
const video = document.querySelector('.video__element');

const playVideo = evt => {
  evt.target.classList.add('video__play-button_hide');
  video.play();
  video.controls = true;
}

videoPlayButton.addEventListener('click', playVideo);

new Swiper(".swiper", {
  //Стрелки
  navigation: {
    nextEl: ".slider-comments__button_next",
    prevEl: ".slider-comments__button_prev",
  },
  //Навигация
  //Буллеты, текущее положение, прогрессбар
  pagination: {
    el: ".swiper-pagination",
    //Буллиты
    clickable: true,
  },
  //Количество отображений слайдев
  //!!! Так же можно поставить не целой число, а 1.5 например
  //Данное решение можно будет использовать для реализации на десктопе первого слайдера
  slidesPerView: 1,
  //Делаем бесконечную прокрутку
  loop: true,
});

const slides = Array.from(document.querySelectorAll('.slider__slide'))
const buttons = document.querySelectorAll('.slider-btn')
const dotsEl = document.querySelector('.slider__dots')
const dotActiveClass = 'slider__dot_active'
const slideActiveClass = 'slider__slide_active'
let timeoutId

function getNextPrev () {
  const activeSlide = document.querySelector('.slider__slide_active')
  const activeIndex = slides.indexOf(activeSlide)
  let next, prev
  if (activeIndex === slides.length - 1) {
    next = slides[0]
  } else {
    next = slides[activeIndex + 1]
  }
  if (activeIndex === 0) {
    prev = slides[slides.length - 1]
  } else {
    prev = slides[activeIndex - 1]
  }
  return [next, prev]
}
function getPosition () {
  const activeSlide = document.querySelector('.slider__slide_active')
  const activeIndex = slides.indexOf(activeSlide)
  const [next, prev] = getNextPrev()
  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = 'translateX(0)'
    } else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)'
    } else if (slide === next) {
      slide.style.transform = 'translateX(100%)'
    } else {
      slide.style.transform = 'translateX(100%)'
    }
    slide.addEventListener('transitionend', () => {
      slide.classList.remove('top')
    })
  })
}
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('next')) getNextSlide()
    else if (button.classList.contains('prev')) getPrevSlide()
  })
})
function getNextSlide () {
  clearInterval(timeoutId)
  const current = document.querySelector('.slider__slide_active')
  const [next, prev] = getNextPrev()
  if (current.classList.contains('top')) {
    return
  }
  current.classList.add('top')
  next.classList.add('top')
  current.style.transform = 'translate(-100%)'
  current.classList.remove(slideActiveClass)
  next.style.transform = 'translateX(0)'
  next.classList.add(slideActiveClass)
  getPosition()
  getActiveDot()
  autoLoop()
}
function getPrevSlide () {
  clearInterval(timeoutId)
  const current = document.querySelector('.slider__slide_active')
  const [next, prev] = getNextPrev()
  current.classList.add('top')
  prev.classList.add('top')
  current.style.transform = 'translate(100%)'
  current.classList.remove(slideActiveClass)
  prev.style.transform = 'translateX(0)'
  prev.classList.add(slideActiveClass)
  getPosition()
  getActiveDot()
  autoLoop()
}
getPosition()

// dots
slides.forEach(slide => {
  const dot = document.createElement('div')
  dot.classList.add('slider__dot')
  dotsEl.appendChild(dot)
})
function getActiveDot () {
  const allDots = dotsEl.querySelectorAll('.slider__dot')
  allDots.forEach(dot => {
    dot.classList.remove(dotActiveClass)
  })
  const activeSlide = document.querySelector('.slider__slide_active')
  const activeIndex = slides.indexOf(activeSlide)
  allDots[activeIndex].classList.add(dotActiveClass)
}
function functionalDots () {
  const allDots = dotsEl.querySelectorAll('.slider__dot')
  allDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      getDotSlide(index)
    })
  })
}
function getDotSlide (index) {
  clearTimeout(timeoutId)
  slides.forEach(slide => {
    slide.classList.remove(slideActiveClass)
  })
  const current = slides[index]
  current.classList.add(slideActiveClass)
  getPosition()
  getActiveDot()
  autoLoop()
}

function autoLoop () {
  timeoutId = setTimeout(() => {
    getNextSlide()
  }, 50000)
}
getActiveDot()
functionalDots()
autoLoop()
