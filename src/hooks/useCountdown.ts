import { useEffect, useState } from "react";
export function useCountdown(date: Date): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const s = Math.floor((date.getTime() - now) / 1000);
  return Number.isFinite(s) ? Math.max(0, s) : 0;
}
