import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">e-ticket Booking system</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/search">Book Ticket</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/booking-history">Booking History</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
