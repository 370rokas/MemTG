const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

const {
    addUserById,
    removeUserById,
    getUserById,
    changeUserPermissionsById,
    getUserPerms
} = require('database');

const botToken = process.env.BOT_TOKEN

const bot = new TelegramBot(botToken, {polling: true})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome");
});

