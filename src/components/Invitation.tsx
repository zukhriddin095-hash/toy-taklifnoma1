"use client";
import { useMemo, useRef } from "react";
import { THEMES, type ThemeKey } from "@/config/themes";
import { useCover } from "@/hooks/useCover";
import { useCountdown } from "@/hooks/useCountdown";
import { useInvitationAnimations } from "@/hooks/useInvitationAnimations";
import { celebrate } from "@/lib/celebrate";
import { formatDate } from "@/lib/format";
import { Chars, Ornament, Section } from "@/components/ui";

const door = "absolute inset-y-0 w-[50.5%] bg-bg [background-image:var(--pat)]";
const parts = (s: number): [number, string][] => [[Math.floor(s / 86400), "kun"], [Math.floor(s % 86400 / 3600), "soat"], [Math.floor(s % 3600 / 60), "daqiqa"], [s % 60, "soniya"]];
const Box = ({ label, value }: { label: string; value: string }) => (
  <div className="box edge rounded-theme bg-card px-3.5 py-5">
    <small className="mb-1.5 block text-[11px] uppercase tracking-[.2em] text-ac">{label}</small>
    <b className="text-[1.1em] font-semibold">{value}</b>
  </div>
);

export default function Invitation({ theme }: { theme: ThemeKey }) {
  const root = useRef<HTMLElement>(null);
  const s = THEMES[theme].sample;
  const when = useMemo(() => new Date(`${s.date}T${s.time}`), [s.date, s.time]);
  const seconds = useCountdown(when);
  const { opened, gone, open } = useCover(() => root.current && celebrate(root.current));
  useInvitationAnimations(root, theme, opened);

  return (
    <main ref={root} data-theme={theme} className="themed pb-40">
      <div id="prog" className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-ac [transform:scaleX(0)]" />
      {!gone && (
        <div id="cover" className="fixed inset-0 z-[15]">
          <div className={`door l left-0 border-r border-ac ${door}`} />
          <div className={`door r right-0 border-l border-ac ${door}`} />
          <div className="seal absolute inset-0 z-[2] flex flex-col items-center justify-center gap-4 px-6 pb-28 text-center">
            <Ornament className="h-24 w-24" />
            <p className="m-0 text-[12px] uppercase tracking-[.35em] text-ac">Siz taklif etilgansiz</p>
            <div className="font-disp text-[clamp(40px,13vw,72px)] leading-[1.1] text-ink">{s.g} &amp; {s.b}</div>
            <button id="openBtn" onClick={open} className="btn">Taklifnomani ochish</button>
          </div>
        </div>
      )}
      <div className="band" />
      <section className="hero relative z-[2] mx-auto flex min-h-[84svh] max-w-[640px] flex-col items-center justify-center gap-3.5 px-5 py-12 text-center">
        <Ornament />
        <p className="kicker m-0 text-[12px] uppercase tracking-[.3em] text-ac">{s.kicker}</p>
        <h1 className="m-0 font-disp text-[clamp(50px,16vw,96px)] font-normal leading-[1.05] text-ink [letter-spacing:var(--ls,0)] [text-transform:var(--tt,none)]">
          <span id="gN" className="block"><Chars text={s.g} /></span>
          <i className="block text-[.45em] not-italic text-ac">&amp;</i>
          <span id="bN" className="block"><Chars text={s.b} /></span>
        </h1>
        <p className="bism m-0 italic opacity-75">Bismillahir rohmanir rohiym</p>
        <div className="hint text-[26px] text-ac">↓</div>
      </section>
      <Section title="Hurmatli mehmonlarimiz!">
        <p className="mb-3 leading-[1.65]">Hayotimizdagi eng quvonchli kunda sizni oʻz davramizda koʻrishdan behad xursand boʻlamiz. Duoyingiz va tashrifingiz biz uchun eng katta sovgʻa.</p>
      </Section>
      <Section title="Toʻy tafsilotlari">
        <div className="grid gap-3">
          <Box label="Sana" value={formatDate(when)} /><Box label="Vaqt" value={s.time} /><Box label="Manzil" value={s.place} />
        </div>
      </Section>
      <Section title="Toʻygacha qoldi">
        <div className="cd flex justify-center gap-2">
          {parts(seconds).map(([n, l]) => (
            <div key={l} className="edge max-w-[88px] flex-1 rounded-theme bg-card px-1 py-3">
              <b className="block text-[26px] text-ac">{n}</b><small className="text-[10px] uppercase tracking-[.12em]">{l}</small>
            </div>
          ))}
        </div>
      </Section>
      <Section title={s.programTitle}>
        <ul className="m-0 list-none p-0 text-left">
          {s.program.map(([t, x]) => (
            <li key={t + x} className="flex gap-4 border-b border-dashed border-[color-mix(in_srgb,var(--ac)_40%,transparent)] py-3">
              <b className="min-w-[88px] text-ac">{t}</b><span>{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] opacity-60">Dastur namuna — har bir toʻy uchun alohida tuziladi.</p>
      </Section>
      <Section title="Tashrifingizni tasdiqlang">
        <div className="rsvp flex flex-wrap justify-center gap-2.5">
          <button className="btn" onClick={() => root.current && celebrate(root.current)}>Albatta kelaman</button>
          <button className="btn btn-ghost alt">Afsuski, kela olmayman</button>
        </div>
      </Section>
      <footer className="relative z-[2] px-6 pb-8 pt-4 text-center text-sm opacity-70">Hurmat bilan, {s.g} va {s.b} oilalari<br /><span className="text-[11px]">Namuna (demo) taklifnoma</span></footer>
      <div className="band" />
    </main>
  );
}
