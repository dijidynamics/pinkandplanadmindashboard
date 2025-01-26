import React from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt, FaHome } from 'react-icons/fa'; // FontAwesome Icons

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="text-center mb-4">Dashboard</h4>
      <nav className="nav flex-column">
        <Link to="/" className="nav-link text-white">
          <FaHome /> Home
        </Link>
        <Link to="/vendors" className="nav-link text-white">
          <FaListAlt /> Vendor List
        </Link>
        {/* Add more links for other pages */}
      </nav>
    </div>
  );
}

export default Sidebar;
