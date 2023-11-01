const TelegramApi = require("node-telegram-bot-api");

const token = "6926791568:AAEqlMCA5knNPzaoKd2JVNbtl7z0ZYBQ5EQ";

const bot = new TelegramApi(token, { poling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "You riting me ${text}");
});
