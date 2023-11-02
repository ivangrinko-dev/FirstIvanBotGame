const TelegramApi = require("node-telegram-bot-api");

const token = "6926791568:AAEqlMCA5knNPzaoKd2JVNbtl7z0ZYBQ5EQ";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inlin_keyboard: [
      [{ text: "Текст кнопки", callback_data: "1" }],
      [{ text: "Текст кнопки", callback_data: "2" }],
      [{ text: "Текст кнопки", callback_data: "3" }],
      [{ text: "Текст кнопки", callback_data: "4" }]
    ],
  }),
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/game", description: "Игра угадай цифру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        `https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/1.webp`
      );
      return bot.sendMessage(chatId, `Добро пожаловать в BotGame`);
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === "/game") {
      await bot.sendMessage(
        chatId,
        `Сейчас я загадаю цифру от 1 до 9, а ты должен её отгадать`
      );
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, `Отгадывай`, gameOptions);
    }
    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз `);
  });
};
start();
