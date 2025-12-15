const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationID = 0;

// точки
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

function setPosition() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

function showSlide(index) {
  if (index < 0) index = 0;
  if (index >= slideItems.length) index = slideItems.length - 1;

  currentIndex = index;
  currentTranslate = -currentIndex * slider.offsetWidth;
  prevTranslate = currentTranslate;

  slides.style.transition = 'transform 0.3s ease';
  setPosition();
  updateDots();
}

// ---------- Touch events ----------

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

function touchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  slides.style.transition = 'none';
}

function touchMove(e) {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  currentTranslate = prevTranslate + diff;
  setPosition();
}

function touchEnd() {
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;
  const threshold = slider.offsetWidth / 2;

  if (movedBy < -threshold && currentIndex < slideItems.length - 1) {
    currentIndex++;
  }

  if (movedBy > threshold && currentIndex > 0) {
    currentIndex--;
  }

  showSlide(currentIndex);
}
