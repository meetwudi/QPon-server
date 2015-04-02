'use strict';

var db = require('../../db/db'),
  Schema = db.Schema;

// See Spec http://resourcecenter.yp.com/developer/apis/content/methods/v1/coupons

var ypSchema = db.model('YP', {
  businessName: String,
  city: String,
  couponCount: String,
  couponURL: String,
  phone: String,
  state: String,
  street: String,
  websiteURL: String,
  zip: String,
  coupons: [{
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
});

db.model('YP', ypSchema);