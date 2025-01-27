import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Categorylist() {
  const [categorylist, setCategorylist] = useState([]);

  // Fetch vendors data from the 
  useEffect(() => {
    fetch('http://147.93.96.202:4001/categorylist')
      .then((response) => response.json())
      .then((data) => setCategorylist(data))
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

  return (
    <div>
      <h3>Category List</h3>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categorylist.map((category) => (
            <tr key={category._id}>
              <td>{category.categoryid}</td>
              <td>{category.categoryname}</td>
           {/*   <td>
                <Button variant="primary" size="sm" className="me-2">
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" size="sm">

                  <FaTrashAlt /> Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Categorylist;
