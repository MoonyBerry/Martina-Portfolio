import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSkillsAnimations() {
  const cards = document.querySelectorAll(".skill-card");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    cards.forEach((card, index) => {
      gsap.from(card, {
        scale: 0, // Partono piccoli
        rotation: -360, // Rotazione di partenza
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      let hoverTween;

      // Animazione Hover (Mouse Enter)
      card.addEventListener("mouseenter", () => {
        if (hoverTween) hoverTween.kill();

        hoverTween = gsap.to(card, {
          delay: 0.5,
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: false,
        });
      });

      // Animazione Hover (Mouse Leave)
      card.addEventListener("mouseleave", () => {
        if (hoverTween) hoverTween.kill();

        hoverTween = gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
          overwrite: false,
        });
      });
    });
  });
}
