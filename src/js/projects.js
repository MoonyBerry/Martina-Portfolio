import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsAnimations() {
  const cards = document.querySelectorAll(".projects__card");

  cards.forEach((card, index) => {
    const isEven = index % 2 === 0;
    const tiltX = isEven ? 50 : -50; // Spostamento di 50xp
    const tiltRotation = isEven ? 10 : -10; // Inclinazione di 10 gradi
    const tiltRotationHover = isEven ? 5 : -5; // Inclinazione di 10 gradi

    gsap.from(card, {
      x: tiltX,
      rotation: tiltRotation,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    let hoverTween;

    // Animazione Hover (Mouse Enter)
    card.addEventListener("mouseenter", () => {
      if (hoverTween) hoverTween.kill();

      hoverTween = gsap.to(card, {
        rotation: tiltRotationHover,
        delay: 0.5,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
        overwrite: false,
      });
    });

    // Animazione Hover (Mouse Leave)
    card.addEventListener("mouseleave", () => {
      if (hoverTween) hoverTween.kill();

      hoverTween = gsap.to(card, {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power1.inOut",
        overwrite: false,
      });
    });
  });
}
