import gsap from "gsap";
import { initHeadroom, initScrollSpy, initMobileMenu } from "./js/header.js";
import { initHeroAnimations } from "./js/hero.js";
import { initProjectsAnimations } from "./js/projects.js";
import { initSkillsAnimations } from "./js/skills.js";

// INIT
initHeadroom();
initScrollSpy();
initMobileMenu();
initHeroAnimations();
initProjectsAnimations();
initSkillsAnimations();

// --- RESIZE ANIMATION ---
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
