import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchTrains from './pages/SearchTrains';
import SearchResults from './pages/SearchResults';
import BookTicket from './pages/BookTicket';
import BookingHistory from './pages/BookingHistory';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchTrains />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/book-ticket/:trainId/:className" element={<BookTicket />} />
          <Route path="/booking-history" element={<BookingHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
