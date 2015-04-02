var Runner = require('../../../lib/common/runner');

var runner;

beforeEach(function() {
  runner = new Runner();
});

describe('Runner', function() {
  it('should emit taskFinish event', function(done) {
    runner.on('taskFinish', done);
    runner.taskFinish();
  });
});