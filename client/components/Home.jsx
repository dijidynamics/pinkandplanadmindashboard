import React from 'react'

function Home() {
  return (
    <div>
   
   <div class="content-wrapper">

    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
    <div class="row mb-2">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-light">
            <div class="inner">
              <h3>12 / Week</h3>
              <p>New Vendors </p>
            </div>
            <div class="icon">
              <i class="fas fa-store"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-light">
            <div class="inner">
              <h3>45 </h3>
              <p>Total Vendors</p>
            </div>
            <div class="icon">
              <i class="fas fa-store"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-light">
            <div class="inner">
              <h3>20 / Week</h3>
              <p>New Users</p>
            </div>
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-light">
            <div class="inner">
              <h3>200</h3>
              <p>Total Users</p>
            </div>
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>
      </div>
      </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
        <div class="col-lg-6">
  <div class="card">
    <div class="card-header border-0">
      <h3 class="card-title">Wedding Plan Dashboard</h3>
      <div class="card-tools">
        <a href="#" class="btn btn-tool btn-sm">
          <i class="fas fa-download"></i>
        </a>
        <a href="#" class="btn btn-tool btn-sm">
          <i class="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <div class="card-body">
     


      
      <div class="mt-4">
        <h5>Pending Tasks</h5>
        <ul>
          <li><i class="fas fa-check-circle text-warning"></i> Task 1 - Wedding Vendor Agreement</li>
          <li><i class="fas fa-check-circle text-warning"></i> Task 2 - User Profile Completion</li>
          <li><i class="fas fa-check-circle text-warning"></i> Task 3 - Vendor Payment Confirmation</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="col-lg-6">
  <div class="card">
    <div class="card-header border-0">
      <h3 class="card-title">Overview</h3>
      <div class="card-tools">
        <a href="#" class="btn btn-sm btn-tool">
          <i class="fas fa-download"></i>
        </a>
        <a href="#" class="btn btn-sm btn-tool">
          <i class="fas fa-bars"></i>
        </a>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
        <p class="text-success text-xl">
          <i class="ion ion-ios-refresh-empty"></i>
        </p>
        <p class="d-flex flex-column text-right">
          <span class="font-weight-bold">
            <i class="ion ion-android-arrow-up text-success"></i> 12%
          </span>
          <span class="text-muted">Complaint</span>
        </p>
      </div>

      <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
        <p class="text-warning text-xl">
          <i class="ion ion-ios-cart-outline"></i>
        </p>
        <p class="d-flex flex-column text-right">
          <span class="font-weight-bold">
            <i class="ion ion-android-arrow-up text-warning"></i> 0.8%
          </span>
          <span class="text-muted">Bookings Rate</span>
        </p>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-0">
        <p class="text-danger text-xl">
          <i class="ion ion-ios-people-outline"></i>
        </p>
        <p class="d-flex flex-column text-right">
          <span class="font-weight-bold">
            <i class="ion ion-android-arrow-down text-danger"></i> 1%
          </span>
          <span class="text-muted">New Registrations Rate</span>
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
