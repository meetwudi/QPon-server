'use strict';

var db = require('../../db/db'),
  Schema = db.Schema;

// See Spec http://resourcecenter.yp.com/developer/apis/content/methods/v1/coupons

var ypSchema = new db.Schema({
  _qponId: { type: String, index: { unique: true } },
  _qponProcessed: { type: Boolean, default: false },
  businessName: String,
  city: String,
  couponCount: Number,
  couponURL: String,
  phone: String,
  state: String,
  street: String,
  websiteURL: String,
  zip: String,
  coupons: {
    coupon: [{
      couponAttribution: String,
      couponBusinessLogo: String,
      couponDescription: String,
      couponDisclaimer: String,
      couponExpiration: String,
      couponId: String,
      couponSourceCode: String,
      couponTitle: String,
      couponURL: String
    }]
  }
});

module.exports = db.model('YP', ypSchema);

