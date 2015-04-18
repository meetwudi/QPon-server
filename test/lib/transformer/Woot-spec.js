'use strict';

var WootTransformer = require('../../../lib/transformer/Woot'),
  Woot = require('../../../lib/fetcher/Woot/Schema');

describe('WootTransformer', function() {
  it('should transform record', function(done) {
    Woot.find({_qponProcessed: false}).count().exec().then(function(count) {
      return WootTransformer._transform();
    }).then(function() {
      return Woot.find({_qponProcessed: false}).count().exec();
    }).then(function(count) {
      done();
    });
  });
});