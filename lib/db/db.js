var mongoose = require('mongoose'),
  schemaFinder = require('./schemaFinder');

mongoose.connect('mongodb://localhost/qpon');

mongoose.connection.on('connected', function() {
  console.log('MongoDB connection established.');
});

mongoose.connection.on('error', function() {
  console.log('MongoDB connection failed');
});

schemaFinder.find(function(err, schemas) {
  schemas.forEach(function(schema) {
    mongoose.Schema(schema);
  });
});

module.exports = mongoose;