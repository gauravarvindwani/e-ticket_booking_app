
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookTicket = () => {
  const { trainId, className } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);

  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', discount: 0 }
  ]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/trains/${trainId}`)
      .then(res => setTrain(res.data))
      .catch(err => console.error(err));
  }, [trainId]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: '', discount: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!train) return;

    // Prepare booking data
    const bookingData = {
      trainId: trainId,
      className: decodeURIComponent(className),
      journeyDate: train.date,
      passengers: passengers.map(p => ({
        name: p.name,
        age: Number(p.age),
        gender: p.gender,
        discount: Number(p.discount)
      }))
    };

    axios.post('http://localhost:5000/api/bookings', bookingData)
      .then(res => {
        alert('Booking successful!');
        navigate('/booking-history');
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.error || 'Booking failed');
      });
  };

  if (!train) return <div>Loading...</div>;

  return (
    <div className="mt-5">
      <h3>Book Ticket - {train.number} ({train.name})</h3>
      <p><strong>Class:</strong> {decodeURIComponent(className)}</p>
      <p><strong>Date:</strong> {train.date}</p>
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5>Passenger {index + 1}</h5>
              <div className="form-group mb-2">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label>Gender</label>
                <select
                  className="form-control"
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label>Discount (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={passenger.discount}
                  onChange={(e) => handlePassengerChange(index, 'discount', e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addPassenger}>
          Add Another Passenger
        </button>
        <br />
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookTicket;
