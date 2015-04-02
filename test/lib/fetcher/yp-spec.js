'use strict';

var YP = require('../../../lib/fetcher/YP');

describe('YP fetcher', function() {
  it('should fetch from server and store to data store', function(done) {
    YP.exec().then(function() {
      done();
    });
  });
});