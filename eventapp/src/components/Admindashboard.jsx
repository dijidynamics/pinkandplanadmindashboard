import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios'

function Admindashboard() {

    const username = sessionStorage.getItem('username'); // Get username from sessionStorage
  return (
    <div style={{width:'100%', backgroundColor:'#f4f4f4', padding:'10px'}}>
   <h6>Welcome, {username ? username : "Guest"}</h6> {/* Display username */}
    </div>
  )
}

export default Admindashboard
