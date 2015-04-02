var db = require('../db/db');

var couponSchema = new db.Schema({
  _qponId: { type: String, index: { unique: true } },
  title: String,
  websiteURL: String,
  imageURL: String,
  description: String,
  company: {
    title: String,
    websiteURL: String,
    city: String
  }
});

module.exports = db.model('Coupon', couponSchema);