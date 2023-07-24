try {
  var strapi = require('@strapi/strapi')();
  const { isArray } = require('lodash');
  const algoliasearch = require("algoliasearch");
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY,
    {
      timeouts: {
        connect: 100,
        read: 10,
        write: 100,
      },
    }
  );
  const property_index = client.initIndex(process.env.ALGOLIA_PROPERTY_INDEX);

  //GGFX server
  const {
    Import: {
      getUrlByImport,
      getUrlsSetByUpdateImportProcess
    }
  } = require('@starberry/jamstack-ggfxserver');

  async function initStrapi() {
    await strapi.load();
    return strapi;
  }

  async function main() {
    var [strapi] = await Promise.all([initStrapi()])
    const [entries, count] = await strapi.db.query('api::property.property').findWithCount({
      select: ['crm_id', 'title', 'id', 'publish', 'images', 'price_qualifier', 'price', 'area', 'building', 'bedroom', 'display_address', 'slug', 'available_from'],
      where: { publish: true },
      orderBy: { 'crm_id': 'DESC' },
      limit: 50
    });
    await Promise.all(entries.map(async data => {
      let algolia_data = { ...data };
      try {
        let imageSectionName = data.department !== 'newdevelopments' ? 'property' : 'new-developments';
        const TransformedImagesUrls = await getUrlsSetByUpdateImportProcess(imageSectionName, data.id, {
          "images": data.images.slice(0, 2),
        }, {
          "images": data.images.slice(0, 2),
        }, data.imagetransforms, { transforms: GetSearchResultTransforms(imageSectionName), format: 'webp' });

        await property_index.partialUpdateObject({
          // ...algolia_data,
          objectID: data.id,
          ...TransformedImagesUrls,
          // area: FormSlug(data.area),
          // building: isArray(data.building) ? data.building.map(b => FormSlug(b)): []
        }, {
          createIfNotExists: true,
        });
      } catch (error) {
        console.log('GGFX image processing error', error);
      }
      return Promise.resolve('success');
    }));
    console.log('Done');
  }

  const GetSearchResultTransforms = (imageSectionName) => {
    const SearchResultsTransform = {
      property: ["416x300"],
    }
    return SearchResultsTransform[imageSectionName];
  }

  function FormSlug(data) {
    if (data && data != "" && data != null)
      return data.replace(/[\s\-\/,]+/g, '-').trim().toLowerCase()
    return null;
  }

  main();
} catch (error) {
  console.log(error)
}
