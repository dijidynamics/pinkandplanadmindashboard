import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'
import Managevendorlist from "../user/Managevendorlist";
import Addnewvendor from "../user/Addnewvendor";


function App() {
  

  return (
    <Router>
    <div className="app-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/manage-vendor-list" element={<Managevendorlist />} />
            <Route path="/user/add-new-vendor" element={<Addnewvendor />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  </Router>
  )
}

export default App
