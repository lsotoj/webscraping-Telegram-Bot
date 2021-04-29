
const {Telegraf} = require ('telegraf');
const { Readable } = require ('stream');
const pageDeploy = require('./webScraping/pageDeploy');
const fs = require('fs');

//function that converts buffer to stream
function bufferToStream(buffer) {
    const readable = new Readable();
  
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
  
    return readable;
}
  
async function robot() {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    let sn = '';
    let count = 0;
    bot.start();

    bot.start((ctx) => {
        ctx.reply('Bienvenido al bot para validacion de Set-Top Box, únicamente DCX y DCT.  Escribe /help para descubrir como funciona');
    });


    bot.command(['validar', 'VALIDAR', 'Validar'], (ctx) => {
        count = 1;
        ctx.reply('🤖 Por favor ingresa el número de serie "Host SN" 🔢');
            bot.hears(/^[a-zA-Z0-9]{12}/, async (ctx) => {
                if (count === 1) {
                    count = 0;
                    ctx.reply('⏳');
                    sn = (ctx.message.text).toUpperCase();
                    
                    //the deploy function return an array of bytes into a buffer
                    const images = await pageDeploy.deploy(sn);
                    images.forEach(async (buff) => {
                        const imgStream = bufferToStream(buff);
                        await ctx.replyWithPhoto({ source: imgStream });    
                    });                
                }
            });

        
    //     // bot.use(async (ctx, next) => {
    //     //     console.log(ctx.message.text);
    //     //     await next() // runs next middleware

    //     //     console.log('de regreso');
    //     // })
                    


        
    //     //chatId =  ctx.message.chat.id;

    });
    bot.launch(); 
    
    //const images = await pageDeploy.deploy();
}
robot();
