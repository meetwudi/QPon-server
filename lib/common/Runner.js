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

module.exports = Runner;