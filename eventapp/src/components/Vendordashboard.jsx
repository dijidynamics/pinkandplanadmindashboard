import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios'

function Vendordashboard() {

    const username = sessionStorage.getItem('username'); // Get username from sessionStorage
    const role = sessionStorage.getItem('role'); // Get username from sessionStorage
  return (
    <div>
     <h6>Hello, {username ? username : "Guest"} | {role === 'customer' ? username || "Guest" : "Vendor"}</h6> {/* Display username */}
     <div className='row'>
     <div  className='col-md-3'>
        <h6>My Services</h6>
     </div>
     <div  className='col-md-3'>
     <h6>Request Received</h6>
     </div>
     <div className='col-md-3'>
     <h6>Upcoming Events</h6>
     </div>
     </div>
     <div className='row'>
        <div className='col-md-12'>
            <h6>Calender View</h6>
        </div>
     </div>
    
    </div>
   
  )
}

export default Vendordashboard
