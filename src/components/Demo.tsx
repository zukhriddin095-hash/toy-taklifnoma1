"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ORDER, THEMES, type ThemeKey } from "@/config/themes";
import { getTg } from "@/lib/telegram";
import Invitation from "@/components/Invitation";
import { Ornament } from "@/components/ui";

const card = { hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const round = "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-white active:scale-95";

export default function Demo() {
  const [theme, setTheme] = useState<ThemeKey | null>(null);
  const [chosen, setChosen] = useState<ThemeKey | null>(null);
  useEffect(() => { const tg = getTg(); tg?.ready(); tg?.expand(); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [theme]);

  const step = (d: number) => theme && setTheme(ORDER[(ORDER.indexOf(theme) + d + ORDER.length) % ORDER.length]);
  const choose = (k: ThemeKey) => {
    const tg = getTg();
    if (tg) { tg.HapticFeedback?.notificationOccurred("success"); tg.sendData(JSON.stringify({ type: "theme", theme: k, label: THEMES[k].label })); }
    else setChosen(k);
  };

  if (!theme) return (
    <div className="min-h-svh px-4 pb-10 pt-[max(20px,env(safe-area-inset-top))] text-white">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-[.3em] text-[#e8c36a]">Toʻy taklifnomasi</p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight">Oʻzingizga yoqqan uslubni tanlang</h1>
        <p className="mt-2 text-sm text-white/60">Uslubni bosing — toʻliq taklifnomani koʻrasiz. Matn va dastur sizning toʻyingizga moslab tayyorlanadi.</p>
      </header>
      <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" initial="hide" animate="show" transition={{ staggerChildren: .05 }}>
        {ORDER.map((k) => {
          const m = THEMES[k], s = m.sample;
          return (
            <motion.button key={k} variants={card} whileTap={{ scale: .97 }} onClick={() => setTheme(k)} className="text-left">
              <div data-theme={k} className="themed flex aspect-[4/5] flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 p-3 text-center">
                <div className="band !absolute inset-x-0 top-2" />
                <Ornament className="h-9 w-9" />
                <div className="font-disp text-[clamp(22px,7vw,30px)] leading-none text-ink [letter-spacing:var(--ls,0)] [text-transform:var(--tt,none)]">{s.g}</div>
                <i className="text-ac not-italic">&amp;</i>
                <div className="font-disp text-[clamp(22px,7vw,30px)] leading-none text-ink [letter-spacing:var(--ls,0)] [text-transform:var(--tt,none)]">{s.b}</div>
                <div className="band !absolute inset-x-0 bottom-2" />
              </div>
              <div className="mt-2 px-1"><b className="text-[15px]">{m.label}</b><p className="text-xs text-white/55">{m.desc}</p></div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );

  return (
    <>
      <Invitation theme={theme} />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0f0f14]/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2.5 text-white backdrop-blur">
        <div className="mb-2 flex items-center justify-between text-xs text-white/70"><span>{THEMES[theme].label}</span><span>{ORDER.indexOf(theme) + 1} / {ORDER.length}</span></div>
        <div className="flex gap-2">
          <button aria-label="Barcha uslublar" className={round} onClick={() => setTheme(null)}>▦</button>
          <button aria-label="Oldingi" className={round} onClick={() => step(-1)}>‹</button>
          <button aria-label="Keyingi" className={round} onClick={() => step(1)}>›</button>
          <button onClick={() => choose(theme)} className="h-12 flex-1 rounded-full bg-[#e8c36a] px-4 text-[15px] font-semibold text-[#1b1b1b] active:scale-[.98]">✓ Shu uslubni tanlayman</button>
        </div>
      </div>
      <AnimatePresence>
        {chosen && (
          <motion.div className="fixed inset-0 z-[60] flex items-end bg-black/60 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setChosen(null)}>
            <motion.div className="w-full rounded-3xl bg-[#1a1a24] p-5 pb-[max(20px,env(safe-area-inset-bottom))] text-white" initial={{ y: 80 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold">“{THEMES[chosen].label}” tanlandi ✅</h3>
              <p className="mt-1 text-sm text-white/60">Davom etish uchun Telegram botga oʻting va maʼlumotlaringizni yuboring.</p>
              <a className="mt-4 flex h-12 items-center justify-center rounded-full bg-[#e8c36a] font-semibold text-[#1b1b1b]" href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=theme_${chosen}`}>Botda davom etish</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
