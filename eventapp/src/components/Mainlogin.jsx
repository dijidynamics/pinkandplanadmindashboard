import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Mainlogin() {
  const [dbusername, setDbusername] = useState('');
  const [dbpassword, setdbpassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer'); // Set the default role
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (sessionStorage.getItem('username')) {
      navigate('/Userdashboardpage');  // Redirect to user dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://147.93.96.202:4001/dbuser', { dbusername, dbpassword });
      alert(response.data.message);
  
      // Store username and role in sessionStorage
      sessionStorage.setItem('username', response.data.dbusername);
      sessionStorage.setItem('role', response.data.role);
      sessionStorage.setItem('ssm', response.data.ssm);
      // Redirect based on user role
      switch (response.data.role) {
        case 'customer':
          navigate('/Userdashboardpage');
          break;
        case 'vendor':
          navigate('/Vendordashboard');
          break;
        case 'admin':
          navigate('/Admindashboard'); // Change this to the correct admin page
          break;
        default:
          navigate('/categorylist');
          break;
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor:'#f4f4f4'}}>
      <div className="card text-center" style={{width:'350px'}}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs justify-content-center" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="one-tab" data-bs-toggle="tab" href="#one" role="tab" aria-controls="one" aria-selected="true" onClick={() => setSelectedRole('customer')}>User</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="two-tab" data-bs-toggle="tab" href="#two" role="tab" aria-controls="two" aria-selected="false" onClick={() => setSelectedRole('vendor')}>Vendor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="three-tab" data-bs-toggle="tab" href="#three" role="tab" aria-controls="three" aria-selected="false" onClick={() => setSelectedRole('admin')}>Admin</a>
            </li>
            
          </ul>
        </div>

        <div className="tab-content p-4">
          <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
            <h5 className="card-title" style={{ color: '#9C27B0', textTransform: 'uppercase', marginTop: '10%', fontSize: '16px'}}>P&P User Login</h5>
            <p className="card-text">Enter your details below</p>
            
            <div style={{padding:'5px'}} >
              <input className='form-control' placeholder='username' value={dbusername} onChange={(e) => setDbusername(e.target.value)} />
            </div>
            <div style={{padding:'5px'}} >
              <input className='form-control' placeholder='password' value={dbpassword} onChange={(e) => setdbpassword(e.target.value)} />
            </div>
            <div style={{padding:'5px'}} >
              <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainlogin;
