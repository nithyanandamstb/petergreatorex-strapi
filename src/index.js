'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
//  strapi.plugins['stb-feed-importer'].controllers.reapit.fileImport('johnshepherd_sales_properties')
  // strapi.plugins['stb-feed-importer'].controllers.reapit.fullImportNegotiator()
  // strapi.plugins['stb-feed-importer'].controllers.reapit.fullImportLettings()
 // strapi.plugins['stb-feed-importer'].controllers.reapit.fileImport('johnshepherd_sales_properties')
  // strapi.plugins['stb-feed-importer'].controllers.reapit.fullImportArea(true)
  },
};
