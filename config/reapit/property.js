const {
    Import: {
      getUrlsSetByUpdateImportProcess,
    },
  } = require("@starberry/jamstack-ggfxserver");

module.exports = { 
    // async ggfxImageTransforms(propertyId, newData, oldData, action){
    //     let oldImages = {}
    //     let transforms = {}

    //     if(action == "update"){
    //         oldImages = oldData.images
    //         transforms = oldData.imagetransforms
    //     }

    //     return new Promise((resolve, reject) => {
    //         Promise.allSettled([
    //           getUrlsSetByUpdateImportProcess('property', propertyId, {images: newData.images.slice(0, 1)}, oldImages, transforms, {
    //             format: '', transforms: ['736x500', '352x276']
    //           })
    //         ]).then(result => {
    //           if (result.length > 0) {
    //             return resolve({
    //               'images': result[0] ? result[0].value.images : undefined,
    //             })
    //           }
    //           resolve({});
    //         }).catch(error => {
    //           logger('GetGgfxImages error', error)
    //           resolve({});
    //         })
    //       })
    //   }  
}