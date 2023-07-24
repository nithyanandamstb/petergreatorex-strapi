module.exports = ({env}) => ({
   email: {
      enabled: true,
      config:{
        provider: env("EMAIL_PROVIDER"),
        providerOptions: {
          apiKey: env("EMAIL_PROVIDER_APIKEY"),
          domain: env("EMAIL_PROVIDER_DOMAIN"), //Required if you have an account with multiple domains
        }
      }
    },
	upload: {
      enabled: true,
      config:{
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: `${env('S3_BUCKET')}/${env('GGFX_ENV')}`
          },
        }
      }
    },
    graphql: {
	  enabled: true,
      config: {
		endpoint: '/graphql',
		shadowCRUD: true,
		playgroundAlways: false,
		depthLimit: 7,
		amountLimit: 100,
		apolloServer: {
		  tracing: false,
		},
	  },
    },
    seo: {
      enabled: true,
    },
    'drag-drop-content-types': {
      enabled: true
    },
    'import-export-entries': {
      enabled: true,
    },
    menus: {
     config: {
       maxDepth: 3,
     },
    },
    ckeditor: {
      enabled: true,
    },
    'stb-feed-importer': {
      enabled: true,
      // resolve: './src/plugins/stb-feed-importer',
      resolve: './node_modules/@starberry/strapi-plugin-stb-feed-importer',
      config:{
        algolia:{
          app_id:env('ALGOLIA_APP_ID'),
          api_key:env('ALGOLIA_API_KEY'),
          property_index:env('ALGOLIA_PROPERTY_INDEX'),
          new_development_index:env('ALGOLIA_NEW_DEVELOPMENTS_INDEX')
        },
        webhook:{
          enabled: env.bool('WEBHOOK_ENABLED', false),
          url:env('WEBHOOK_URL', "")
        }
      }
    },
    'stb-notifications': {
      enabled: true,
      resolve: './node_modules/@starberry/strapi-plugin-stb-notifications'
    },
	'stb-audit-log': {
      enabled: true,
      resolve: './node_modules/@starberry/strapi-plugin-stb-audit-log',
      config:{
        auditLog:[]
      }
    },
	'stb-lists': {
      enabled: true,
	  //resolve: './src/plugins/stb-lists',
      resolve: './node_modules/@starberry/strapi-plugin-stb-lists'
    },
	'stb-forms': {
      enabled: true,
      resolve: './node_modules/@starberry/strapi-plugin-stb-forms',
      config:{
        offerNoApplicant: true,
        defaultSetup: false,
        leadProConfig:{
        base_url:"https://api.lead.pro",
        version:"v103",
        api_key:`${env('LEADPRO_APIKRY')}`,
        type:"vendor", // sale, vendor, landlord, let or mortgage_request'
        integrated_forms:['leadpro-valuation','Book a Valuation','Contact/General Enquiry','Team Contact','Property Enquiry','Home Visit Valuation']
        },
        emailTemplate: {
          from: `${env('EMAIL_FROM')}`,
          to: '',
          cc: '',
          bcc: `${env('EMAIL_STAR_CLIENT')}`,
          logoPath: 'https://ggfx-dng.s3.eu-west-2.amazonaws.com/i.prod/dng_email_logo_f80d6bf098.png',
          name: 'user',
          site_name: `${env('SITE_NAME')}`,
          site_url: `${env('FRONTEND_URL')}`,
          site_email: `${env('EMAIL_CLIENT_DEFAULT')}`,
          site_address: 'Main Street Abbeyfeale Co. Limerick V94 Kc5T',
          site_phone_tel: '01 491 2600',
          site_phone: '01 491 2600',
          copyRightYear: new Date().getFullYear(),
          sendClientEmail: env.bool('EMAIL_CLIENT_SENT', false),
          starClientEmail: `${env('EMAIL_STAR_CLIENT')}`,
          clientDefaultEmail: `${env('EMAIL_CLIENT_DEFAULT')}`,
          cta_title: "Manage My Property",
          cta_desc: "Click login and manage your property transactions.",
          cta_label: "Login",
          cta_link: `${env('MY_ACCOUNT_URL')}/my-property`,
          unsubscribeUrl: `${env('MY_ACCOUNT_URL')}/profile/#notification`,
          propertyLink: (p) => {
            let sectorPath = p.sector || p.property_type || p.search_type,
              propertySearchTypeSlug = 'for-sale';
            if (sectorPath) {
              if (sectorPath.toLowerCase() === 'lettings') {
                propertySearchTypeSlug = 'to-rent';
              }
            }
            return `${env('FRONTEND_URL')}/property-${propertySearchTypeSlug}/${p.slug}-${p.objectID || p.id}`
          },
          emailRoute: {
            'property-alert': { //TemplateName
              //sendClientEmail: true, //send emails to all clients/domains
              sendClientEmail: env.bool('SEND_ALERT'), //Don't send the emails
              allowedDomains: `${env('ALLOWED_DOMAINS')}` || [], //send emails to default email user if empty
              defaultEmail: `${env('DEFAULT_EMAIL')}` //'govindaraj@starberry.tv'
            }
          }
        }
      }
    },
	  'ggfxservercore': {
    enabled: true,
    resolve: './node_modules/@strapi/plugin-ggfxservercore'
  },
    'stb-sitemap-generator': {
    enabled: true,
    resolve: './node_modules/@starberry/strapi-plugin-stb-sitemap-generator',
    config:{
      siteMap:true,
      redirect:true,
      property:{
        residential:{
          'sales':{
            secondPath:'property-for-sale',
            postPath:false,
            sortURLPath:false,
            sortURLPostPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          },
          'lettings':{
            secondPath:'property-to-rent',
            postPath:false,
            sortURLPath:false,
            sortURLPostPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          }
        },
        new_developments:{
          'sales':{
            secondPath:'new-home-for-sale',
            postPath:false,
            sortURLPath:false,
            sortURLPostPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          },
          'lettings':{
            secondPath:'new-home-to-rent',
            postPath:false,
            sortURLPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          }
        }
      },
      'new-developments':{
        new_developments:{
          'sales':{
            secondPath:'new-home-for-sale',
            postPath:false,
            sortURLPath:false,
            sortURLPostPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          },
          'lettings':{
            secondPath:'new-home-to-rent',
            postPath:false,
            sortURLPath:false,
            sortURLPostPath:false,
            sortURLfields:["crm_id"],
            sortURLRedirectCode:301
          }
        } 
    }
  }
  },
  'stb-dashboard': {
    enabled: true,
    resolve: './src/plugins/stb-dashboard'
  },
  'stb-export': {
    enabled: true,
    resolve: './src/plugins/stb-export'
  },
});
