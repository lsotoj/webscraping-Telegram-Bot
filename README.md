# Bot-dac :tv:
On HFC networks we have Digital Addressable Controllers providing secured access control for digital video distribution systems. Bot-dac is a library on JavaScript To help non-administrators users. Makes it easy to extract information from the DAC.
___
## Installation :books:
To install bot-dac you need to have installed NodeJs.
Then you will type:

`npm i bot-dac`

*The package installation will be installing a Chromium version. It due to we used puppeteer, a library on JavaScript for web scraping. And his default web explorer is Chromium.*

## Deployment :package:
**Bot-dac** uses two principal libraries. The first one is [Puppeteer](https://pptr.dev/ "Puppeteer") that made web scraping and the second is [Telegraf](https://telegraf.js.org/ "Telegraf") that interacts with the [Telegram Bot API](https://core.telegram.org/bots "Telegram Bot API"). You need to configure nothing on them.

As you know. The DAC stores all set-top boxes information. So to extract that information. Bot-dac realizes a web scraping to the principal tabs and returns it via telegram message.

    <img src="https://img.icons8.com/fluent/48/000000/telegram-app.png"/>

To reach run the Bot-dac you need to configure some environment variables on your operating system.

 As I said, I use a Robot on Telegram to return the information. So you need to create a robot on Telegram with [BotFather](https://t.me/botfather "BotFather"). When you ended the process Telegram will give you a TOKEN. **Save it, it will be confidential**. You can review the [Telegram API Doc](https://core.telegram.org/bots "Telegram API Doc") to learn how it works.

1. The first one environment variable is the bot token:
	
	`TELEGRAM_TOKEN=1714671429:AAHNsMCbiLSsp9S8FkjycYP8F6I1WB3UWsM`
	
	*This is an example. The BotFather will give you your own and unique token.*

2. The DAC user.
	`DAC_USER=user`
3. The DAC password.
	`DAC_PASSWORD=password`
4. The DAC URL or IP.
	`DAC_URL=https://...`

*To configure the environment variables I used dotenv. Feel free to configure at your way these environment variables on your operating system.*

:pushpin:	
Make sure to configure the name of the environment variables how I showed you :point_up: