import React from 'react'

function Signpage() {
  return (
    <div className='row'>
        <div className='col-md-4'>
        <h2>Vendor Login</h2>
        <h6>Username</h6>
        <input className='form-control' placeholder='username'></input>
        <h6>Password</h6>
        <input className='form-control' placeholder='password'></input>
        <button className='btn btn-danger'>Login</button>    
        </div>  
    </div>
  )
}

export default Signpage
