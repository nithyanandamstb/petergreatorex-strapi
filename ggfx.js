module.exports = {
  importConfig: {
    //All fields format has default value as image source format so no need include any other format other than webp
    property: {
      modelName: 'property',
      images: {
        transforms: [
         
        ],
        formats: ['webp'], //Default format is source image format
      },
      epc: {
        transforms: [],
        formats: [], //Default format is source image format
      },
      floorplan: {
        transforms: [],
        formats: [], //Default format is source image format
      },
      brochure: { //Its performs upload due to mostly brochures are pdf etc only so transforms and formats are empty
        transforms: [],
        formats: []
      },
    },
    "new-developments": {
      modelName: 'new-developments',
      images: {
        transforms: [
          
        ],
        formats: ['webp'], //Default format is source image format
      },
      epc: {
        transforms: [],
        formats: [], //Default format is source image format
      },
      floorplan: {
        transforms: [],
        formats: [], //Default format is source image format
      },
      brochure: { //Its performs upload due to mostly brochures are pdf etc only so transforms and formats are empty
        transforms: [],
        formats: []
      },
    }
  },
  //This configuration for sharing image to other service like algolia
  sharingImageConfig: {
    //If all fields has the same transforms then simply pass this one of the parameter in function calling
    images: {
      transforms: ["416x300"],
      format: '', //Default format is image source image format
      restrictedCount: 1 //Number of images send to algolia or other service Default is 1 and MAX is 5
    },
    serviceProvider: 'algolia',
  },
  frontendImageConfig: {
    location: 'https://strakers-dev.q.starberry.com/images/config.json'
  },
  imageVersioningPrefix: 'GGFX_V' //For best practice add _ as prefix and suffix letter
}


