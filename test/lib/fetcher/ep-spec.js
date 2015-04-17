'use strict';

var EP = require('../../../lib/fetcher/EP');

describe('EP fetcher', function() {
  it('should fetch from server and store to data store', function(done) {
    EP.exec().then(function() {
      done();
    });
  });
});