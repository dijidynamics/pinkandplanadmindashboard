import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios'

function Userdashboardpage() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username'); // Get username from sessionStorage
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch category data from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4001/categorylist");
        setCategories(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/'); // Redirect to home/login page
    window.history.pushState(null, null, '/'); // Prevent back button navigation
  };

  return (
    <div>
      <h6>Hello, {username ? username : "Guest"}</h6> {/* Display username */}
  {/*     <button onClick={handleLogout} className="btn btn-danger">Logout</button>*/}

  <div className="row">
      {categories.map((category) => (
        <div key={category._id} className="col-md-3 mb-3">
     <Card className="category-card">
            <Card.Img variant="top" src={category.image} alt={category.categoryname} style={{height:'230px'}} />
            <Card.Body>
              <Card.Title>{category.categoryname}</Card.Title>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>

    </div>
  );
}

export default Userdashboardpage;
