import { Bot, InlineKeyboard, webhookCallback } from "https://deno.land/x/grammy@v1.30.0/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
const ADMIN_ID = Deno.env.get("ADMIN_ID") || "";

const bot = new Bot(BOT_TOKEN);

// ========== 50 MODELS ==========
const MODELS = [
  { id: 1, name: "Laura", price: 500, photo: "https://i.pravatar.cc/400?img=1" },
  { id: 2, name: "Sophia", price: 650, photo: "https://i.pravatar.cc/400?img=2" },
  { id: 3, name: "Emma", price: 700, photo: "https://i.pravatar.cc/400?img=3" },
  { id: 4, name: "Olivia", price: 550, photo: "https://i.pravatar.cc/400?img=4" },
  { id: 5, name: "Ava", price: 800, photo: "https://i.pravatar.cc/400?img=5" },
  { id: 6, name: "Mia", price: 600, photo: "https://i.pravatar.cc/400?img=6" },
  { id: 7, name: "Isabella", price: 750, photo: "https://i.pravatar.cc/400?img=7" },
  { id: 8, name: "Charlotte", price: 900, photo: "https://i.pravatar.cc/400?img=8" },
  { id: 9, name: "Amelia", price: 550, photo: "https://i.pravatar.cc/400?img=9" },
  { id: 10, name: "Harper", price: 680, photo: "https://i.pravatar.cc/400?img=10" },
  { id: 11, name: "Evelyn", price: 720, photo: "https://i.pravatar.cc/400?img=11" },
  { id: 12, name: "Abigail", price: 580, photo: "https://i.pravatar.cc/400?img=12" },
  { id: 13, name: "Emily", price: 830, photo: "https://i.pravatar.cc/400?img=13" },
  { id: 14, name: "Elizabeth", price: 640, photo: "https://i.pravatar.cc/400?img=14" },
  { id: 15, name: "Sofia", price: 770, photo: "https://i.pravatar.cc/400?img=15" },
  { id: 16, name: "Ella", price: 690, photo: "https://i.pravatar.cc/400?img=16" },
  { id: 17, name: "Madison", price: 560, photo: "https://i.pravatar.cc/400?img=17" },
  { id: 18, name: "Scarlett", price: 850, photo: "https://i.pravatar.cc/400?img=18" },
  { id: 19, name: "Victoria", price: 620, photo: "https://i.pravatar.cc/400?img=19" },
  { id: 20, name: "Aria", price: 740, photo: "https://i.pravatar.cc/400?img=20" },
  { id: 21, name: "Grace", price: 590, photo: "https://i.pravatar.cc/400?img=21" },
  { id: 22, name: "Chloe", price: 810, photo: "https://i.pravatar.cc/400?img=22" },
  { id: 23, name: "Camila", price: 660, photo: "https://i.pravatar.cc/400?img=23" },
  { id: 24, name: "Penelope", price: 780, photo: "https://i.pravatar.cc/400?img=24" },
  { id: 25, name: "Riley", price: 540, photo: "https://i.pravatar.cc/400?img=25" },
  { id: 26, name: "Layla", price: 870, photo: "https://i.pravatar.cc/400?img=26" },
  { id: 27, name: "Lillian", price: 630, photo: "https://i.pravatar.cc/400?img=27" },
  { id: 28, name: "Nora", price: 760, photo: "https://i.pravatar.cc/400?img=28" },
  { id: 29, name: "Zoey", price: 570, photo: "https://i.pravatar.cc/400?img=29" },
  { id: 30, name: "Mila", price: 820, photo: "https://i.pravatar.cc/400?img=30" },
  { id: 31, name: "Aubrey", price: 610, photo: "https://i.pravatar.cc/400?img=31" },
  { id: 32, name: "Hannah", price: 790, photo: "https://i.pravatar.cc/400?img=32" },
  { id: 33, name: "Lily", price: 590, photo: "https://i.pravatar.cc/400?img=33" },
  { id: 34, name: "Addison", price: 730, photo: "https://i.pravatar.cc/400?img=34" },
  { id: 35, name: "Eleanor", price: 860, photo: "https://i.pravatar.cc/400?img=35" },
  { id: 36, name: "Natalie", price: 640, photo: "https://i.pravatar.cc/400?img=36" },
  { id: 37, name: "Luna", price: 750, photo: "https://i.pravatar.cc/400?img=37" },
  { id: 38, name: "Savannah", price: 580, photo: "https://i.pravatar.cc/400?img=38" },
  { id: 39, name: "Brooklyn", price: 800, photo: "https://i.pravatar.cc/400?img=39" },
  { id: 40, name: "Leah", price: 670, photo: "https://i.pravatar.cc/400?img=40" },
  { id: 41, name: "Zoe", price: 720, photo: "https://i.pravatar.cc/400?img=41" },
  { id: 42, name: "Stella", price: 560, photo: "https://i.pravatar.cc/400?img=42" },
  { id: 43, name: "Hazel", price: 840, photo: "https://i.pravatar.cc/400?img=43" },
  { id: 44, name: "Ellie", price: 690, photo: "https://i.pravatar.cc/400?img=44" },
  { id: 45, name: "Paisley", price: 780, photo: "https://i.pravatar.cc/400?img=45" },
  { id: 46, name: "Audrey", price: 620, photo: "https://i.pravatar.cc/400?img=46" },
  { id: 47, name: "Skylar", price: 810, photo: "https://i.pravatar.cc/400?img=47" },
  { id: 48, name: "Violet", price: 700, photo: "https://i.pravatar.cc/400?img=48" },
  { id: 49, name: "Claire", price: 590, photo: "https://i.pravatar.cc/400?img=49" },
  { id: 50, name: "Bella", price: 880, photo: "https://i.pravatar.cc/400?img=50" },
];

// ========== CRYPTO ADDRESSES (à remplacer plus tard) ==========
const CRYPTO_ADDRESSES = {
  BTC: "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  ETH: "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  LTC: "ltc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  TRX: "Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

// ========== SESSIONS ==========
const sessions: Record<number, any> = {};

// ========== START ==========
bot.command("start", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("💡 About", "about")
    .text("💃🏼 View Model", "view_model");
  await ctx.reply("Welcome to MODEL MARKET", { reply_markup: kb });
});

// ========== ABOUT ==========
bot.callbackQuery("about", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("Cancel", "cancel_home")
    .text("View Model", "view_model");
  await ctx.editMessageText(
    "Marketplace allowing customers to select a model, enter into a service contract, make payment in cryptocurrency and formalize their commitment by signing the contract before the start of the collaboration.",
    { reply_markup: kb }
  );
  await ctx.answerCallbackQuery();
});

// ========== CANCEL HOME ==========
bot.callbackQuery("cancel_home", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("💡 About", "about")
    .text("💃🏼 View Model", "view_model");
  await ctx.editMessageText("Welcome to MODEL MARKET", { reply_markup: kb }).catch(async () => {
    await ctx.reply("Welcome to MODEL MARKET", { reply_markup: kb });
  });
  await ctx.answerCallbackQuery();
});

// ========== VIEW MODEL ==========
bot.callbackQuery("view_model", async (ctx) => {
  await ctx.answerCallbackQuery();
  await sendModels(ctx, 0);
});

async function sendModels(ctx: any, startIndex: number) {
  const end = Math.min(startIndex + 10, MODELS.length);
  for (let i = startIndex; i < end; i++) {
    const m = MODELS[i];
    const kb = new InlineKeyboard().text("Choose", `choose_${m.id}`);
    await ctx.replyWithPhoto(m.photo, {
      caption: `#${m.id} ${m.name} — $${m.price}`,
      reply_markup: kb,
    });
  }
  const kb = new InlineKeyboard().text("Cancel", "cancel_home");
  if (end < MODELS.length) {
    kb.text("More", `more_${end}`);
  }
  await ctx.reply("Select a model or see more:", { reply_markup: kb });
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
  sessions[ctx.from.id] = { ...sessions[ctx.from.id], model: m };
  const kb = new InlineKeyboard()
    .text("Cancel", "cancel_home")
    .text("Select", "select_model");
  await ctx.replyWithPhoto(m.photo, {
    caption: `#${m.id} ${m.name} — $${m.price}`,
    reply_markup: kb,
  });
  await ctx.answerCallbackQuery();
});

// ========== SELECT ==========
bot.callbackQuery("select_model", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("Cancel", "cancel_home")
    .text("Crypto", "crypto");
  await ctx.editMessageCaption({
    caption: "You are about to enter into a collaboration with this model, please choose the payment method.",
    reply_markup: kb,
  });
  await ctx.answerCallbackQuery();
});

// ========== CRYPTO ==========
bot.callbackQuery("crypto", async (ctx) => {
  const kb = new InlineKeyboard()
    .text("Bitcoin (BTC)", "crypto_BTC")
    .text("Ethereum (ETH)", "crypto_ETH")
    .row()
    .text("Litecoin (LTC)", "crypto_LTC")
    .text("Tron (TRX)", "crypto_TRX")
    .row()
    .text("Cancel", "cancel_home");
  await ctx.editMessageCaption({
    caption: "Choose a crypto address, please send the fiat to the selected address, no error is remediable.",
    reply_markup: kb,
  });
  await ctx.answerCallbackQuery();
});

// ========== CHOIX CRYPTO ==========
bot.callbackQuery(/^crypto_(\w+)$/, async (ctx) => {
  const crypto = ctx.match[1];
  const addr = CRYPTO_ADDRESSES[crypto as keyof typeof CRYPTO_ADDRESSES];
  const session = sessions[ctx.from.id] || {};
  const price = session.model ? session.model.price : "?";
  await ctx.reply(`Please send the $${price} to the selected crypto wallet ${crypto}.`);
  await ctx.reply(`Address:\n\n${addr}`);
  await ctx.reply("Once the payment is made, please click on the Proof Sending button and send a photo of your transaction.");
  const kb = new InlineKeyboard()
    .text("Cancel", "cancel_home")
    .text("Proof Sending", "proof_sending");
  await ctx.reply("Actions:", { reply_markup: kb });
  await ctx.answerCallbackQuery();
});

// ========== PROOF SENDING ==========
bot.callbackQuery("proof_sending", async (ctx) => {
  sessions[ctx.from.id] = { ...sessions[ctx.from.id], awaitingProof: true };
  await ctx.reply("Please send a photo of your transaction.");
  await ctx.answerCallbackQuery();
});

// ========== RÉCEPTION PHOTO ==========
bot.on("message:photo", async (ctx) => {
  const session = sessions[ctx.from.id] || {};
  if (!session.awaitingProof) return;
  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  await ctx.api.sendPhoto(ADMIN_ID, fileId, {
    caption: `New proof from @${ctx.from.username || ctx.from.id}\nModel: #${session.model?.id || "?"} ${session.model?.name || "?"}\nPrice: $${session.model?.price || "?"}`,
  });
  session.proofFileId = fileId;
  sessions[ctx.from.id] = session;
  const kb = new InlineKeyboard()
    .text("Another Image", "another_image")
    .text("Submit", "submit_proof");
  await ctx.reply("Photo received.", { reply_markup: kb });
});

// ========== ANOTHER IMAGE ==========
bot.callbackQuery("another_image", async (ctx) => {
  sessions[ctx.from.id] = { ...sessions[ctx.from.id], awaitingProof: true };
  await ctx.reply("Please send another photo.");
  await ctx.answerCallbackQuery();
});

// ========== SUBMIT PROOF ==========
bot.callbackQuery("submit_proof", async (ctx) => {
  sessions[ctx.from.id] = { ...sessions[ctx.from.id], awaitingEmail: true, awaitingProof: false };
  await ctx.reply("You will receive a contract email from the selected model once your transaction is verified. Please enter the Gmail address you would like to be contacted at.");
  await ctx.answerCallbackQuery();
});

// ========== RÉCEPTION EMAIL ==========
bot.on("message:text", async (ctx) => {
  const session = sessions[ctx.from.id] || {};
  if (!session.awaitingEmail) return;
  const email = ctx.message.text;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await ctx.reply("Please enter a valid email address.");
    return;
  }
  session.email = email;
  sessions[ctx.from.id] = session;
  const kb = new InlineKeyboard()
    .text("Another Email", "another_email")
    .text("Submit", "submit_email");
  await ctx.reply(`Email recorded: ${email}`, { reply_markup: kb });
});

// ========== ANOTHER EMAIL ==========
bot.callbackQuery("another_email", async (ctx) => {
  sessions[ctx.from.id] = { ...sessions[ctx.from.id], awaitingEmail: true };
  await ctx.reply("Please enter another email.");
  await ctx.answerCallbackQuery();
});

// ========== SUBMIT EMAIL ==========
bot.callbackQuery("submit_email", async (ctx) => {
  const session = sessions[ctx.from.id] || {};
  await ctx.api.sendMessage(
    ADMIN_ID,
    `Final submission:\nModel: #${session.model?.id} ${session.model?.name}\nPrice: $${session.model?.price}\nEmail: ${session.email}\nUser: @${ctx.from.username || ctx.from.id}`
  );
  const kb = new InlineKeyboard().text("Start", "cancel_home");
  await ctx.reply("Congratulations! Your information has been sent successfully. You will receive an email shortly. Thank you for your trust.", { reply_markup: kb });
  delete sessions[ctx.from.id];
  await ctx.answerCallbackQuery();
});

// ========== WEBHOOK ==========
const WEBHOOK_URL = "https://modelmarket-bot.modelsmarket.deno.net/";

if (BOT_TOKEN) {
  await bot.api.setWebhook(WEBHOOK_URL);
  console.log("Webhook set to:", WEBHOOK_URL);
}

Deno.serve(webhookCallback(bot, "std/http"));
