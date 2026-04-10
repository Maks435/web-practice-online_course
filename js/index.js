function init() {
  import("./global.header-burger.js");
  import("./index.modules-carousel.partial.js");
  import("./index.timer.partial.js");
  import("./index.questions-list.partial.js");
  import("./index.perfect-for.partial.js");
  import("./index.order-modal.partial.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});