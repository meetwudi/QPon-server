var fs = require('fs'),
  recursive = require('recursive-readdir'),
  path = require('path'),
  Promise = require('es6-promise').Promise;

function find(callback) {
  recursive(path.resolve(__dirname, '../fetcher'), function(err, files) {
    Promise.all(files.map(function(file) {
      return new Promise(function(resolve, reject) {
        resolve(require(file));
      });
    })).then(function(schemas) {
      callback(null, schemas);
    });
  });
}


module.exports = {
  find: find
};