'use strict';


var LesserthanTransformer = require('../../../lib/transformer/Lesserthan'),
  Lesserthan = require('../../../lib/fetcher/Lesserthan/Schema');

describe('LesserthanTransformer', function() {
  it('should transform record', function(done) {
    Lesserthan.find({_qponProcessed: false}).count().exec().then(function(count) {
      return LesserthanTransformer._transform();
    }).then(function() {
      return Lesserthan.find({_qponProcessed: false}).count().exec();
    }).then(function(count) {
      done();
    });
  });
});