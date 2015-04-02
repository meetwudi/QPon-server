'use strict';

var Runner = require('../common/Runner'),
  util = require('util'),
  fs = require('fs'),
  path = require('path');

function TransformerRunner() {
  Runner.call(this);
}
util.inherits(TransformerRunner, Runner);

TransformerRunner.prototype.run = function() {
  var transformerName = TransformerRunner.transformers[TransformerRunner.nextExecTransformerIdx],
    transformer = require(path.resolve(__dirname, transformerName)),
    that = this;

  transformer.exec().then(function() {
    // update nextExecTransformerIdx
    TransformerRunner.nextExecTransformerIdx++;
    TransformerRunner.nextExecTransformerIdx %= TransformerRunner.transformers.length;
    
    that.taskFinish();
  });

  console.log(`Transformer Name: ${transformerName}`);
};

// Get all transformers (Sync!)
TransformerRunner.transformers = [];
TransformerRunner.nextExecTransformerIdx = 0;
fs.readdirSync(__dirname).forEach(function(name) {
  var stat = fs.statSync(path.resolve(__dirname, name));
  if (stat.isDirectory()) {
    TransformerRunner.transformers.push(name);
  }
});

module.exports = TransformerRunner;