import gsap from "gsap";

export function initHeroAnimations() {
  const shapes = document.querySelectorAll(".hero__shape");
  const title = document.querySelector(".hero__title");
  const subtitle = document.querySelector(".hero__subtitle");
  const description = document.querySelector(".hero__description");
  const cta = document.querySelector(".hero__cta--wrapper");

  // Timeline
  const tl = gsap.timeline();

  // Animazione content
  tl.from([title, subtitle, description, cta], {
    scale: 0, // Partono piccoli
    rotation: -360, // Rotazione di partenza
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Ritardo tra un elemento e l'altro
    ease: "elastic.out(1, 0.4)", // Il primo numero è l'ampiezza, il secondo è la rigidità
  });

  // Animazione di entrata (le icone appaiono dal basso)
  tl.from(
    shapes,
    {
      y: 50, // Partono da 50px più in basso
      opacity: 0, // Partono invisibili
      duration: 1, // L'animazione dura 1 secondo
      ease: "back.out(1.5)", // Effetto rimbalzo a fine animazione
    },
    "-=0.5",
  );

  // Animazione fluttuante
  tl.add(() => {
    gsap.to(shapes, {
      y: "+=30", // Spostamento rispetto la posizione iniziale
      rotation: 30, // Rotazione
      duration: 3, // Duranta movimento
      yoyo: true, // Tornano indietro alla posizione originale
      repeat: -1,
      ease: "sine.inOut",
    });
  });
}
