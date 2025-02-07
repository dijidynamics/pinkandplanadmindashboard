import React from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt, FaHome } from 'react-icons/fa'; // FontAwesome Icons
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const role = sessionStorage.getItem('role'); // Get the role from sessionStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    window.history.pushState(null, null, '/'); // Prevent back button navigation
  };

  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="text-center mb-4">Dashboard</h4>
      <nav className="nav flex-column">
        {role === "customer" && (
          <>
            <Link to="/Userdashboardpage" className="nav-link text-white">
              <FaHome /> Dashboard
            </Link>
            <Link to="/Usereventhistory" className="nav-link text-white">
              <FaListAlt /> Event History
            </Link>
          </>
        )}

        {role === "vendor" && (
          <>
            <Link to="/Vendordashboard" className="nav-link text-white">
              <FaListAlt /> Vendor Dashboard
            </Link>
            
            <Link to="/categorylist" className="nav-link text-white">
              <FaListAlt /> Category List
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
           <Link to="/Admindashboard" className="nav-link text-white">
              <FaListAlt /> Dashboard
            </Link>
            <Link to="/vendors" className="nav-link text-white">
              <FaListAlt /> Vendor & User List
            </Link>
            <Link to="/addnewvendor" className="nav-link text-white">
              <FaListAlt /> Add New User
            </Link>
            <Link to="/Admincategorylist" className="nav-link text-white">
              <FaListAlt /> Category List
            </Link>
            
          
          </>
        )}
        
        <button style={{border: '1px solid #607D8B', color: '#607D8B'}} onClick={handleLogout} className="btn">Logout</button>
      </nav>
    </div>
  );
}

export default Sidebar;
