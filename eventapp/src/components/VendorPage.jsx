import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function VendorPage() {
  const [vendors, setVendors] = useState([]);

  // Fetch vendors data from the 
  useEffect(() => {
    fetch('http://147.93.96.202:4001/vendors')
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

  return (
    <div className='row'>
    <div className='col-md-6'>
      <h3>Vendor List</h3>
      <Table bordered responsive style={{fontSize:12}}>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>SSM Company Reg No.</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorname}</td>
              <td>{vendor.vendoremail}</td>
              <td>{vendor.vendorpassword}</td>
              <td>{vendor.vendorphone}</td>
              <td>{vendor.vendorssmno}</td>
           {/*   <td>
                <Button variant="primary" size="sm" className="me-2">
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" size="sm">

                  <FaTrashAlt /> Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <div className='col-md-6'>
      <h3>Vendor List</h3>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>SSM Company Reg No.</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorname}</td>
              <td>{vendor.vendoremail}</td>
              <td>{vendor.vendorpassword}</td>
              <td>{vendor.vendorphone}</td>
              <td>{vendor.vendorssmno}</td>
           {/*   <td>
                <Button variant="primary" size="sm" className="me-2">
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" size="sm">

                  <FaTrashAlt /> Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default VendorPage;
