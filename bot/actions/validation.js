const { bot } = require("../robot.js");
const pageDeploy = require("../../webScraping/pageDeploy");
const { Readable } = require("stream");

let count = 0;

function bufferToStream(buffer) {
  const readable = new Readable();

  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

bot.command(["validar", "VALIDAR", "Validar"], (ctx) => {
  count = 1;
  ctx.reply('🤖 Por favor ingresa el número de serie "Host SN"');

  bot.hears(/^[a-zA-Z0-9]{12}/, async (ctx) => {
    if (count === 1) {
      let now = new Date();
      let time = now.getTime();
      count = 0;
      console.log(`Usuario: ${ctx.from.first_name} ${now} ${time}`);

      ctx.reply("⏳");
      let sn = ctx.message.text.toUpperCase();

      //the deploy function return an array of bytes into a buffer
      pageDeploy.deploy(sn)
        .then( (images) => {
            images.forEach(async (buff) => {
                const imgStream = bufferToStream(buff);
                ctx.replyWithPhoto({ source: imgStream });
            });
        });
    //   const images = await pageDeploy.deploy(sn);
    //   images.forEach(async (buff) => {
    //     const imgStream = bufferToStream(buff);
    //     await ctx.replyWithPhoto({ source: imgStream });
    //   });
    }
  });
});
