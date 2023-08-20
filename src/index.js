const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const memgraph = require("./mg")

require('dotenv').config()

const {
    getMgInfo
} = require("./mgQueries")

const db = require('./database');
const {addUserById} = require("./database");

const bot = new Telegraf(process.env.BOT_TOKEN);

function canUse(userId, callback) {
    db.getUserPerms(userId, (err, perms) => {
        if (err) {
            console.error("Error: ", err);
            callback(false)
        } else {
            if (perms === null || perms === 0) {
                callback(false)
            } else {
                callback(true)
            }
        }
    });
}

function mgInfoToStr(dict) {
    let result = '';
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (key === "memory_usage" || key === "disk_usage" || key === "memory_allocated" || key === "allocation_limit") {
                result += `${key}: ${(dict[key]/(Math.pow(2, 20))).toFixed(2)} MB\n`;
            } else {
                result += `${key}: ${dict[key]}\n`;
            }
        }
    }
    return result;
}

bot.start((ctx) => {
    db.isTableEmpty((err, isEmpty) => {
        if (err) {
            console.error(err);
        } else {
            if (isEmpty) {
                addUserById(ctx.update.message.from.id, 1, () => {
                    ctx.reply(`Welcome, ${ctx.update.message.from.username}! You've been added as the owner.`);
                });
            } else {
                canUse(ctx.update.message.from.id, (can) => {
                    if (can) {
                        ctx.reply(`Welcome, ${ctx.update.message.from.username}!`);
                    } else {
                        ctx.reply(`You do not have permission to use this bot. ${ctx.update.message.from.id}.`)
                    }
                })
            }
        }
    })
});

bot.command('info', async (ctx) => {
    canUse(ctx.update.message.from.id, async (can) => {
       if (!can) { return }

       const info = await getMgInfo(memgraph);

       ctx.replyWithMarkdown(`Here is the latest memgraph database info:\n\`\`\`\n${mgInfoToStr(info)}\`\`\``);
    });
});

bot.launch();