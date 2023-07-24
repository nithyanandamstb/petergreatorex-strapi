const fieldMapping = require('./reapit/fieldMapping');
//const propertyFunction = require('./reapit/property');
module.exports = ({env}) => ({
    customer_code: 'TUH',
    client_id: '4qgc5k85n5otgr6t0n98bhdcb3',
    client_secret: '1kji5ju4qakfup91d8o4o917hipq09566t225a8apg9je8q1nvf0',
    auth_url: 'https://connect.reapit.cloud',
    base_url: 'https://platform.reapit.cloud/',  
    authorization_token: 'NHFnYzVrODVuNW90Z3I2dDBuOThiaGRjYjM6MWtqaTVqdTRxYWtmdXA5MWQ4bzRvOTE3aGlwcTA5NTY2dDIyNWE4YXBnOWplOHExbnZmMA==',
    api_version: '2020-01-31',
    site_url:env('FRONTEND_URL', ""),
    importer:{
      property:{
        collection_name:'property',
        algolia:true,
        ggfx_enabled:true,
        negotiator_mapping:true,        
        sales_import_statuses: ['forSale', 'underOffer', 'completed','exchanged'],
        lettings_import_statuses: ['toLet', 'underOffer', 'tenancyCurrent'],   
        archive_statuses: ['forSaleUnavailable', 'underOfferUnavailable','letByOtherAgent','withdrawn','preAppraisal','letByOtherAgent','arrangingTenancyUnavailable','toLetUnavailable','valuation','tenancyCurrentUnavailable','letPrivately','completed','soldExternally'],
        country_codes: {'GB': 'United Kingdom', 'GBR': 'United Kingdom'},
        status_mapping : { 
          'selling' : { 'forSale' : 'For Sale', 'underOffer' : 'Sale Agreed', 'exchanged' : 'Sold', 'completed' : 'Sold'} ,
          'letting' : {'toLet' : 'To Let', 'tenancyCurrent':'To Let', 'arrangingTenancy' : 'To Let', 'underOffer' : 'Under Offer','arrangingTenancyUnavailable': 'Let', 'tenancyCurrentUnavailable': 'Let'}
        },
        publish_statuses:["For Sale", "Sale Agreed", "To Let", "Let Agreed", "Let"],       
        ggfx:{        
            "property":{
                transforms:['416x300'],
		            format: 'webp'
            },
            fields:['images','epc','floorplan']        
        },
        batchSize: 100,
        archive:true,
      },
      negotiator:{
        batchSize: 50,
      },
      area:{
        batchSize: 100
      },  
      office:{
        batchSize: 50
      }, 
      department:{
        batchSize: 50
      }     
    },
    fieldMapping,
    //propertyFunction
});
