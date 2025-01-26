import React from 'react'

function Home() {
  return (
    <div>
   
   <div className="content-wrapper">

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
    <div className="row mb-2">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light">
            <div className="inner">
              <h3>12 / Week</h3>
              <p>New Vendors </p>
            </div>
            <div className="icon">
              <i className="fas fa-store"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light">
            <div className="inner">
              <h3>45 </h3>
              <p>Total Vendors</p>
            </div>
            <div className="icon">
              <i className="fas fa-store"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light">
            <div className="inner">
              <h3>20 / Week</h3>
              <p>New Users</p>
            </div>
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light">
            <div className="inner">
              <h3>200</h3>
              <p>Total Users</p>
            </div>
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
      </div>
      </div>
    <div className="content">
      <div className="container-fluid">
        <div className="row">
        <div className="col-lg-6">
  <div className="card">
    <div className="card-header border-0">
      <h3 className="card-title">Wedding Plan Dashboard</h3>
      <div className="card-tools">
        <a href="#" className="btn btn-tool btn-sm">
          <i className="fas fa-download"></i>
        </a>
        <a href="#" className="btn btn-tool btn-sm">
          <i className="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <div className="card-body">
     


      
      <div className="mt-4">
        <h5>Pending Tasks</h5>
        <ul>
          <li><i className="fas fa-check-circle text-warning"></i> Task 1 - Wedding Vendor Agreement</li>
          <li><i className="fas fa-check-circle text-warning"></i> Task 2 - User Profile Completion</li>
          <li><i className="fas fa-check-circle text-warning"></i> Task 3 - Vendor Payment Confirmation</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div className="col-lg-6">
  <div className="card">
    <div className="card-header border-0">
      <h3 className="card-title">Overview</h3>
      <div className="card-tools">
        <a href="#" className="btn btn-sm btn-tool">
          <i className="fas fa-download"></i>
        </a>
        <a href="#" className="btn btn-sm btn-tool">
          <i className="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
        <p className="text-success text-xl">
          <i className="ion ion-ios-refresh-empty"></i>
        </p>
        <p className="d-flex flex-column text-right">
          <span className="font-weight-bold">
            <i className="ion ion-android-arrow-up text-success"></i> 12%
          </span>
          <span className="text-muted">Complaint</span>
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
        <p className="text-warning text-xl">
          <i className="ion ion-ios-cart-outline"></i>
        </p>
        <p className="d-flex flex-column text-right">
          <span className="font-weight-bold">
            <i className="ion ion-android-arrow-up text-warning"></i> 0.8%
          </span>
          <span className="text-muted">Bookings Rate</span>
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-0">
        <p className="text-danger text-xl">
          <i className="ion ion-ios-people-outline"></i>
        </p>
        <p className="d-flex flex-column text-right">
          <span className="font-weight-bold">
            <i className="ion ion-android-arrow-down text-danger"></i> 1%
          </span>
          <span className="text-muted">New Registrations Rate</span>
        </p>
      </div>
    </div>
  </div>
</div>


        </div>

      </div>
  
    </div>



    </div>
    </div>
  )
}

export default Home
