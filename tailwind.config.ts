import type { Config } from "tailwindcss";
// Ranglar/shriftlar CSS oʻzgaruvchilardan olinadi — 10 uslub bitta klass bilan ishlaydi.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: "var(--bg)", ink: "var(--ink)", ac: "var(--ac)", ac2: "var(--ac2)", card: "var(--card)" },
    fontFamily: { disp: "var(--disp)", body: "var(--body)", ui: ["Jost", "system-ui", "sans-serif"] },
    borderRadius: { theme: "var(--r, 18px)" },
  } },
} satisfies Config;
