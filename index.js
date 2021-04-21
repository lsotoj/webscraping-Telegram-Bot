
const {Telegraf} = require('telegraf');
const pageDeploy = require('./webScraping/pageDeploy');

async function robot() {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    bot.start();
    
    bot.start((ctx) => {
        ctx.reply('Bienvenido al bot para validacion de Set-Top Box únicamente DCX. Escribe /help para saber como funciona');
    });

    bot.command(['validar', 'VALIDAR', 'Validar'], (ctx) => {
        ctx.reply('Por favor ingresa el número de serie...');
        console.log(ctx);
    });

    bot.launch();
    //const images = await pageDeploy.deploy();




}
robot();
