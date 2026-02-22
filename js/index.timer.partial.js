// Встановіть дату закінчення (наприклад, +3 дні від зараз)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3); /*встановлюємо день + 3 (getDate і setDate)*/

function updateTimer() {
  const now = new Date().getTime();
  const distance = targetDate - now; /*targetDate автоматично переводиться в мілісекунди*/

  if (distance < 0) {
    clearInterval(timerInterval);
    return;
  }

  // Розрахунок часу
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Вивід у HTML
  document.querySelector(".timer__value--days").innerText = days.toString().padStart(2, '0'); /*padStart(2, '0') - додає провідні нулі до числа, щоб воно завжди було двозначним*/
  document.querySelector(".timer__value--hours").innerText = hours.toString().padStart(2, '0');
  document.querySelector(".timer__value--minutes").innerText = minutes.toString().padStart(2, '0');
  document.querySelector(".timer__value--seconds").innerText = seconds.toString().padStart(2, '0');
}

// Запуск таймера щосекунди
const timerInterval = setInterval(updateTimer, 500);
updateTimer(); // Початковий виклик