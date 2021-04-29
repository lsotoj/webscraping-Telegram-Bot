const Puppeteer  = require("puppeteer");
require('dotenv').config();


exports.deploy = async function(serial) {
    const user = process.env.DAC_USER;
    const password = process.env.DAC_PASSWORD;
    const sn = serial;
    const images = [];
    const names = [];
    const formatImage = {
        type: 'jpeg',
        quality: 100,
        fullPage: true,
        omitBackground: true,
    };
    

    //Puppeteer configuration
    const browser = await Puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    await page.goto('https://10.64.16.24');
    await page.type('#username', user);
    await page.type('#password', password);
    await page.click('span.form:nth-child(1) > input:nth-child(1)');
    await page.goto('https://10.64.16.24/pages/consumer/terminals/terminals.jsf');
    await page.waitForTimeout(3000);
    
    try {
        await page.type('.querySerialNumberStyle input', sn);
    } catch (e) {
        console.log(`No se encuentra el selector para ingresar el SN error: ${e}`);
    }
    
    page
        .waitForSelector('.button')
        .then(() =>  page.click('.button'))
        .catch((e) => console.error(`Boton search not found, error: ${e}`));
    
        await page.waitForTimeout(5000);
    
    //if the set-top box exist then it will launch the refresh button 
    //otherwise the button doesn't will exist and the catch will does capture the error. 
    try{
        await page.click('input[value="Refresh"]')
    } catch (e) {
        console.error("Serie no encontrada");
        images.push(await page.screenshot( formatImage ));
        await browser.close();
        return images;
    }
    

    //this timer is for the late responses when the refresh is pressed
    await page.waitForTimeout(25000);
    await page.reload();


    //Each promise was made for clicking into each button and take the screenshot
    //configuration tab
    const promise1 = await page.click('#configurationTabTab > a:nth-child(1)')
        .then(async () => {
            images.push(await page.screenshot( formatImage ));
        })
        .catch(async (error) => {
            console.error(`Captura 1 en promise1 no realizada error: ${error}`);
        });


    //packages provisioned tab    
    const promise2 = await page.click('#authorizationTabTab > a:nth-child(1)')
        .then(async () => {
            images.push(await page.screenshot( formatImage ));
        })
        .catch(async (error) => {
            console.error(`Captura 2 en promise2 no realizada error: ${error}`);
        });


    //last response validation tab
    const promise3 = await page.click('#statusTabTab > a:nth-child(1)')
        .then(async () => {
            images.push(await page.screenshot( formatImage ));
        })
        .catch(async (error) => {
            console.error(`Captura 3 en promise3 no realizada error: ${error}`);
        });

        //I await resolve all promises and manage some error into the promise.all 
        //then I return an array with the 3 screenshots into a buffer
        await Promise.all([promise1, promise2, promise3])
        .then(() => {
            console.log('Todas las capturas de pantalla realizadas');
        })
        .catch(err => {
            console.log(`Error en algúna captura de pantalla, error: ${err}`);
        });

        await browser.close();
        return images;
}

