var Runner = require('../common/Runner'),
  util = require('util'),
  fs = require('fs'),
  path = require('path');

function FetcherRunner() {
  Runner.call(this);
}
util.inherits(FetcherRunner, Runner);

FetcherRunner.prototype.run = function() {
  var fetcherName = FetcherRunner.fetchers[FetcherRunner.lastExecFetcherIdx],
    fetcher = require(path.resolve(__dirname, fetcherName)),
    that = this;
  
  fetcher.exec().then(function() {
    that.taskFinish();
    // update lastExecFetcherIdx
    FetcherRunner.lastExecFetcherIdx++;
    FetcherRunner.lastExecFetcherIdx %= FetcherRunner.fetchers.length;
  });
};

// Get all fetchers (Sync!)
FetcherRunner.fetchers = [];
FetcherRunner.lastExecFetcherIdx = 0;
fs.readdirSync(__dirname).forEach(function(name) {
  var stat = fs.statSync(path.resolve(__dirname, name));
  if (stat.isDirectory()) {
    FetcherRunner.fetchers.push(name);
  }
});

module.exports = FetcherRunner;