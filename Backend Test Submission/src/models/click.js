const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
  url:       { type: mongoose.Schema.Types.ObjectId, ref: 'Url' },
  timestamp: { type: Date, default: () => new Date() },
  referrer:  String,
  country:   String
});

module.exports = mongoose.model('Click', ClickSchema);
