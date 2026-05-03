const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
const progressBar = document.getElementById("progressBar");

let current = 0;

/* DOTS */
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.onclick = () => goTo(i);
  dotsContainer.appendChild(dot);
});

function goTo(n) {
  slides[current].classList.remove("active");
  document.querySelectorAll(".dot")[current].classList.remove("active");

  current = (n + slides.length) % slides.length;

  slides[current].classList.add("active");
  document.querySelectorAll(".dot")[current].classList.add("active");

  progressBar.style.width = ((current + 1) / slides.length) * 100 + "%";
}

function changeSlide(dir) {
  goTo(current + dir);
}

/* SWIPE */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let diff = startX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) changeSlide(1);
    else changeSlide(-1);
  }
});

/* INIT */
progressBar.style.width = (1 / slides.length) * 100 + "%";
