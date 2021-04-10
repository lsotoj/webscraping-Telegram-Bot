
const pageDeploy = require('./webScraping/pageDeploy');

function robot() {
    pageDeploy.deploy();
}
robot();


// ( async () => {
//     const user = credentials.user;
//     const password = credentials.password;
//     const sn = 'MV2035VR2158';

//     const browser = await Puppeteer.launch({
//         headless: false,
//         ignoreHTTPSErrors: true,
//     });
    
//     const page = await browser.newPage();

//     //await page.screenshot({ path: 'dac.jpg' });
//     await page.goto('https://10.64.16.24');
//     await page.type('#username', user);
//     await page.type('#password', password);
//     await page.click('span.form:nth-child(1) > input:nth-child(1)');
//     await page.goto('https://10.64.16.24/pages/consumer/terminals/terminals.jsf');


// })();
 