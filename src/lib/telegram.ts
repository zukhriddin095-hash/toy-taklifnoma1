export interface TgWebApp {
  ready(): void; expand(): void; close(): void; sendData(data: string): void;
  HapticFeedback?: { notificationOccurred(t: "success" | "error" | "warning"): void };
  initDataUnsafe?: { user?: { first_name?: string } };
}
declare global { interface Window { Telegram?: { WebApp?: TgWebApp } } }
export const getTg = (): TgWebApp | undefined => (typeof window === "undefined" ? undefined : window.Telegram?.WebApp);
