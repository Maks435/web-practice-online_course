function createSlide(module) {
  const listItems = module.items
    .map(
      (it) => `<li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>${it}
      </li>`,
    )
    .join("\n");
  return `<div class="modules__card">
    <img
      class="modules__card-image"
      src="${module.image}"
      alt="${module.alt}"
    />
    <h3 class="modules__card-title">${module.title}</h3>
    <p class="modules__card-description">
      ${module.description}
    </p>
    <ul class="modules__card-list">
      ${listItems}
    </ul>
  </div>`;
}

let slides = [];
let currentSlideIdx = 0;
const btnNext = document.querySelector(".modules-carousel__button--next");
const btnPrev = document.querySelector(".modules-carousel__button--prev");

async function initCarousel() {
  try {
    const response = await fetch("api/products.json");
    const modules = await response.json();
    slides = modules.map(createSlide);
    renderCarousel(slides);
  } catch (error) {
    console.error("Error loading modules:", error);
  }
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

function prevSlide() {
  currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
  renderCarousel(slides);
}
function nextSlide() {
  currentSlideIdx = (currentSlideIdx + 1) % slides.length;
  renderCarousel(slides);
}

function renderCarousel(slides) {
  document.querySelector(".modules-carousel__slides").innerHTML =
    slides[currentSlideIdx];
  if (window.matchMedia("(min-width: 600px)").matches) {
    const secondSlideIdx = (currentSlideIdx + 1) % slides.length;
    document.querySelector(".modules-carousel__slides").innerHTML +=
      slides[secondSlideIdx];
    if (window.matchMedia("(min-width: 900px)").matches) {
      const thirdSlideIdx = (currentSlideIdx + 2) % slides.length;
      document.querySelector(".modules-carousel__slides").innerHTML +=
        slides[thirdSlideIdx];
    }
  }
}

initCarousel();

window.addEventListener("resize", () => renderCarousel(slides));
