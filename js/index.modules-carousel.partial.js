// 1. Додай константи для підключення (візьми їх у налаштуваннях Supabase)
const SUPABASE_URL = 'https://drkedexlaapzbdezdspf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRya2VkZXhsYWFwemJkZXpkc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjU1MTYsImV4cCI6MjA5MTE0MTUxNn0.S6afAvhI8EKQJLTKy3DlGARixFxbzpm4IF-3ldeszKo';

let slides = [];
let currentSlideIdx = 0;
const btnNext = document.querySelector(".modules-carousel__button--next");
const btnPrev = document.querySelector(".modules-carousel__button--prev");

// Функція створення слайда залишається ТАКОЮ САМОЮ
function createSlide(module) {
    const listItems = module.items
        .map((it) => `<li class="modules__card-list-item"><span class="modules__card-list-icon"></span>${it}</li>`)
        .join("\n");
        
    return `<div class="modules__card">
        <img class="modules__card-image" src="${module.image}" alt="${module.alt}" />
        <h3 class="modules__card-title">${module.title}</h3>
        <p class="modules__card-description">${module.description}</p>
        <ul class="modules__card-list">${listItems}</ul>
    </div>`;
}

// 2. Оновлена функція ініціалізації
async function initCarousel() {
    try {
        // Запит до Supabase замість локального JSON
        const response = await fetch(`${SUPABASE_URL}/rest/v1/online_course?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            }
        });

        if (!response.ok) throw new Error('Помилка завантаження даних');

        const modules = await response.json();
        console.log("Дані отримано:", modules);
        
        // Сортуємо модулі по ID (опціонально), щоб вони не перемішувалися
        modules.sort((a, b) => a.id - b.id);

        slides = modules.map(createSlide);
        renderCarousel(slides);
    } catch (error) {
        console.error("Error loading modules from backend:", error);
    }
}

// Рендер і кнопки залишаються без змін...
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
    if (slides.length === 0) return;
    
    const container = document.querySelector(".modules-carousel__slides");
    container.innerHTML = slides[currentSlideIdx];

    if (window.matchMedia("(min-width: 600px)").matches) {
        const secondSlideIdx = (currentSlideIdx + 1) % slides.length;
        container.innerHTML += slides[secondSlideIdx];
        
        if (window.matchMedia("(min-width: 900px)").matches) {
            const thirdSlideIdx = (currentSlideIdx + 2) % slides.length;
            container.innerHTML += slides[thirdSlideIdx];
        }
    }
}

initCarousel();
window.addEventListener("resize", () => renderCarousel(slides));