'use strict';

var db = require('../../db/db');

// See API Spec http://api.woot.com/2/docs/events

module.exports = db.model('YP', {
  Title: String,
  Id: String,
  Site: String,
  StartDate: Date,
  EndDate: Date,
  Offers: [{
    Features: String,
    Id: String,
    Url: String,
    PercentageRemaining: Number,
    Rank: Number,
    Specs: String,
    Title: String,
    Photos: [{
      Url: String,
      Width: Number,
      Height: Number
    }],
    Items: [{
      Id: String,
      ListPrice: Number,
      SalePrice: Number,
      PurchaseLimit: Number,
      Attributes: [{
        Key: String,
        Value: String
      }]
    }]
  }]
});