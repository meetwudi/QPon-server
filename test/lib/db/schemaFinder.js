var schemaFinder = require('../../../lib/db/schemaFinder'),
  should = require('should');

describe('schemaFinder', function() {
  it('should get all schemas', function(done) {
    schemaFinder.find(function(err, files) {
      files.should.be.instanceof(Array);
      done();
    });
  });
});