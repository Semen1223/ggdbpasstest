const slider = document.querySelector('.slider'); // вся область слайдера
const slides = document.querySelector('.slides'); // контейнер всех слайдов
const slideItems = document.querySelectorAll('.slide'); // отдельные слайды
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// создаём точки
slideItems.forEach((_, index) => {
  const dot = document.createElement('span');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dots span');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function showSlide(index) {
  if (index < 0) index = slideItems.length - 1;
  if (index >= slideItems.length) index = 0;
  currentIndex = index;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

// свайп
slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

slider.addEventListener('touchend', e => {
  if (!isDragging) return;
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (diff > 50) {
    // свайп влево
    showSlide(currentIndex + 1);
  } else if (diff < -50) {
    // свайп вправо
    showSlide(currentIndex - 1);
  }

  isDragging = false;
});