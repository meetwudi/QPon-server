'use strict';

var EventEmitter = require('events').EventEmitter,
  util = require('util');

function Runner() {
  EventEmitter.call(this);
}
util.inherits(Runner, EventEmitter);

/**
 * Notify subscribers one task has been done
 * regardless of successful or not
 *
 * @method
 * @emit taskFinish
 */
Runner.prototype.taskFinish = function() {
  this.emit('taskFinish');
};


/**
 * Run one task
 * 
 */
Runner.prototype.run = function() {
  var fetcherName = FetcherRunner.fetchers[FetcherRunner.nextExecFetcherIdx],
    fetcher = require(path.resolve(__dirname, fetcherName)),
    that = this;

  fetcher.exec().then(function() {
    // update nextExecFetcherIdx
    FetcherRunner.nextExecFetcherIdx++;
    FetcherRunner.nextExecFetcherIdx %= FetcherRunner.fetchers.length;
    
    that.taskFinish();
  });

  console.log(`Fetcher Name: ${fetcherName}`);
};

module.exports = Runner;