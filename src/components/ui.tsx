import type { ReactNode } from "react";
export const StarSprite = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true"><symbol id="star" viewBox="0 0 100 100"><g fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="18" y="18" width="64" height="64" /><rect x="18" y="18" width="64" height="64" transform="rotate(45 50 50)" /><circle cx="50" cy="50" r="12" /><circle cx="50" cy="50" r="3" fill="currentColor" /></g></symbol></svg>
);
export const Ornament = ({ className = "h-16 w-16" }: { className?: string }) => <svg className={`orn text-ac ${className}`} aria-hidden="true"><use href="#star" /></svg>;
export const Chars = ({ text }: { text: string }) => <>{Array.from(text).map((c, i) => <span className="ch inline-block" key={i}>{c === " " ? "\u00a0" : c}</span>)}</>;
export const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rv relative z-[2] mx-auto max-w-[640px] px-5 py-12 text-center">
    <h2 className="mb-3.5 font-disp text-[32px] font-normal text-ac">{title}</h2>{children}
  </section>
);
