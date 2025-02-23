
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stationList = [
  "MUMBAI CENTRAL - MMCT",
  "MUMBAI CST - CSTM",
  "PUNE JN - PUNE",
  "NEW DELHI - NDLS",
  "CHENNAI CENTRAL - MAS",
  "KOLKATA HOWRAH - HWH"
];

const SearchTrains = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [className, setClassName] = useState('');
  const [quota, setQuota] = useState('General');

  // States for autocomplete suggestions
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // Handler for "From" input
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    if (value.length > 0) {
      const matches = stationList.filter(station =>
        station.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(matches);
    } else {
      setFromSuggestions([]);
    }
  };

  const pickFromSuggestion = (station) => {
    setFrom(station);
    setFromSuggestions([]);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    if (value.length > 0) {
      const matches = stationList.filter(station =>
        station.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(matches);
    } else {
      setToSuggestions([]);
    }
  };

  const pickToSuggestion = (station) => {
    setTo(station);
    setToSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?from=${from}&to=${to}&date=${date}&class=${className}&quota=${quota}`);
  };

  return (
    <div className="mt-5">
      <h2>Book Your Ticket</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {/* FROM input with autocomplete */}
        <div className="col-md-3 position-relative">
          <label className="form-label">From</label>
          <input 
            type="text" 
            className="form-control"
            value={from}
            onChange={handleFromChange}
            placeholder="MUMBAI CENTRAL - MMCT"
            required 
          />
          {fromSuggestions.length > 0 && (
            <ul className="list-group position-absolute" style={{ zIndex: 1000, top: '70%', width: '100%' }}>
              {fromSuggestions.map((station, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => pickFromSuggestion(station)}
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>

        {}
        <div className="col-md-3 position-relative">
          <label className="form-label">To</label>
          <input 
            type="text"
            className="form-control"
            value={to}
            onChange={handleToChange}
            placeholder="PUNE JN - PUNE"
            required 
          />
          {toSuggestions.length > 0 && (
            <ul className="list-group position-absolute" style={{ zIndex: 1000, top: '70%', width: '100%' }}>
              {toSuggestions.map((station, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => pickToSuggestion(station)}
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-2">
          <label className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required 
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Class</label>
          <select className="form-select" value={className} onChange={(e) => setClassName(e.target.value)}>
            <option value="">All Classes</option>
            <option value="Sleeper (SL)">Sleeper (SL)</option>
            <option value="AC 3 Tier (3A)">AC 3 Tier (3A)</option>
            <option value="AC 2 Tier (2A)">AC 2 Tier (2A)</option>
            <option value="AC 1 Tier (1A)">AC 1 Tier (1A)</option>
            <option value="AC Chair Car (CC)">AC Chair Car (CC)</option>
            <option value="Second Seating (2S)">Second Seating (2S)</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Quota</label>
          <select className="form-select" value={quota} onChange={(e) => setQuota(e.target.value)}>
            <option value="General">General</option>
            <option value="Tatkal">Tatkal</option>
            <option value="Senior">Senior Citizen</option>
          </select>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchTrains;
