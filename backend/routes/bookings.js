const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Train = require('../models/Train');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('trainId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a booking
router.post('/', async (req, res) => {
  try {
    const { trainId, className, journeyDate, passengers } = req.body;
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ error: 'Train not found' });

    // Check seat availability for the chosen class
    const selectedClass = train.classes.find(c => c.className === className);
    if (!selectedClass) {
      return res.status(400).json({ error: 'Invalid class selected' });
    }

    // Check if seats are available
    if (selectedClass.availability < passengers.length) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Deduct seats
    selectedClass.availability -= passengers.length;
    await train.save();

    // Calculate total price based on discount
    let totalPrice = 0;
    passengers.forEach(p => {
      // discount is a fixed amount subtracted from the base class price
      let passengerCost = selectedClass.price - (p.discount || 0);
      if (passengerCost < 0) passengerCost = 0; // don't go below zero
      totalPrice += passengerCost;
    });

    // Create booking
    const newBooking = new Booking({
      trainId,
      className,
      journeyDate,
      passengers,
      totalPrice
    });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trainId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    // Return seats to the class
    const train = booking.trainId;
    const selectedClass = train.classes.find(c => c.className === booking.className);
    if (selectedClass) {
      selectedClass.availability += booking.passengers.length;
      await train.save();
    }

    await booking.remove();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
