'use strict';

/**
 * site-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-config.site-config');
