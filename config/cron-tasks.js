const { createWriteStream } = require('fs');
const axios = require('axios');
var strapi_dir = process.cwd();
const ENABLE_WEBHOOK=process.env.ENABLE_WEBHOOK;
const NETLIFY_WEBHOOK_CACHE_TRIGGER=process.env.NETLIFY_WEBHOOK_CACHE_TRIGGER;
module.exports = { 
    /*'30 0 * * *': async ({ strapi }) => {
        if(process.env.NODE_ENV === 'production'){
            try{
                if(strapi.plugins['stb-feed-importer']){
                    await strapi.plugins['stb-feed-importer'].controllers.reapit.fullImportSales()
                    await strapi.plugins['stb-feed-importer'].services.area.service.generateAreaFromProperties();
                    if(ENABLE_WEBHOOK=="true"){
                        await axios.post(NETLIFY_WEBHOOK_CACHE_TRIGGER)
                    }
                }
            }catch(error){
                logger(error)
            }
        }
    },
    '0 6-20/2 * * *': async ({ strapi }) => {
        if(process.env.NODE_ENV === 'production'){
            try{
                if(strapi.plugins['stb-feed-importer']){
                    await strapi.plugins['stb-feed-importer'].controllers.reapit.updateImport("sales");
                    await strapi.plugins['stb-feed-importer'].services.area.service.generateAreaFromProperties();
                    if(ENABLE_WEBHOOK=="true"){
                        await axios.post(NETLIFY_WEBHOOK_CACHE_TRIGGER)
                    }
                }
            }catch(error){
                logger(error)
            }
        }
    }*/
};

const logger = async (content, flag = '') => {
    try{
        var log_date = new Date().toJSON().slice(0, 10);
        var log_file = createWriteStream(strapi_dir + '/../log/importer-cron-error.' + log_date + '.log', {flags: 'a'});
        var dt = new Date().toJSON();
        flag = flag == '' ? '' : ('- ' + flag + ' -');
        log_file.write(dt + " -" + flag + "- " + JSON.stringify(content) + '\n');
    }catch(error){
        console.log(error)
    }
}