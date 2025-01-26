import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
 
    const [vendors, setVendors] = useState([]);
  
    // Fetch vendors data from the API
    useEffect(() => {
      fetch('http://147.93.96.202:4001/vendors')
        .then((response) => response.json())
        .then((data) => setVendors(data))
        .catch((error) => console.error('Error fetching vendors:', error));
    }, []);

  return (
    <>
     <div className='row'>
      <div className='col-md-6'>
       <h3>test</h3>
      </div>
      <div className='col-md-6'>
      <h3>test</h3>
        </div>
     </div>
     <div>
     <h2>Vendor List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>SSM Company Reg No.</th>
            <th>Address</th>
            <th>city</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorname}</td>
              <td>{vendor.vendoremail}</td>
              <td>{vendor.vendorphone}</td>
              <td>{vendor.vendorssmno}</td>
              <td style={{width:'250px'}}>
                {vendor.vendoraddress.street},  {vendor.vendoraddress.state}, {vendor.vendoraddress.city},{vendor.vendoraddress.country} - {vendor.vendoraddress.zipcode}
              </td>
              <td>{vendor.vendoraddress.city}</td>
              <td>
                {/* Add action buttons like edit, delete, etc. */}
                <button className="btn btn-primary btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </>
  )
}

export default App
