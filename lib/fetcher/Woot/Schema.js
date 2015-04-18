'use strict';

var db = require('../../db/db'),
  Schema = db.Schema;

// See Spec http://api.woot.com/2/docs/events

var wootSchema = new db.Schema({
  _qponId: { type: String, index: { unique: true } },
  _qponProcessed: { type: Boolean, default: false },
  Url: String,
  Title: String,
  Subtitle: String,
  Company: { type: String, default: 'Woot' },
  Photos: [
    {
      Url: String
    }
  ],
  WriteUp: String,
  Features: String
});

module.exports = db.model('Woot', wootSchema);

