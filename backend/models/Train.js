// models/Train.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  className: { type: String, required: true },  // e.g. "Sleeper (SL)", "AC 3 Tier (3A)"
  availability: { type: Number, default: 0 },   // seats available
  price: { type: Number, default: 0 }           // price for that class
});

const TrainSchema = new Schema({
  number: { type: String, required: true }, // e.g. "12123"
  name: { type: String, required: true },   // e.g. "Mumbai Pune Express"
  from: { type: String, required: true },   // e.g. "Mumbai"
  to: { type: String, required: true },     // e.g. "Pune"
  date: { type: String, required: true },   // e.g. "2025-02-23"
  departureTime: { type: String, required: true }, // e.g. "06:00"
  arrivalTime: { type: String, required: true },   // e.g. "10:00"
  classes: [ClassSchema]
});

module.exports = mongoose.model('Train', TrainSchema);
