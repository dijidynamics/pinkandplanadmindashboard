import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

function VendorPage() {
  const [userlist, setUserlist] = useState([]);

  // Fetch vendors data from the 
  useEffect(() => {
    fetch('http://localhost:4001/dbuserlist')
      .then((response) => response.json())
      .then((data) => setUserlist(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);
  // Separate users based on roles
  const admins = userlist.filter(user => user.role === 'admin');
  const customers = userlist.filter(user => user.role === 'customer');
  const vendors = userlist.filter(user => user.role === 'vendor');

  // Handle Edit (Placeholder function)
  const handleEdit = (id) => {
    alert(`Edit vendor with ID: ${id}`);
    // You can navigate to an edit form or open a modal here
  };

  const [formData, setFormData] = useState({
    dbusername: '',
    dbpassword: '',
    dbstatus: '',
    role: '',
    ssm: '',
    nameofuser:''
});

const [message, setMessage] = useState('');

// Handle form input change
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Form Data Before Submission:", formData); // Debugging

  try {
      const response = await axios.post('http://localhost:4001/pdbuserlist', formData, {
          headers: { "Content-Type": "application/json" }  // Ensure JSON format
      });

      setMessage(response.data.message);
      setFormData({ dbusername: '', dbpassword: '', dbstatus: '', role: '', ssm: '', nameofuser: '' });

  } catch (error) {
      setMessage(error.response?.data?.message || "Error creating user");
  }
};


  return (
    <div>
    <div className='row'>
  <div className='col-md-8'>
<div className='row'>
<div className='col-md-12'>
      <h3>Vendor List</h3>
      <Table bordered responsive style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
              <th>Role</th>
              <th>SSM</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                    <td>{vendor.nameofuser}</td>
                <td>{vendor.dbusername}</td>
                <td>{vendor.dbpassword}</td>
                <td>{vendor.dbstatus}</td>
                <td>{vendor.role}</td>
                <td>{vendor.ssm}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(vendor._id)}>
                    <FaEdit /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
         {/* Customers Table */}
         <div className='col-md-12'>
        <h3>Customers</h3>
        <Table bordered responsive style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
              
              <th>Role</th>
              <th></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                             <td>{customer.nameofuser}</td>
                <td>{customer.dbusername}</td>
                <td>{customer.dbpassword}</td>
                <td>{customer.dbstatus}</td>
                <td>{customer.role}</td>
                <th></th>
                <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(customer._id)}>
                    <FaEdit /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
                  {/* Admins Table */}
                  <div className='col-md-12'>
        <h3>Admins</h3>
        <Table bordered responsive style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
              <th>Role</th>
              <th></th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.nameofuser}</td>
                <td>{admin.dbpassword}</td>
                <td>{admin.dbusername}</td>
                <td>{admin.dbstatus}</td>          
                <td>{admin.role}</td>
                <td></td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(admin._id)}>
                    <FaEdit /> Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
</div>

  </div>
  <div className='col-md-4'>

  <div>
            
       {/*    {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
              <div style={{paddingBottom:'10px'}}>
                <input type="text" className='form-control' name="dbusername" placeholder="Username" value={formData.dbusername} onChange={handleChange} required /></div>
                <div style={{paddingBottom:'10px'}}>  <input type="password" className='form-control'  name="dbpassword" placeholder="Password" value={formData.dbpassword} onChange={handleChange} required /></div>
                <div style={{paddingBottom:'10px'}}>  <input type="text" className='form-control'  name="dbstatus" placeholder="Status" value={formData.dbstatus} onChange={handleChange} required /></div>
                <div style={{paddingBottom:'10px'}}>  <input type="text" className='form-control'  name="role" placeholder="Role" value={formData.role} onChange={handleChange} required /></div>
                <div style={{paddingBottom:'10px'}}>  <input type="text" className='form-control'  name="ssm" placeholder="SSM Number" value={formData.ssm} onChange={handleChange} required /></div>
                <div style={{paddingBottom:'10px'}}>  <button type="submit" className='btn'>Create User</button> </div>
            </form>*/}   



            <h2>Add New User</h2>
          {message && <p className="text-success">{message}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control type="text" 
              autoComplete='off' 
              name="dbusername" 
              placeholder="Email"
               value={formData.dbusername} 
               onChange={handleChange} 
               onFocus={(e) => e.target.setAttribute("autocomplete", "off")}
            />
            </Form.Group>

            
            <Form.Group className="mb-3">
              <Form.Control type="text" autoComplete='off'  name="nameofuser" placeholder="Name of user" value={formData.nameofuser} onChange={handleChange}  />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" autoComplete='off'  name="dbpassword" placeholder="Password" value={formData.dbpassword} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="dbstatus" value={formData.dbstatus} onChange={handleChange} >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} >
                <option value="">Select Role</option>
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            {formData.role === "vendor" && (
              <Form.Group className="mb-3">
                <Form.Control type="text" name="ssm" placeholder="SSM Number" value={formData.ssm} onChange={handleChange}  />
              </Form.Group>
            )}

            <Button type="submit" className="btn btn-primary">Create User</Button>
          </Form>
        </div>


  </div>
    </div>
    </div>
  );
}

export default VendorPage;    