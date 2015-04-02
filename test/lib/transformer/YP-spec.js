'use strict';


var YPTransformer = require('../../../lib/transformer/YP'),
  YP = require('../../../lib/fetcher/YP/Schema');

describe('YPTransformer', function() {
  it('should transform record', function(done) {
    YP.find({_qponProcessed: false}).count().exec().then(function(count) {
      return YPTransformer._transform();
    }).then(function() {
      return YP.find({_qponProcessed: false}).count().exec();
    }).then(function(count) {
      done();
    });
  });
});