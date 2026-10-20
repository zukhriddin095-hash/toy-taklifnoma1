import { Bot, Keyboard } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);
const WEBAPP_URL = process.env.WEBAPP_URL!;
const ADMIN = Number(process.env.ADMIN_CHAT_ID);

// Sizga xabar yuborib boʻlmasa ham bot oʻchib qolmasligi uchun
const notify = async (text: string) => {
  try {
    await bot.api.sendMessage(ADMIN, text);
  } catch (e) {
    console.error("Admin'ga xabar yuborilmadi:", e);
  }
};

bot.command("start", async (ctx) => {
  if (typeof ctx.match === "string" && ctx.match.startsWith("theme_")) {
    await ctx.reply(
      "✅ Uslub qabul qilindi. Endi kelin-kuyov ismi, sana va manzilni yozib yuboring.",
    );
    await notify(
      `🆕 Tanlov: ${ctx.match} — @${ctx.from?.username ?? ctx.from?.id}`,
    );
    return;
  }
  const kb = new Keyboard().webApp("🎨 Uslub tanlash", WEBAPP_URL).resized();
  await ctx.reply(
    "Assalomu alaykum! Taklifnoma uslubini tanlash uchun tugmani bosing 👇",
    { reply_markup: kb },
  );
});

bot.on("message:web_app_data", async (ctx) => {
  const { theme, label } = JSON.parse(ctx.message.web_app_data.data) as {
    theme: string;
    label: string;
  };
  await ctx.reply(
    `✅ “${label}” uslubi tanlandi. Endi kelin-kuyov ismi, sana, vaqt va manzilni yozib yuboring.`,
  );
  await notify(
    `🆕 Yangi tanlov: ${label} (${theme})\nMijoz: @${ctx.from.username ?? ctx.from.id}`,
  );
});

bot.catch((err) => console.error("Bot xatosi:", err.error));
bot.start();
