import React, { useState } from 'react';

function Addnewvendor() {

    const [formData, setFormData] = useState({
        vendoremail: '',
        vendorname: '',
        vendorpassword: '',
        vendorphone: '',
        vendoraddress: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
        },
        vendorssmno: '',
      });
    
      const handleChange = (e) => {
   
      };
    
      const handleSubmit = async (e) => {

      };



  return (
    <div className="content-wrapper">
<div className="container mt-4">
  <h2>Add New Vendor</h2>
  <form>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Email:</label>
        <input
          className="form-control"
          type="email"
          name="vendoremail"
          value={formData.vendoremail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Name:</label>
        <input
          className="form-control"
          type="text"
          name="vendorname"
          value={formData.vendorname}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Password:</label>
        <input
          className="form-control"
          type="password"
          name="vendorpassword"
          value={formData.vendorpassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Phone:</label>
        <input
          className="form-control"
          type="text"
          name="vendorphone"
          value={formData.vendorphone}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">SSM Number:</label>
        <input
          className="form-control"
          type="text"
          name="vendorssmno"
          value={formData.vendorssmno}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <h4>Address:</h4>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Street:</label>
        <input
          className="form-control"
          type="text"
          name="street"
          value={formData.vendoraddress.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">City:</label>
        <input
          className="form-control"
          type="text"
          name="city"
          value={formData.vendoraddress.city}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">State:</label>
        <input
          className="form-control"
          type="text"
          name="state"
          value={formData.vendoraddress.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Country:</label>
        <input
          className="form-control"
          type="text"
          name="country"
          value={formData.vendoraddress.country}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Zipcode:</label>
        <input
          className="form-control"
          type="text"
          name="zipcode"
          value={formData.vendoraddress.zipcode}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <button type="submit" className="btn btn-primary">Add Vendor</button>
  </form>
</div>

  </div>
  )
}

export default Addnewvendor
