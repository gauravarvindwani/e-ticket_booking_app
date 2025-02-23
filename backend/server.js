require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const trainRoutes = require('./routes/trains');
const bookingRoutes = require('./routes/bookings');
// const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api/auth', authRoutes); // Only if you want login

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
