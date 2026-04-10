(function initQuestionsAccordion() {
	const root = document.querySelector("[data-questions]");
	if (!root) return;

	const items = Array.from(root.querySelectorAll(".questions__item"));
	const prefersReducedMotion = window.matchMedia?.(
		"(prefers-reduced-motion: reduce)"
	)?.matches;
	const panelEndHandlers = new WeakMap();

	function cleanupPanelTransition(panel) {
		const prev = panelEndHandlers.get(panel);
		if (prev) panel.removeEventListener("transitionend", prev);
		panelEndHandlers.delete(panel);
	}

	function openPanel(panel) {
		cleanupPanelTransition(panel);
		panel.hidden = false;
		panel.style.overflow = "hidden";
		panel.style.height = "0px";
		panel.getBoundingClientRect();
		panel.style.height = `${panel.scrollHeight}px`;

		const onEnd = (event) => {
			if (event.propertyName !== "height") return;
			cleanupPanelTransition(panel);
			panel.style.height = "auto";
			panel.style.overflow = "";
		};

		panel.addEventListener("transitionend", onEnd);
		panelEndHandlers.set(panel, onEnd);
	}

	function closePanel(panel) {
		cleanupPanelTransition(panel);
		if (panel.hidden) return;

		panel.style.overflow = "hidden";
		panel.style.height = `${panel.scrollHeight}px`;
		panel.getBoundingClientRect();
		panel.style.height = "0px";

		const onEnd = (event) => {
			if (event.propertyName !== "height") return;
			cleanupPanelTransition(panel);
			panel.hidden = true;
			panel.style.height = "";
			panel.style.overflow = "";
		};

		panel.addEventListener("transitionend", onEnd);
		panelEndHandlers.set(panel, onEnd);
	}

	function setItemOpen(item, shouldOpen, options = {}) {
		const { animate = true } = options;
		const toggle = item.querySelector(".questions__toggle");
		const panel = item.querySelector(".questions__panel");
		if (!toggle || !panel) return;

		item.classList.toggle("is-open", shouldOpen);
		toggle.setAttribute("aria-expanded", String(shouldOpen));

		if (prefersReducedMotion || !animate) {
			cleanupPanelTransition(panel);
			panel.hidden = !shouldOpen;
			panel.style.height = shouldOpen ? "auto" : "";
			panel.style.overflow = "";
			return;
		}

		if (shouldOpen) openPanel(panel);
		else closePanel(panel);
	}

	// Normalize initial state (based on markup / class)
	for (const item of items) {
		const shouldOpen = item.classList.contains("is-open");
		setItemOpen(item, shouldOpen, { animate: false });
	}

	root.addEventListener("click", (event) => {
		const toggle = event.target.closest(".questions__toggle");
		if (!toggle || !root.contains(toggle)) return;

		const item = toggle.closest(".questions__item");
		if (!item) return;

		const isOpen = item.classList.contains("is-open");
		setItemOpen(item, !isOpen);
	});
})();
