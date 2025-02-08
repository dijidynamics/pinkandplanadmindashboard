import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';



function VendorPage() {
  const [userlist, setUserlist] = useState([]);
  const [editData, setEditData] = useState({});
const [showEditModal, setShowEditModal] = useState(false);
const [key, setKey] = useState('home');


  // Fetch vendors data from the 
  //useEffect(() => {
  //  fetch('http://147.93.96.202:4001/dbuserlist')
  //    .then((response) => response.json())
   //   .then((data) => setUserlist(data))
   //   .catch((error) => console.error('Error fetching vendors:', error));
 // }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://147.93.96.202:4001/dbuserlist');
      const data = await response.json();
      setUserlist(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };


  // Separate users based on roles
  const admins = userlist.filter(user => user.role === 'admin');
  const customers = userlist.filter(user => user.role === 'customer');
  const vendors = userlist.filter(user => user.role === 'vendor');

  // Handle Edit (Placeholder function)
  //const handleEdit = (id) => {
 //   alert(`Edit vendor with ID: ${id}`);
 // };
  const handleEdit = (user) => {
    setEditData(user);
    setShowEditModal(true);
  };
  

  // Handle form input change in modal
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update user details)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4001/updateuser/${editData._id}`, editData, {
        headers: { "Content-Type": "application/json" }
      });
  
      alert(response.data.message);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating user");
    }
  }; // <-- This bracket was missing
  

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
      const response = await axios.post('http://147.93.96.202:4001/pdbuserlist', formData, {
          headers: { "Content-Type": "application/json" }  // Ensure JSON format
      });

      setMessage(response.data.message);
      setFormData({ dbusername: '', dbpassword: '', dbstatus: '', role: '', ssm: '', nameofuser: '' });


    // Fetch updated user list to show new user without refresh
      const updatedResponse = await fetch('http://147.93.96.202:4001/dbuserlist');
      const updatedData = await updatedResponse.json();
      setUserlist(updatedData);

  } catch (error) {
      setMessage(error.response?.data?.message || "Error creating user");
  }
};



  return (
    <div>
    <div className='row'>
  <div className='col-md-8'>
<div className='row' style={{padding:'30px'}}>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Vendor</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">User</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Admin</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
  
      <div className='col-md-12' style={{style:"background-color: #f4f4f4", paddingTop:'20px', backgroundcolor:'#f4f4f4'}}>
  
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
                <Button variant="primary" size="sm" onClick={() => handleEdit(vendor)}>
                  <FaEdit /> Edit
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  
  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  
         <div className='col-md-12' style={{padding:'10px', backgroundcolor:"#f4f4f4"}}>
  
   
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
                <Button variant="primary" size="sm" onClick={() => handleEdit(customer)}>
                  <FaEdit /> Edit
                </Button>
            
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div></div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
  
   <div className='col-md-12' style={{padding:'10px', backgroundcolor:"#f4f4f4"}}>
  
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
                <td>{admin.dbusername}</td>
                <td>{admin.dbpassword}</td>
                <td>{admin.dbstatus}</td>          
                <td>{admin.role}</td>
                <td></td>
                <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(admin)}>
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



   
               
</div>

  </div>
  <div className='col-md-4' style={{backgroundcolor:'#f4f4f4'}}>

  <div style={{backgroundColor:"#f4f4f4", padding:"15px"}}>
            
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



            <h6>Add New User</h6>
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
              <option value="">Select Status</option> {/* Ensure user selects */}
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

  <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleUpdate}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="nameofuser" value={editData.nameofuser || ''} onChange={handleEditChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="dbusername" value={editData.dbusername || ''} onChange={handleEditChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" name="dbpassword" value={editData.dbpassword || ''} onChange={handleEditChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select name="dbstatus" value={editData.dbstatus || ''} onChange={handleEditChange} required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select name="role" value={editData.role || ''} onChange={handleEditChange} required>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </Form.Group>
      {editData.role === "vendor" && (
        <Form.Group className="mb-3">
          <Form.Label>SSM Number</Form.Label>
          <Form.Control type="text" name="ssm" value={editData.ssm || ''} onChange={handleEditChange} />
        </Form.Group>
      )}
      <Button type="submit" className="btn btn-success">Update</Button>
    </Form>
  </Modal.Body>
</Modal>

    </div>
    </div>
  );
}

export default VendorPage;    