import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const [trains, setTrains] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    const className = searchParams.get('class');
    const quota = searchParams.get('quota');

    setParams({ from, to, date, className, quota });

    // Fetch trains from backend
    axios.get('http://localhost:5000/api/trains/search', { params: { from, to, date } })
      .then(res => setTrains(res.data))
      .catch(err => console.error(err));
  }, [location.search]);

  return (
    <div className="mt-5">
      <h2>Trains from {params.from} to {params.to} on {params.date}</h2>
      {trains.length === 0 ? (
        <p>No trains found.</p>
      ) : (
        trains.map(train => (
          <div key={train._id} className="card mb-3">
            <div className="card-body">
              <h5>{train.number} - {train.name}</h5>
              <p>Departure: {train.departureTime} | Arrival: {train.arrivalTime}</p>
              <p>Date: {train.date}</p>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Availability</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {train.classes.map((cls, idx) => {
                    // If user selected a specific class, only show that class
                    if (params.className && params.className !== cls.className) {
                      return null; 
                    }
                    return (
                      <tr key={idx}>
                        <td>{cls.className}</td>
                        <td>{cls.availability} seats</td>
                        <td>₹ {cls.price}</td>
                        <td>
                          {cls.availability > 0 ? (
                            <Link
                              to={`/book-ticket/${train._id}/${encodeURIComponent(cls.className)}`}
                              className="btn btn-primary btn-sm"
                            >
                              Book Now
                            </Link>
                          ) : (
                            <button className="btn btn-secondary btn-sm" disabled>Waitlist</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
