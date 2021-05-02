
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
        ctx.replyWithHTML(`Bienvenido al bot para validación de Set-Top Box HFC. <b>Únicamente modelos DCX y DCT</b>.  Escribe /help para descubrir como funciona`);
    });

    let text = `Debido a que éste es un robot 🤖 trabaja con comandos, por ejemplo para validar una Set-Top Box:` +     
                `Escribe /validar y luego el robot te solicitará el numero de serie de la STB ( no olivedes anteponer "/" ).\n` +
                `Ingresa el numero de serie sin importar minúsculas o mayúsculas, dale enviar y espera aproximadamente 3 minutos mientras el robot hace la consulta.\n\n` +
                `Cuando el robot finalice la consulta te devolverá 3 imágenes en orden aleatorio:\n\n` +
                `1️⃣ "Pestaña Configuration" Indica donde está instalada la STB.\n\n` +
                `2️⃣ "Pestaña Authorization" Indica qué paquetes tiene aprovisionados desde el DAC.\n\n` +
                `3️⃣ "Pestaña Status" Indica si la STB tiene retorno; para esta opcion debes validar el campo "last response" si conincide con la hora que estas haciendo la consulta significa que la STB SI ✅ tiene retorno,  si meustra otra fecha y hora significa que la STB NO tiene retorno ❌.\n\n`+
                `Para las STB consultadas y que no existen en el DAC te devolverá solo una imagen indicando que no encontró la serie en el DAC.\n\n` +
                `<b>Si tienes dudas o encuentas algún bug con la app puedes consultarle  a Sotoj</b>.` 

                
    bot.help( (ctx) => { ctx.replyWithHTML(text); });

    bot.command(['validar', 'VALIDAR', 'Validar'], (ctx) => {
        count = 1;
        console.log(`Usuario: ${ ctx.from.first_name }`);
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
    
}
robot();
