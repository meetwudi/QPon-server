'use strict';

var FetcherRunner = require('../../../lib/fetcher/FetcherRunner');

var fetcherRunner;

beforeEach(function() {
  fetcherRunner = new FetcherRunner();
});

describe('FetchRunner', function() {
  it('should not throw when run() gets called', function() {
    (function() {
      fetcherRunner.run();
    }).should.not.throw();
  });

  it('should emit taskFinish event after run() gets called', function(done) {
    fetcherRunner.on('taskFinish', done);
    fetcherRunner.run();
  });
});