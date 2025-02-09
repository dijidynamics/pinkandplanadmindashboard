import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import VendorPage from "./components/VendorPage";
import HomePage from "./components/HomePage";
import Singupvendor from "./components/Singupvendor";
import Categorylist from "./components/Categorylist";
import Mainlogin from "./components/Mainlogin";
import Userdashboardpage from "./components/Userdashboardpage";
import Usereventhistory from "./components/Usereventhistory";
import ProtectedRoute from "./components/ProtectedRoute";
import Admindashboard from "./components/Admindashboard";
import Vendordashboard from "./components/Vendordashboard";
import Admincategorylist from "./components/Admincategorylist";
import AddServices from "./components/AddServices";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/"; // Hide sidebar on login page

  // Check user role from sessionStorage
  const role = sessionStorage.getItem("role");

  return (
    <div className="d-flex">
      {/* Hide sidebar on login page, show for others */}
      {!hideSidebar && <Sidebar />}

      <div className="container-fluid" >
        <Routes>
{/* Public Route for Login Page */}
<Route path="/" element={<Mainlogin />} />

{/* Protected Routes for User */}
        {/* Protected Routes for User */}
        {role === "customer" && (
            <>
              <Route path="/Userdashboardpage" element={<ProtectedRoute role="customer"><Userdashboardpage /></ProtectedRoute>} />
              <Route path="/Usereventhistory" element={<ProtectedRoute role="customer"><Usereventhistory /></ProtectedRoute>} />
            </>
          )}

          {/* Protected Routes for Vendor */}
          {role === "vendor" && (
            <>
    
    <Route path="/Vendordashboard" element={<ProtectedRoute role="vendor"><Vendordashboard /></ProtectedRoute>} /> 
              <Route path="/categorylist" element={<ProtectedRoute role="vendor"><Categorylist /></ProtectedRoute>} />
            </>
          )}

          {/* Protected Routes for Admin */}
          {role === "admin" && (
            <>
            <Route path="/Admindashboard" element={<ProtectedRoute role="admin"><Admindashboard /></ProtectedRoute>}/>
               <Route path="/vendors" element={<ProtectedRoute role="vendor"><VendorPage /></ProtectedRoute>} />
              <Route path="/addnewvendor" element={<ProtectedRoute role="admin"><Singupvendor /></ProtectedRoute>} />
              <Route path="/Admincategorylist" element={<ProtectedRoute role="admin"><Admincategorylist /></ProtectedRoute>} />
              <Route path="/AddServices" element={<ProtectedRoute role="admin"><AddServices /></ProtectedRoute>} />
        
            </>
          )}

{/* Catch-all Route for Unauthorized Access */}
<Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </div>
  );
}


export default App;
