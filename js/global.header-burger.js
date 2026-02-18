const burger = document.querySelector(".header-nav__menu-button"); /*записуємо в змінні DOM‑елементи:*/
const nav = document.querySelector(".header-nav__menu");
const menuLinks = document.querySelectorAll(".header-nav__menu-link"); /*Шукає всі елементи з класом .header-nav__menu-link і створює зі списку масив*/

function toggleMenu() {
  burger.classList.toggle("is-active");
  nav.classList.toggle("is-open");
  document.body.classList.toggle("no-scroll"); 
}

function closeMenu() {
  burger.classList.remove("is-active");
  nav.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

burger.addEventListener("click", toggleMenu);

menuLinks.forEach((link) => { /*Коли користувач клікає на будь-яке посилання, викликається closeMenu, і меню автоматично зникає. */
  link.addEventListener("click", closeMenu);
});