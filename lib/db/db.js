'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qpon');

mongoose.connection.on('connected', function() {
  console.log('MongoDB connection established.');
});

mongoose.connection.on('error', function() {
  console.log('MongoDB connection failed');
});

module.exports = mongoose;