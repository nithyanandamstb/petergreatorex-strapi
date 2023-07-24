module.exports = ({ env }) => [
  'strapi::errors',
  //'strapi::security',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${env("S3_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
	    "ggfx-myaccountdemo.s3.eu-west-2.amazonaws.com"
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${env("S3_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
            "ggfx-myaccountdemo.s3.eu-west-2.amazonaws.com"
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::deploynetlifywebhook'
];

