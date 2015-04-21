'use strict';


var EP = require('./Schema'),
  request = require('request'),
  assert = require('assert'),
  url = require('url'),
  Promise = require('bluebird'),
  objectAssign = require('object-assign'),
  objectHash = require('object-hash'),
  config = require('./config.json');


/**
 * Fetch data from API provider and store in data store
 *
 * @param {Object} options - Search options
 * @return {Promise} 
 */
function exec(options) {
  options = options || {};

  return _fetch(options).then(function(data) {
    return _store(data);
  }, function(err) {
    console.log('Failed to fetch from EP.', err);
  });
}

function _fetch(options) {
  var key = process.env['QPON_EP_KEY'];
  assert(key, 'QPON_EP_KEY not configured');
  var apiUrl = url.parse(config.urlBase);
  apiUrl.query = objectAssign(apiUrl.query || {}, {
    key: key,
    page: 1
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
      resolve(body);
    });
  });
}

function _store(coupons) {
  coupons = JSON.parse(coupons);
  return new Promise(function(resolve, reject) {
    Promise.all(
      coupons.map(function(couponRaw) {
        couponRaw._qponId = objectHash(couponRaw);

        var coupon = new EP(couponRaw);
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