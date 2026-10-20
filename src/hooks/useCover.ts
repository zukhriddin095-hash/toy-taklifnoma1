import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Ochilish ekrani: eshik tabaqalari ochiladi, sahifa qulfdan chiqadi. */
export function useCover(onOpen?: () => void) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("lock", !gone);
    if (gone) ScrollTrigger.refresh();
    return () => document.body.classList.remove("lock");
  }, [gone]);
  useEffect(() => { const t = gsap.to(".seal .orn", { rotation: 360, duration: 30, repeat: -1, ease: "none" }); return () => { t.kill(); }; }, []);
  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    const safety = setTimeout(() => setGone(true), 3500);
    gsap.timeline({ onComplete: () => { clearTimeout(safety); setGone(true); } })
      .to(".seal", { scale: .6, opacity: 0, duration: .5, ease: "power2.in" })
      .to(".door.l", { xPercent: -100, duration: 1.1, ease: "power3.inOut" }, "-=.1")
      .to(".door.r", { xPercent: 100, duration: 1.1, ease: "power3.inOut" }, "<");
    onOpen?.();
  }, [opened, onOpen]);
  return { opened, gone, open };
}
