var Coupon = require('../../Schema/Coupon'),
  Lesserthan = require('../../fetcher/Lesserthan/Schema'),
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
    Lesserthan.findOne({_qponProcessed: false}).exec()
      .then(function(lesserthan) {
        // nothing to do
        if (!lesserthan) resolve();
        // convert into unified schema
        var couponRaw = {};
        couponRaw.title = lesserthan.deal.title;
        couponRaw.websiteURL = lesserthan.deal.link;
        couponRaw.imageURL = lesserthan.deal.image_thumb;
        couponRaw.description = lesserthan.deal.description;
        couponRaw.company = {
          title: lesserthan.merchant.name,
          websiteURL: lesserthan.merchant.website,
          city: lesserthan.merchant.city
        };
        couponRaw._qponId = objectHash(couponRaw);
        var coupon = new Coupon(couponRaw);
        coupon.save(function(err) {
          // TODO: log error
          lesserthan['_qponProcessed'] = true;
          lesserthan.save(function(err) {
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