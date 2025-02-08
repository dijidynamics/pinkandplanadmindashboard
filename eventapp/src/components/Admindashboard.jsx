import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function Admindashboard() {
    const [counts, setCounts] = useState({ customer: 0, vendor: 0, admin: 0 });
    const username = sessionStorage.getItem('username');

    useEffect(() => {
        axios.get('http://147.93.96.202:4001/dbuserlist')
            .then(response => {
                const users = response.data;
                const customerCount = users.filter(user => user.role === 'customer').length;
                const vendorCount = users.filter(user => user.role === 'vendor').length;
                const adminCount = users.filter(user => user.role === 'admin').length;
                setCounts({ customer: customerCount, vendor: vendorCount, admin: adminCount });
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
      <div>
        <div style={{ width: '100%', backgroundColor: '#f4f4f4', padding: '20px' }}>

            <h6>Welcome, {username ? username : "Guest"}</h6>
            </div>
            <div className="d-flex justify-content-around mt-3">
                <Card style={{ width: '30%', textAlign: 'center' }}>
                    <Card.Body>
                        <Card.Title>Customers</Card.Title>
                        <Card.Text>{counts.customer}</Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '30%', textAlign: 'center' }}>
                    <Card.Body>
                        <Card.Title>Vendors</Card.Title>
                        <Card.Text>{counts.vendor}</Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{width: '30%', textAlign: 'center' }}>
                    <Card.Body>
                        <Card.Title>Admins</Card.Title>
                        <Card.Text>{counts.admin}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </div>
    );
}

export default Admindashboard;