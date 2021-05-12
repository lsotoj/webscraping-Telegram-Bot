const { Telegraf } = require("telegraf");
const pageDeploy = require("../webScraping/pageDeploy");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.start();
console.log("BOT-DAC is started");
bot.launch();

module.exports = {
  bot,
};