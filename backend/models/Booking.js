// models/Booking.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassengerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  // New discount field (fixed amount subtracted from class price)
  discount: { type: Number, default: 0 }
});

const BookingSchema = new Schema({
  trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  className: { type: String, required: true },
  journeyDate: { type: String, required: true },
  passengers: [PassengerSchema],
  bookingDate: { type: Date, default: Date.now },
  // New field to store total calculated price for the booking
  totalPrice: { type: Number, default: 0 }
});

module.exports = mongoose.model('Booking', BookingSchema);
