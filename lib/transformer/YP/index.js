var Coupon = require('../../Schema/Coupon'),
  YP = require('../../fetcher/YP/Schema'),
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
    YP.findOne({_qponProcessed: false}).exec()
      .then(function(yp) {
        // nothing to do
        if (!yp) resolve();
        // extract coupons and save
        var promises = yp.coupons.coupon.map(function(ypCoupon) {
          // construct coupon
          var couponRaw = {};
          couponRaw.title = ypCoupon.couponTitle;
          couponRaw.websiteURL = ypCoupon.couponURL;
          couponRaw.imageURL = ypCoupon.couponBusinessLogo;
          couponRaw.description = ypCoupon.couponDescription;
          couponRaw.company = {
            title: yp.businessName,
            websiteURL: yp.websiteURL,
            city: yp.city
          };
          couponRaw._qponId = objectHash(couponRaw);

          var coupon = new Coupon(couponRaw);
          return new Promise(function(resolve, reject) {
            coupon.save(function(err) {
              if (err) reject(err);
              resolve();
            });
          });
        });

        Promise.all(promises).then(function() {
          yp['_qponProcessed'] = true;
          yp.save(function(err) {
            if (err) reject(err);
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