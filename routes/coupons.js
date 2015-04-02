var express = require('express');
var router = express.Router();

var Coupon = require('../lib/Schema/Coupon');

/* GET search coupons listing */
router.get('/search', function(req, res) {
  var query = {
    keyword: req.query['keyword'],
    field: req.query['field'] || 'title'
  };
  if (!query.keyword) {
    return res.status(400).json({error: 'Keyword is required'});
  }

  var filterObj = {};
  filterObj[query.field] = new RegExp(query.keyword, 'i');

  Coupon
    .find(filterObj)
    .limit(query.records)
    .skip(query.records * (query.page - 1))
    .exec().then(function(coupons) {
      res.json(coupons);
    });
});

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
