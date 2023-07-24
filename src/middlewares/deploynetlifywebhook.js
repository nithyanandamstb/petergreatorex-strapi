const axios = require('axios');

module.exports = () => {
  return async (ctx, next) => {
	if ((ctx.method === "PUT" || ctx.method === "POST" || ctx.method === "DELETE") && (ctx.request.url).startsWith('/content-manager/', 0 ) ){
	  // only after publish and update request
	  if(process.env.ENABLE_WEBHOOK){
		  axios.post(process.env.NETLIFY_WEBHOOK, { foo: 'bar' }).then(function (response) { console.log("NETLIFY_WEBHOOK Success"); }).catch(function (error) { console.log("NETLIFY_WEBHOOK", error); });
	  }
	}
	await next();
  }
}
