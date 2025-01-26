import React from 'react'
import { NavLink } from 'react-router-dom'
import Managevendorlist from '../user/Managevendorlist'

function Sidebar() {
  return (
    <div>
     
     <aside className="main-sidebar sidebar-dark-primary elevation-4">

    <a href="#" className="brand-link">
   
    <span className="brand-text font-weight-light" style={{fontWeight:'bolder'}}>Pick & Plan</span>
    </a>


    <div className="sidebar">
    
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
        <img src="../dist/img/vimal.png" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Vimaallen Maran</a>
        </div>
      </div>
      </div>


     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
     
          <li className="nav-item ">
            <NavLink to="/" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </NavLink>
     
          </li>
   
     
       {/*  <li className="nav-header">Events</li>
          <li className="nav-item">
            <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt"></i>
              <p>
              Event Over View
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
              Manage Event
              </p>
            </a>
          </li>
     
          <li className="nav-header">Vendors</li>
          <li className="nav-item">
            <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt"></i>
              <p>
              Manage Vendor Posts
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
              View Vendor List
              </p>
            </a>
          </li>
          */}
          <li className="nav-header">Users</li>

      <li className="nav-item">
        <NavLink to="/user/manage-vendor-list" className="nav-link">
          <i className="nav-icon far fa-calendar-alt"></i>
          <p>
            Manage Vendor List
            <span className="badge badge-info right">2</span>
          </p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/user/add-new-vendor" className="nav-link">
          <i className="nav-icon far fa-calendar-alt"></i>
          <p>
            Add New Vendor
            <span className="badge badge-info right">2</span>
          </p>
        </NavLink>
      </li>
          <li className="nav-header">Settings</li>
          <li className="nav-item">
            <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt"></i>
              <p>
             Category List
                <span className="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
             Location List
              </p>
            </a>
          </li>
          <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-danger"></i>
              <p className="text">Important</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-warning"></i>
              <p>Warning</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-info"></i>
              <p>Informational</p>
            </a>
          </li>
        </ul>
      </nav>

        </aside>
    </div>
  )
}

export default Sidebar
