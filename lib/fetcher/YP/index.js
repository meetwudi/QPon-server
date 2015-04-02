'use strict';

var YP = require('./Schema'),
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
 * @param  {Function} callback - callback function
 */
function exec() {
  return _fetch().then(function(data) {
    return _store(data);
  }, function(err) {
    console.log('Failed to fetch from YP.', err);
  });
}

function _fetch() {
  var key = process.env['QPON_YP_KEY'];
  assert(key, 'QPON_YP_KEY not configured');
  var apiUrl = url.parse(config.urlBase);
  apiUrl.query = objectAssign(apiUrl.query || {}, {
    key: key,
    searchloc: 'San Francisco',
    format: 'xml'
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

function _store(data) {
  return new Promise(function(resolve, reject) {
    // xml to json
    var fs = require('fs');
    var coupons = xml2json.toJson(data);
    coupons = JSON.parse(coupons);
    coupons = coupons['searchResult']['searchListings']['searchListing'];

    Promise.all(
      coupons.map(function(couponRaw) {
        couponRaw._qponId = objectHash(couponRaw);
        
        // couponRaw.coupons.coupon will be
        // a object (not an array) when couponRaw.couponCount == 1
        if (couponRaw.couponCount === 1) {
          couponRaw.coupons.coupon = [couponRaw.coupons.coupon];
        }

        var coupon = new YP(couponRaw);
        return new Promise(function(resolve, reject) {
          coupon.save(function(err) {
            if (err) reject(err);
            resolve(coupon);
          });
        });
      })
    ).then(function(coupons) {
      resolve(coupons);
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