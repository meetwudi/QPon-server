'use strict';

var db = require('../../db/db'),
  Schema = db.Schema;

// See Spec http://www.8coupons.com/api/doc - Getting RealTime Local Deals

var epSchema = new db.Schema({
  _qponId: { type: String, index: { unique: true } },
  _qponProcessed: { type: Boolean, default: false },
  name: String,  // company name
  dealinfo: String,
  city: String,
  dealSource: String,
  dealTitle: String,
  disclaimer: String,
  expirationDate: Date,
  postDate: Date,
  showImage: String,
  providerName: String,
  dealPrice: String, 
  dealOriginalPrice: String,
  dealSavings: String,
  dealDiscountPercent: String
});

module.exports = db.model('EP', epSchema);

