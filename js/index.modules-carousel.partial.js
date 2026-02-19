const slides = [
  `<div class="modules__card">
    <img
      class="modules__card-image"
      src="img/module-1.png"
      alt="Module 1 Image"
    />
    <h3 class="modules__card-title">Module 1</h3>
    <p class="modules__card-description">
      Lay the groundwork with powerful principles and proven methods that set
      you up for lasting momentum.
    </p>
    <ul class="modules__card-list">
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Discover core habits that
        drive long-term success;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Identify and eliminate
        hidden obstacles early;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Build a mindset that fuels
        progress and resilience.
      </li>
    </ul>
  </div>`,
  `<div class="modules__card">
    <img
      class="modules__card-image"
      src="img/module-2.png"
      alt="Module 2 Image"
    />
    <h3 class="modules__card-title">Module 2</h3>
    <p class="modules__card-description">
      Get clear on where you're headed and craft an intentional plan to move
      forward with purpose and confidence.
    </p>
    <ul class="modules__card-list">
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Define your big-picture
        goals and priorities;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Create a simple roadmap
        tailored to your strengths;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Set milestones to keep you
        focused and motivated.
      </li>
    </ul>
  </div>`,
  `<div class="modules__card">
    <img
      class="modules__card-image"
      src="img/module-3.png"
      alt="Module 3 Image"
    />
    <h3 class="modules__card-title">Module 3</h3>
    <p class="modules__card-description">
      Shape your ideas, services, or products into something valuable,
      impactful, and aligned with your goals.
    </p>
    <ul class="modules__card-list">
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Clarify the unique value
        you bring to the table;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Package your skills, or
        services effectively;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Position yourself in a way
        to attract your audience.
      </li>
    </ul>
  </div>`,
  `<div class="modules__card">
    <img
      class="modules__card-image"
      src="img/module-4.png"
      alt="Module 4 Image"
    />
    <h3 class="modules__card-title">Module 4</h3>
    <p class="modules__card-description">
      Discover simple, scalable systems that save you time, reduce stress, and
      keep you moving consistently.
    </p>
    <ul class="modules__card-list">
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Streamline daily processes
        to eliminate overwhelm;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Set up workflows that fit
        your personal style;
      </li>
      <li class="modules__card-list-item">
        <span class="modules__card-list-icon"></span>Use simple tools to stay
        organized and efficient.
      </li>
    </ul>
  </div>`,
];

let currentSlideIdx = 0;
const btnNext = document.querySelector(".modules-carousel__button--next");
const btnPrev = document.querySelector(".modules-carousel__button--prev");

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
renderCarousel(slides);

window.addEventListener("resize", () => renderCarousel(slides));