const { bot } = require('../robot.js');

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