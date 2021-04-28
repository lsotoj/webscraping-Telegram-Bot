
const {Telegraf} = require('telegraf');
const pageDeploy = require('./webScraping/pageDeploy');
const fs = require('fs');

async function robot() {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    let sn = '';
    let count = 0;
    bot.start();

    bot.start((ctx) => {
        ctx.reply('Bienvenido al bot para validacion de Set-Top Box únicamente DCX y DCT. Escribe /help para saber como funciona');
    });




    bot.command(['validar', 'VALIDAR', 'Validar'], (ctx) => {
        count = 1;
        ctx.reply('Por favor ingresa el número de serie...');
            bot.hears(/^[a-zA-Z0-9]{12}/, async (ctx) => {
                if (count === 1) {
                    sn = ctx.message.text; 
                    count = 0;
                    const images = await pageDeploy.deploy(sn);
                    //const buff = Buffer.from(images[0], 'base64');
                    //ctx.replyWithPhoto({source: chunk});
                    let name = `./${sn}notFound.JPEG`
                    ctx.replyWithPhoto({source: fs.createReadStream(name)});
                    console.log(name)
                    
                }
            });

        
    //     // bot.use(async (ctx, next) => {
    //     //     console.log(ctx.message.text);
    //     //     await next() // runs next middleware

    //     //     console.log('de regreso');
    //     // })
                    
    //     // bot.use((ctx) =>{
    //     //     ctx.reply(`Gracias, El resto dejamelo a mi... `);   
    //     // });

        
    //     //chatId =  ctx.message.chat.id;

    });
     
    
    bot.launch(); 
    
    //const images = await pageDeploy.deploy();
}
robot();
