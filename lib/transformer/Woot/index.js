var Coupon = require('../../Schema/Coupon'),
  Woot = require('../../fetcher/Woot/Schema'),
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
    Woot.findOne({_qponProcessed: false}).exec()
      .then(function(woot) {
        // nothing to do
        if (!woot) resolve();
        // convert into unified schema
        var couponRaw = {};
        couponRaw.title = woot.Title;
        couponRaw.websiteURL = woot.Url;
        if (woot.Photos.length > 0) {
          couponRaw.imageURL = woot.Photos[0].Url;
        }
        couponRaw.description = woot.Features + '\n\n' + woot.WriteUp;
        couponRaw.company = {
          title: woot.Company,
          websiteURL: 'http://www.woot.com',
          city: ''
        };
        couponRaw._qponId = objectHash(couponRaw);
        var coupon = new Coupon(couponRaw);
        coupon.save(function(err) {
          // TODO: log error
          woot['_qponProcessed'] = true;
          woot.save(function(err) {
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