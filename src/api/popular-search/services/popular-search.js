'use strict';

/**
 * popular-search service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::popular-search.popular-search');
