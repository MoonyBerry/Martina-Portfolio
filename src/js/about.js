import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAboutAnimations() {
  const bio = document.querySelector(".about__bio");
  const cards = document.querySelectorAll(".about-card");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    if (bio) {
      gsap.from(bio, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bio,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      let hoverTween;

      // Animazione Hover (Mouse Enter)
      card.addEventListener("mouseenter", () => {
        if (hoverTween) hoverTween.kill();

        hoverTween = gsap.to(card, {
          y: -20,
          rotate: 5,
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: false,
        });
      });

      // Animazione Hover (Mouse Leave)
      card.addEventListener("mouseleave", () => {
        if (hoverTween) hoverTween.kill();

        hoverTween = gsap.to(card, {
          y: 0,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: false,
        });
      });
    });
  });
}
