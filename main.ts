import { Bot, InlineKeyboard, Keyboard, webhookCallback } from "https://deno.land/x/grammy@v1.30.0/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
const ADMIN_ID = Deno.env.get("ADMIN_ID") || "";

const bot = new Bot(BOT_TOKEN);
const kv = await Deno.openKv();

// ========== MODELS ==========
const MODELS = [
  { id: 1, name: "Ercine", price: 620, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/Ercine.jpg" },
  { id: 2, name: "Eunice", price: 680, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/Eunice.jpg" },
  { id: 3, name: "Nicole", price: 740, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/Nicole.jpg" },
  { id: 4, name: "Adila", price: 650, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/adila.jpg" },
  { id: 5, name: "Ali", price: 810, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/ali.jpg" },
  { id: 6, name: "Julie", price: 500, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/julie.jpg" },
  { id: 7, name: "Ambre", price: 760, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/ambre.jpg" },
  { id: 8, name: "Avery", price: 900, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/avery.jpg" },
  { id: 9, name: "Erica", price: 630, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/erica.jpg" },
  { id: 10, name: "Fabina", price: 820, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/fabina.jpg" },
  { id: 11, name: "Hexie", price: 690, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/hexie.jpg" },
  { id: 12, name: "Isela", price: 750, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/isela.jpg" },
  { id: 13, name: "Jessi", price: 840, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/jessi.jpg" },
  { id: 14, name: "Katrine", price: 710, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/katrine.jpg" },
  { id: 15, name: "Kitty", price: 880, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/kitty.jpg" },
  { id: 16, name: "Larissa", price: 660, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/larissa.jpg" },
  { id: 17, name: "Lena", price: 790, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/lena.jpg" },
  { id: 18, name: "Mia", price: 720, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/mia.jpg" },
  { id: 19, name: "Nicky", price: 850, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/nicky.jpg" },
  { id: 20, name: "Nina", price: 670, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/nina.jpg" },
  { id: 21, name: "Petra", price: 800, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/petra.jpg" },
  { id: 22, name: "Reine", price: 730, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/reine.jpg" },
  { id: 23, name: "Rosa", price: 640, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/rosa.jpg" },
  { id: 24, name: "Rose", price: 770, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/rose.jpg" },
  { id: 25, name: "Rosine", price: 890, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/rosine.jpg" },
  { id: 26, name: "Safia", price: 700, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/safia.jpg" },
  { id: 27, name: "Tati", price: 830, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/tati.jpg" },
  { id: 28, name: "Valentina", price: 750, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/valentina.jpg" },
  { id: 29, name: "Zoey", price: 860, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/zoey.jpg" },
  { id: 30, name: "Alimela", price: 700, photo: "https://raw.githubusercontent.com/modelsmarket/modelmarket-bot/main/images/alimela.jpg" },
];

// ========== CRYPTO ADDRESSES ==========
const CRYPTO_ADDRESSES = {
  BTC: "bc1qz7j72wu4dc2sg963tmawx926500efngrlfjacm",
  ETH: "0x3b518165F1E3aA57Fb9329856521A73581819128",
  LTC: "ltc1q9cvzlxqpecf9efhvhu3myx6wypnfsw2kswt352",
  TRX: "TNtWGZo7T35xcHDT8LVUP9rvAcB4D6D1px",
};

// ========== KV HELPERS ==========
async function getSession(userId: number) {
  const res = await kv.get(["sessions", userId]);
  return (res.value as any) || {};
}

async function setSession(userId: number, data: any) {
  await kv.set(["sessions", userId], data);
}

async function deleteSession(userId: number) {
  await kv.delete(["sessions", userId]);
}

// ========== CLAVIERS ==========
const MAIN_MENU = new Keyboard()
  .text("💡 About").text("💃🏼 View Model")
  .resized();

const SELECT_MENU = new Keyboard()
  .text("Cancel").text("Select")
  .resized();

const CRYPTO_MENU = new Keyboard()
  .text("Cancel").text("Crypto")
  .resized();

const PROOF_MENU = new Keyboard()
  .text("Cancel").text("Proof Sending")
  .resized();

const IMAGE_MENU = new Keyboard()
  .text("Submit")
  .resized();

// ========== START ==========
bot.command("start", async (ctx) => {
  await deleteSession(ctx.from.id);
  await ctx.reply("Welcome to MODEL MARKET", { reply_markup: MAIN_MENU, parse_mode: "HTML" });
});

// ========== ABOUT ==========
bot.hears("💡 About", async (ctx) => {
  await ctx.reply(
    "Marketplace allowing customers to select a model, enter into a service contract, make payment in cryptocurrency and formalize their commitment by signing the contract before the start of the collaboration.",
    { reply_markup: new Keyboard().text("Cancel").text("View Model").resized(), parse_mode: "HTML" }
  );
});

// ========== VIEW MODEL ==========
bot.hears("💃🏼 View Model", async (ctx) => {
  await sendModels(ctx, 0);
});

bot.hears("View Model", async (ctx) => {
  await sendModels(ctx, 0);
});

// ========== CANCEL ==========
bot.hears("Cancel", async (ctx) => {
  await deleteSession(ctx.from.id);
  await ctx.reply("Welcome to MODEL MARKET", { reply_markup: MAIN_MENU, parse_mode: "HTML" });
});

async function sendModels(ctx: any, startIndex: number) {
  const end = Math.min(startIndex + 10, MODELS.length);
  for (let i = startIndex; i < end; i++) {
    const m = MODELS[i];
    const kb = new InlineKeyboard().text("Choose", `choose_${m.id}`);
    await ctx.replyWithPhoto(m.photo, {
      caption: `<b>#${m.id} ${m.name}</b> — <b>$${m.price}</b>`,
      reply_markup: kb,
      parse_mode: "HTML"
    });
  }
  const kb = new InlineKeyboard();
  if (end < MODELS.length) {
    kb.text("More", `more_${end}`);
  }
  await ctx.reply("Select a model or see more:", { reply_markup: kb, parse_mode: "HTML" });
}

// ========== MORE ==========
bot.callbackQuery(/^more_(\d+)$/, async (ctx) => {
  const start = parseInt(ctx.match[1]);
  await sendModels(ctx, start);
  await ctx.answerCallbackQuery();
});

// ========== CHOOSE ==========
bot.callbackQuery(/^choose_(\d+)$/, async (ctx) => {
  const id = parseInt(ctx.match[1]);
  const m = MODELS.find((x) => x.id === id);
  if (!m) return;

  const session = await getSession(ctx.from.id);
  session.model = m;
  session.step = "awaiting_email";
  await setSession(ctx.from.id, session);

  await ctx.replyWithPhoto(m.photo, {
    caption: `<b>#${m.id} ${m.name}</b> — <b>$${m.price}</b>`,
    reply_markup: SELECT_MENU,
    parse_mode: "HTML"
  });
  await ctx.answerCallbackQuery();
});

// ========== SELECT ==========
bot.hears("Select", async (ctx) => {
  const session = await getSession(ctx.from.id);
  if (!session.model) {
    await ctx.reply("Please choose a model first.", { reply_markup: MAIN_MENU, parse_mode: "HTML" });
    return;
  }

  session.step = "awaiting_email";
  await setSession(ctx.from.id, session);

  await ctx.reply(
    "Please enter the Gmail address you would like to be contacted at.",
    { reply_markup: { remove_keyboard: true }, parse_mode: "HTML" }
  );
});

// ========== CRYPTO ==========
bot.hears("Crypto", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("Bitcoin (BTC)", "crypto_BTC")
    .text("Ethereum (ETH)", "crypto_ETH")
    .row()
    .text("Litecoin (LTC)", "crypto_LTC")
    .text("Tron (TRX)", "crypto_TRX");

  await ctx.reply(
    "Choose a crypto address, please send the fiat to the selected address, no error is remediable.",
    { reply_markup: kb, parse_mode: "HTML" }
  );
});

// ========== PROOF SENDING ==========
bot.hears("Proof Sending", async (ctx) => {
  const session = await getSession(ctx.from.id);
  session.awaitingProof = true;
  await setSession(ctx.from.id, session);

  await ctx.reply("Please send a photo of your transaction.", { parse_mode: "HTML" });
});

// ========== SUBMIT ==========
bot.hears("Submit", async (ctx) => {
  const session = await getSession(ctx.from.id);

  if (!session.proofFileId) {
    await ctx.reply("Please send a photo first.", { reply_markup: MAIN_MENU, parse_mode: "HTML" });
    return;
  }

  await ctx.api.sendMessage(
    ADMIN_ID,
    `<b>Final submission</b>\nModel: <b>#${session.model?.id} ${session.model?.name}</b>\nPrice: <b>$${session.model?.price}</b>\nEmail: <b>${session.email}</b>\nUser: @${ctx.from.username || ctx.from.id}`,
    { parse_mode: "HTML" }
  );

  await ctx.reply(
    "Congratulations! Your information has been sent successfully. You will receive an email shortly. Thank you for your trust.",
    { reply_markup: MAIN_MENU, parse_mode: "HTML" }
  );

  await deleteSession(ctx.from.id);
});

// ========== CHOIX CRYPTO (callback inline) ==========
bot.callbackQuery(/^crypto_(\w+)$/, async (ctx) => {
  const crypto = ctx.match[1];
  const addr = CRYPTO_ADDRESSES[crypto as keyof typeof CRYPTO_ADDRESSES];
  const session = await getSession(ctx.from.id);

  if (!session.model) {
    await ctx.answerCallbackQuery();
    await ctx.reply("Please choose a model first.", { reply_markup: MAIN_MENU, parse_mode: "HTML" });
    return;
  }

  const price = session.model.price;
  const modelName = session.model.name;

  await ctx.reply(
    `Please send <b>$${price}</b> for model <b>${modelName}</b> to the selected crypto wallet <b>${crypto}</b>.`,
    { parse_mode: "HTML" }
  );

  await ctx.reply(`<code>${addr}</code>`, { parse_mode: "HTML" });

  await ctx.reply(
    "Once the payment is made, please click on the <b>Proof Sending</b> button and send a photo of your transaction.",
    { reply_markup: PROOF_MENU, parse_mode: "HTML" }
  );

  await ctx.answerCallbackQuery();
});

// ========== RÉCEPTION PHOTO ==========
bot.on("message:photo", async (ctx) => {
  const session = await getSession(ctx.from.id);
  if (!session.awaitingProof) return;

  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  await ctx.api.sendPhoto(ADMIN_ID, fileId, {
    caption: `<b>New proof received</b>\nModel: <b>#${session.model?.id || "?"} ${session.model?.name || "?"}</b>\nPrice: <b>$${session.model?.price || "?"}</b>\nEmail: <b>${session.email || "?"}</b>\nUser: @${ctx.from.username || ctx.from.id}`,
    parse_mode: "HTML"
  });

  session.proofFileId = fileId;
  session.awaitingProof = false;
  await setSession(ctx.from.id, session);

  await ctx.reply("Photo received.", { reply_markup: IMAGE_MENU, parse_mode: "HTML" });
});

// ========== RÉCEPTION EMAIL (EN DERNIER pour ne pas bloquer les autres) ==========
bot.on("message:text", async (ctx) => {
  const session = await getSession(ctx.from.id);

  // Ne traiter que si on attend un email
  if (session.step !== "awaiting_email") return;

  // Ignorer les clics de bouton clavier
  const text = ctx.message.text;
  const ignoredTexts = ["💡 About", "💃🏼 View Model", "View Model", "Cancel", "Select", "Crypto", "Proof Sending", "Submit", "Another Image", "Another Email"];
  if (ignoredTexts.includes(text)) return;

  // Valider l'email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    await ctx.reply("Please enter a valid email address.", { parse_mode: "HTML" });
    return;
  }

  session.email = text;
  session.step = "crypto";
  await setSession(ctx.from.id, session);

  await ctx.reply(
    `Email recorded: <b>${text}</b>\n\nYou are about to enter into a collaboration with this model, please choose the payment method.`,
    { reply_markup: CRYPTO_MENU, parse_mode: "HTML" }
  );
});

// ========== WEBHOOK ==========
Deno.serve(webhookCallback(bot, "std/http"));
