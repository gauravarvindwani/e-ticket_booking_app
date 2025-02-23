require('dotenv').config();
const mongoose = require('mongoose');
const Train = require('./models/Train');

const sampleTrains = [
  {
    number: "12951",
    name: "Mumbai Rajdhani Express",
    from: "MUMBAI CENTRAL - MMCT",
    to: "NEW DELHI - NDLS",
    date: "2025-02-23",
    departureTime: "16:35",
    arrivalTime: "08:35",
    classes: [
      { className: "AC 1 Tier (1A)", availability: 5, price: 3000 },
      { className: "AC 2 Tier (2A)", availability: 10, price: 2000 },
      { className: "AC 3 Tier (3A)", availability: 15, price: 1500 }
    ]
  },
  {
    number: "12123",
    name: "Deccan Queen",
    from: "MUMBAI CST - CSTM",
    to: "PUNE JN - PUNE",
    date: "2025-02-23",
    departureTime: "07:00",
    arrivalTime: "10:25",
    classes: [
      { className: "AC Chair Car (CC)", availability: 20, price: 500 },
      { className: "Second Seating (2S)", availability: 50, price: 150 }
    ]
  },
  {
    number: "19311",
    name: "Pune Indore Express",
    from: "PUNE JN - PUNE",
    to: "INDORE - INDB",
    date: "2025-02-23",
    departureTime: "15:30",
    arrivalTime: "08:10",
    classes: [
      { className: "Sleeper (SL)", availability: 30, price: 400 },
      { className: "AC 3 Tier (3A)", availability: 10, price: 700 }
    ]
  },
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected, seeding data...');
    await Train.deleteMany({});
    await Train.insertMany(sampleTrains);
    console.log('Seed data inserted successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
