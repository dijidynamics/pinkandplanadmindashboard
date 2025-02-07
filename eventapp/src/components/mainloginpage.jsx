import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function mainloginpage() {

    const [dbusername, setDbusername] =  useState('');
    const [dbpassword, setdbpassword] =  useState('');
    const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4001/dbuser', { dbusername, dbpassword });
      alert(response.data.message);

      // Store username in sessionStorage
      sessionStorage.setItem('username', response.data.dbusername);
      sessionStorage.setItem('isAuthenticated', 'true');

      // Redirect to User Dashboard
      navigate('/Userdashboardpage');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (

             <div class="card mt-3 tab-card">
        <div class="card-header tab-card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">One</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Two</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Three</a>
            </li>
          </ul>
        </div>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
          
          <input className='form-control' placeholder='username' value={dbusername} onChange={(e) => setDbusername(e.target.value)} />
          <input className='form-control'  placeholder='password' value={dbpassword} onChange={(e) => setdbpassword(e.target.value)} />
          <button className='btn btn-primary' onClick={handleLogin}>Login</button>

          </div>
          <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
            <h5 class="card-title">Tab Card Two</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>              
          </div>
          <div class="tab-pane fade p-3" id="three" role="tabpanel" aria-labelledby="three-tab">
            <h5 class="card-title">Tab Card Three</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>              
          </div>

        </div>
      
    </div>
  )
}

export default mainloginpage
