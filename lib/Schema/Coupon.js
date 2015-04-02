var db = require('../db/db');

var couponSchema = new db.Schema({
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