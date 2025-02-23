const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// GET: Search trains by from, to, date
router.get('/search', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) query.date = date;

    const trains = await Train.find(query);
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all trains (for admin or debugging)
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).json({ error: 'Train not found' });
    res.json(train);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new train (hypothetical, e.g., for admin)
router.post('/', async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    const savedTrain = await newTrain.save();
    res.status(201).json(savedTrain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a train
router.put('/:id', async (req, res) => {
  try {
    const updatedTrain = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrain) return res.status(404).json({ error: 'Train not found' });
    res.json(updatedTrain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE remove a train
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrain = await Train.findByIdAndDelete(req.params.id);
    if (!deletedTrain) return res.status(404).json({ error: 'Train not found' });
    res.json({ message: 'Train deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
