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
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".header__link");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.header__link[href="#${currentId}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
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
    link.addEventListener("click", closeMenu);
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
