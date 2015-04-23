'use strict';

var db = require('../../db/db'),
  Schema = db.Schema;

// See Spec http://www.8coupons.com/api/doc - Getting RealTime Local Deals

var lesserthanSchema = new db.Schema({
  _qponId: { type: String, index: { unique: true } },
  _qponProcessed: { type: Boolean, default: false },
  deal: {
    title: String,
    source: String,
    description: String,
    image: String,
    image_thumb: String
  },
  merchant: {
    name: String,
    website: String
  },
  region: {
    locality: String,
    region: String,
    region_abbrev: String
  }
});

module.exports = db.model('Lesserthan', lesserthanSchema);

