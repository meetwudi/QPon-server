'use strict';

var Woot = require('./Schema'),
  request = require('request'),
  assert = require('assert'),
  url = require('url'),
  xml2json = require('xml2json'),
  Promise = require('bluebird'),
  objectAssign = require('object-assign'),
  objectHash = require('object-hash'),
  config = require('./config.json');


/**
 * Fetch data from API provider and store in data store
 *
 * @param {Object<searchloc>} options - Search options
 * @return {Promise} 
 */
function exec(options) {
  options = options || {};

  return _fetch(options).then(function(data) {
    return _store(data);
  }, function(err) {
    console.log('Failed to fetch from Woot.', err);
  });
}

function _fetch(options) {
  var key = process.env['QPON_WOOT_KEY'],
    secret = process.env['QPON_WOOT_SECRET'];
  assert(key, 'QPON_WOOT_KEY not configured');
  assert(secret, 'QPON_WOOT_KEY not configured');
  var apiUrl = url.parse(config.urlBase);
  apiUrl.query = objectAssign(apiUrl.query || {}, {
    site: 'www.woot.com',
    eventType: 'Moofi',
    key: key
  });
  return new Promise(function(resolve, reject) {
    var options = {
      url: url.format(apiUrl),
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, function(err, res, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function _store(results) {
  return new Promise(function(resolve, reject) {
    // xml to json
    var coupons = [];
    results.forEach(function(result) {
      if (Array.isArray(result.Offers)) {
        coupons = coupons.concat(result.Offers);
      }
    });

    Promise.all(
      coupons.map(function(couponRaw) {
        // Assign QPon ID
        couponRaw._qponId = objectHash(couponRaw);
        var coupon = new Woot(couponRaw);
        return new Promise(function(resolve, reject) {
          coupon.save(function(err) {
            // TODO: Log error
            resolve(); // tolerant error
          });
        });
      })
    ).then(function() {
      resolve();
    }, function(err) {
      reject(err);
    });
  });
}


module.exports = {
  exec: exec,
  _fetch: _fetch,
  _store: _store
}