import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';




function Singupvendor() {
  const navigate = useNavigate();
 
    const [vendoremail, setVendoremail] = useState()
    const [vendorname, setVendorname] = useState()
    const [vendorphone, setVendorphone] = useState()
    const [vendorpassword, setVendorpassword] = useState()
    const [vendorssmno, setVendorssmno] = useState()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://147.93.96.202:4001/addnewvendor', {vendoremail, vendorname,  vendorphone, vendorpassword, vendorssmno })
        .then(result => { 
            alert("Vendor added successfully!");
            console.log(result)
            navigate("/vendors")
        })
        .catch(err=> console.log(err))
    }

  return (
    <div>
       <h3>Add New Vendor</h3>
       <div className='row'>
     
        <div className='col-md-6'>
            <form onSubmit={handleSubmit}>
            <div className='form-contorl'>
          <label style={{fontWeight:'bold'}}>Company Email or Personal Email</label>
          <input 
          type='email' 
          placeholder='' 
          name='Email' 
          className='form-control'
          onChange={(e) => setVendoremail(e.target.value)} />
          </div>
          <div className='form-contorl'>
          <label style={{fontWeight:'bold'}}>Company Name or User Name</label>
          <input 
          type='text' 
          placeholder='' 
          name='name' 
          className='form-control'
          onChange={(e) => setVendorname(e.target.value)} />
          </div>
          <div className='form-contorl'>
          <label style={{fontWeight:'bold'}}>Phone</label>
          <input 
          type='text' 
          placeholder='' 
          name='phone' 
          className='form-control'
          onChange={(e) => setVendorphone(e.target.value)} />
          </div>
          <div className='form-contorl'>
          <label style={{fontWeight:'bold'}}>Password</label>
          <input 
          type='text' 
          placeholder='' 
          name='password' 
          className='form-control'
          onChange={(e) => setVendorpassword(e.target.value)} />
          </div>
          <div className='form-contorl'>
          <label style={{fontWeight:'bold'}}>SSM Number</label>
          <input 
          type='text' 
          placeholder='' 
          name='ssmnumber' 
          className='form-control'
          onChange={(e) => setVendorssmno(e.target.value)} />
          </div>
          <button type='submit' className='btn btn-success'>Add</button>
          </form>
        </div>
       </div>

    </div>
  )
}

export default Singupvendor
