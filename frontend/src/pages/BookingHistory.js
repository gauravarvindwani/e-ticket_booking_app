
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCancel = (id) => {
    axios.delete(`http://localhost:5000/api/bookings/${id}`)
      .then(() => {
        alert('Booking cancelled!');
        setBookings(bookings.filter(b => b._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="mt-5">
      <h2>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} className="card mb-3">
            <div className="card-body">
              <h5>Booking ID: {booking._id}</h5>
              <p>Train: {booking.trainId?.number} - {booking.trainId?.name}</p>
              <p>Class: {booking.className}</p>
              <p>Journey Date: {booking.journeyDate}</p>
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</p>
              <p><strong>Total Price: ₹ {booking.totalPrice}</strong></p>
              <ul>
                {booking.passengers.map((p, idx) => (
                  <li key={idx}>
                    {p.name} (Age {p.age}, {p.gender}, Discount: ₹ {p.discount})
                  </li>
                ))}
              </ul>
              <button className="btn btn-danger" onClick={() => handleCancel(booking._id)}>
                Cancel Booking
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
