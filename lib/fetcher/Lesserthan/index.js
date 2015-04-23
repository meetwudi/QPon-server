'use strict';


var Lesserthan = require('./Schema'),
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
 * @param {Object} options - Search options
 * @return {Promise} 
 */
function exec(options) {
  options = options || {};

  return _fetch(options).then(function(data) {
    return _store(data);
  }, function(err) {
    console.log('Failed to fetch from Lesserthan.', err);
  });
}

function _fetch(options) {
  var apiUrl = url.parse(config.urlBase);
  return new Promise(function(resolve, reject) {
    var options = {
      url: url.format(apiUrl),
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, function(err, res, body) {
      if (err) reject(err);
      body = xml2json.toJson(body);
      resolve(JSON.parse(body));
    });
  });
}

function _store(resObj) {
  var coupons = resObj.root.items.item;
  console.log(resObj.root.items);
  return new Promise(function(resolve, reject) {
    Promise.all(
      coupons.map(function(couponRaw) {
        couponRaw._qponId = objectHash(couponRaw);
        var coupon = new Lesserthan(couponRaw);
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