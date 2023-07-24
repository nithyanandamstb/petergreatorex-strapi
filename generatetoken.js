/**
 * Since Strapi not yet have a features to refresh token.
 * Some scripts need authenticated request. So here generating long lived jwt token
 */

const _         = require('lodash');
const request   = require('request');
const strapi 	= require('@strapi/strapi')();
const fs        = require('fs');
const jwt       = require('jsonwebtoken');

const initStrapi = async () => {
  await strapi.load();
  return strapi;
}

// end the process
const endProcess = () => {
  process.exit()
}

const main = (async () => {
  var [strapi] = await Promise.all([initStrapi()])

  // get input from command line
  const email = process.argv.slice(2)[0] || null; // second arg
  const expiresIn = process.argv.slice(3)[0] || '10y'; // third arg

  if (!email) {
    console.log('Please provide email as command line args. ex: node generatetoken.js foo@foo.com');
    endProcess();
  }

  // jwt expiry duration
  const jwtOptions = { expiresIn: expiresIn } // in days

  const user = await strapi.query('plugin::users-permissions.user').findOne({email:email});
  if ( user ) {
    const payload = { id: user.id }

    const token = jwt.sign(
      _.clone(payload.toJSON ? payload.toJSON() : payload),
      strapi.config.get('plugin.users-permissions.jwtSecret'),
      jwtOptions
    );

    // varify generated token
    const verify = async (token) => {
      return new Promise(function(resolve, reject) {
        jwt.verify(
          token,
          strapi.config.get('plugin.users-permissions.jwtSecret'),
          {},
          function(err, tokenPayload = {}) {
            if (err) {
              return reject(new Error('Invalid token.'));
            }
            resolve(tokenPayload);
          }
        );
      });
    }
    const expires = await verify(token);

    // Generate response
    const response = {
      email:email,
      token: token,
      expiresIn: expiresIn,
      expiresInTimestamp: expires.exp
    }

    console.log(response);

  } else {
    console.log('User not found!');
  }

  endProcess();

})() // Self-Invoke

