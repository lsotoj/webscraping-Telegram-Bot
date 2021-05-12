const { bot } = require('../robot.js');

bot.start((ctx) => {
    ctx.replyWithHTML(`Bienvenido al bot para validación de Set-Top Box HFC. <b>Únicamente modelos DCX y DCT</b>.  Escribe /help para descubrir como funciona`);
});


