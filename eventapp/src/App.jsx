import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import VendorPage from './components/VendorPage';
import HomePage from './components/HomePage';
import Singupvendor from './components/Singupvendor';
import Categorylist from './components/Categorylist';
import Signpage from './components/Signpage';


function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="container-fluid p-4">
          <Routes>
            <Route path='/' element={<Signpage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/vendors" element={<VendorPage />} />
            <Route path="/addnewvendor" element={<Singupvendor />} />
            <Route path="/categorylist" element={<Categorylist />} />
            {/* You can add more routes here for different pages */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
