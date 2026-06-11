// --- HEADROOM ---
import Headroom from "headroom.js";

export function initHeadroom() {
  const headerElement = document.querySelector(".header");
  if (headerElement) {
    const headroom = new Headroom(headerElement);
    headroom.init();
  }
}

// --- MENU ACTIVE SPY ---

export function initScrollSpy() {
  const navLinks = document.querySelectorAll(".header__link");
  const targets = document.querySelectorAll("section[id], footer[id]");
  const visibleSections = new Set();

  const updateActiveLink = (id) => {
    if (!id) return;
    navLinks.forEach((link) => link.classList.remove("active"));
    const activeLink = document.querySelector(`.header__link[href="#${id}"]`);
    if (activeLink) activeLink.classList.add("active");
  };

  const checkAndApplyActiveLink = () => {
    // Controlliamo se ci troviamo in fondo alla pagina
    const isAtBottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 50;

    if (isAtBottom) {
      // Se siamo in fondo, vince il footer
      updateActiveLink("contact");
    } else {
      // Altrimenti, tra le sezioni attualmente visibili, diamo priorità a quella più in basso
      const activeId = Array.from(targets)
        .reverse()
        .find((target) => visibleSections.has(target.id))?.id;
      updateActiveLink(activeId);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");

        // Se entra nello schermo la aggiungiamo alla lista, se esce la togliamo
        if (entry.isIntersecting) {
          visibleSections.add(id);
        } else {
          visibleSections.delete(id);
        }
      });

      // Ad ogni movimento, calcoliamo chi deve accendersi
      checkAndApplyActiveLink();
    },
    {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0,
    },
  );

  // Mettiamo in ascolto tutte le sezioni e il footer
  targets.forEach((target) => observer.observe(target));

  window.addEventListener("scroll", () => {
    checkAndApplyActiveLink();
  });
}

// --- MOBILE MENU ---
export function initMobileMenu() {
  const toggleBtn = document.querySelector(".header__toggle");
  const nav = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".header__link");

  if (!toggleBtn || !nav) return;

  const closeMenu = () => {
    toggleBtn.classList.remove("is-open");
    nav.classList.remove("is-open");
  };

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("is-open");
    nav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      link.blur();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
    }

    // Tab navigation
    if (event.key === "Tab" && nav.classList.contains("is-open")) {
      const focusableElements = nav.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        closeMenu();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (
          document.activeElement === firstElement ||
          document.activeElement === toggleBtn
        ) {
          closeMenu();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          closeMenu();
        }
      }
    }
  });

  document.addEventListener("click", (event) => {
    const isMenuOpen = nav.classList.contains("is-open");
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = toggleBtn.contains(event.target);

    if (isMenuOpen && !isClickInsideNav && !isClickOnToggle) {
      closeMenu();
    }
  });
}
