'use strict';

var Woot = require('../../../lib/fetcher/Woot');

describe('Woot fetcher', function() {
  it('should fetch from server and store to data store', function(done) {
    Woot.exec().then(function() {
      done();
    });
  });
});