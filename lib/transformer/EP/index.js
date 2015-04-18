var Coupon = require('../../Schema/Coupon'),
  EP = require('../../fetcher/EP/Schema'),
  config = require('../config.json'),
  Promise = require('bluebird'),
  objectHash = require('object-hash');


/**
 * Transform up to config.maxRecordsTransform records
 * into Coupon Schema
 * 
 * @return {Promise}
 */
function exec() {
  var promises = [],
    i;
  for (var i = 0; i < config.maxRecordsTransform; i ++) {
    promises.push(new Promise(function(resolve, reject) {
      _transform().then(resolve, reject);
    })); 
  }
  return Promise.all(promises);
}

/**
 * Transform up to one record
 * 
 * @return {Promise}
 */
function _transform() {
  return new Promise(function(resolve, reject) {
    EP.findOne({_qponProcessed: false}).exec()
      .then(function(ep) {
        // nothing to do
        if (!ep) resolve();
        // convert into unified schema
        var couponRaw = {};
        couponRaw.title = ep.dealTitle;
        couponRaw.websiteURL = ep.URL;
        couponRaw.imageURL = ep.showImage;
        couponRaw.description = ep.dealinfo;
        couponRaw.company = {
          title: ep.name,
          websiteURL: ep.storeURL,
          city: ep.city
        };
        couponRaw._qponId = objectHash(couponRaw);
        var coupon = new Coupon(couponRaw);
        coupon.save(function(err) {
          // TODO: log error
          ep['_qponProcessed'] = true;
          ep.save(function(err) {
            if (err) reject();
            resolve();
          });
        });
      }, reject);
  });
}

module.exports = {
  exec: exec,
  _transform: _transform
};