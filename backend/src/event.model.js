// models/eventModel.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;