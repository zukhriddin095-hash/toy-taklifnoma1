import confetti from "canvas-confetti";
export function celebrate(el: HTMLElement): void {
  const cs = getComputedStyle(el);
  const colors = [cs.getPropertyValue("--ac").trim(), cs.getPropertyValue("--ac2").trim(), "#ffffff"];
  confetti({ particleCount: 120, spread: 90, origin: { y: .75 }, colors });
}
