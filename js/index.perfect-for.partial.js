async function renderPerfectFor() {
  const container = document.querySelector("#perfect-for-container");

  try {
    // 1. Отримуємо дані з локального файлу
    const response = await fetch("api/perfect-for.json");
    const data = await response.json();

    // 2. Створюємо HTML для кожної картки
    const cardsHTML = data.map(item => {
      // Перевіряємо, чи має картка бути помаранчевою
      const highlightClass = item.isHighlighted ? "card--orange" : "";

      
      return `
        <div class="card ${highlightClass}">
          <span class="card__number">${item.id}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__description">${item.description}</p>
          <div class="card__icon">✦</div>
        </div>
      `;
    }).join(""); // Об'єднуємо масив рядків в один довгий рядок

    // 3. Вставляємо в контейнер
    container.innerHTML = cardsHTML;

  } catch (error) {
    console.error("Помилка завантаження карток:", error);
  }
}

// Запускаємо функцію
renderPerfectFor();