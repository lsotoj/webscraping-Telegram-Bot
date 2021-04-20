
const pageDeploy = require('./webScraping/pageDeploy');

async function robot() {


    const images = await pageDeploy.deploy();
    console.log(images.length);
    console.log(images);
        // .then((images) => {
        //     console.log(images.length);
        //     console.log(typeof(images));
        //     console.log(images);
        // })
        // .catch(err => {
        //     console.log(`no se pudieron obtener los datos : ${err}`);
        // });


}
robot();
