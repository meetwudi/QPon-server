var express = require('express');
var router = express.Router();

var Coupon = require('../lib/Schema/Coupon');

/* GET coupons listing. */
router.get('/', function(req, res) {
  var query = {
    page: req.query['page'] || 1,
    records: req.query['records'] || 15
  };

  Coupon
    .find({})
    .limit(query.records)
    .skip(query.records * (query.page - 1))
    .exec().then(function(coupons) {
      res.json(coupons);
    });
});

module.exports = router;
