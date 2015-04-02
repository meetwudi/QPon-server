var Runner = require('../common/Runner'),
  util = require('util'),
  fs = require('fs'),
  path = require('path');

function FetcherRunner() {
  Runner.call(this);
}
util.inherits(FetcherRunner, Runner);

FetcherRunner.prototype.run = function() {
  var fetcherName = FetcherRunner.fetchers[FetcherRunner.nextExecFetcherIdx],
    fetcher = require(path.resolve(__dirname, fetcherName)),
    that = this;

  fetcher.exec().then(function() {
    that.taskFinish();
    // update nextExecFetcherIdx
    FetcherRunner.nextExecFetcherIdx++;
    FetcherRunner.nextExecFetcherIdx %= FetcherRunner.fetchers.length;
  });

  console.log(`Fetcher Name: ${fetcherName}`);
};

// Get all fetchers (Sync!)
FetcherRunner.fetchers = [];
FetcherRunner.nextExecFetcherIdx = 0;
fs.readdirSync(__dirname).forEach(function(name) {
  var stat = fs.statSync(path.resolve(__dirname, name));
  if (stat.isDirectory()) {
    FetcherRunner.fetchers.push(name);
  }
});

module.exports = FetcherRunner;