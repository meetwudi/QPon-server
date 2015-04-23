'use strict';

var Lesserthan = require('../../../lib/fetcher/Lesserthan'),
  assert = require('assert');

describe('Lesserthan fetcher', function() {
  // it('should fetch from server', function(done) {
  //   Lesserthan._fetch().then(function(res) {
  //     assert(res.root.status === 'OK');
  //     assert(!!res.root.items.item);
  //     assert(Array.isArray(res.root.items.item));
  //     done();
  //   });
  // });

  it('should fetch from server and store into datastore', function(done) {
    Lesserthan.exec().then(function(res) {
      done();
    });
  });
});