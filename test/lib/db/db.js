var db = require('../../../lib/db/db'),
  assert = require('assert');

describe('MongoDB', function() {
  it('should be opened', function(done) {
    db.connection.once('open', done);
  });
});