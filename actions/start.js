const { bot } = require('../index.js');

console.log(bot);

bot.command('prueba', (ctx) => {
    console.log('si entré');
});

