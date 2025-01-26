import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function VendorPage() {
  const [vendors, setVendors] = useState([]);

  // Fetch vendors data from the API
  useEffect(() => {
    fetch('http://147.93.96.202:4001/vendors')
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

  return (
    <div>
      <h3>Vendor List</h3>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>SSM Company Reg No.</th>
            <th>Address</th>
            <th>City</th>
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
              <td>
                {vendor.vendoraddress.street}, {vendor.vendoraddress.state}, {vendor.vendoraddress.city},
                {vendor.vendoraddress.country} - {vendor.vendoraddress.zipcode}
              </td>
              <td>{vendor.vendoraddress.city}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" size="sm">
                  <FaTrashAlt /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default VendorPage;
