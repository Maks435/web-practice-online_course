// 1. Налаштування Supabase (використовуємо твої ключі)
const SUPABASE_URL = 'https://drkedexlaapzbdezdspf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRya2VkZXhsYWFwemJkZXpkc3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NjU1MTYsImV4cCI6MjA5MTE0MTUxNn0.S6afAvhI8EKQJLTKy3DlGARixFxbzpm4IF-3ldeszKo'; // встав сюди свій ключ

// 2. Пошук елементів
const modal = document.querySelector("#shopping-cart-modal");
const openModalBtns = document.querySelectorAll(".button-join"); // клас твоєї кнопки "Join the course"
const closeBtn = document.querySelector(".order-modal__close");
const orderForm = document.querySelector("#order-form"); 

// 3. Функції відкриття та закриття
function openModal(e) {
    if (e) e.preventDefault();
    modal.style.display = "flex"; // використовуємо flex для центрування
    document.body.style.overflow = "hidden"; // вимикаємо скрол сторінки
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ""; // повертаємо скрол
}

// 4. Слухачі подій
// Відкриваємо при кліку на будь-яку кнопку замовлення
openModalBtns.forEach(btn => btn.addEventListener("click", openModal));

// Закриваємо при кліку на "X"
closeBtn.addEventListener("click", closeModal);

// Закриваємо при кліку на фон (поза контентом модалки)
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// 5. Відправка форми в Supabase
orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Збираємо дані з полів (використовуємо name="...")
    const formData = new FormData(orderForm);
    const orderObject = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        comment: formData.get("comment"),
    };

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/online_course_orders`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(orderObject)
        });

        if (response.ok) {
            alert("Замовлення успішно відправлено!");
            orderForm.reset();
            closeModal();
        } else {
            throw new Error("Помилка сервера");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Сталася помилка. Перевірте консоль.");
    }
});