import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Categorylist() {
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    fetch('http://147.93.96.202:4001/categorylist')
      .then((response) => response.json())
      .then((data) => setCategorylist(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Category List</h3>
      <Row>
        {categorylist.map((category) => (
          <Col key={category._id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
              <Card.Img 
                variant="top" 
                src={category.image} 
                alt={category.categoryname} 
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
            {/*  <Card.Body className="text-center">
                <Card.Title>{category.categoryname}</Card.Title>
                <Button variant="primary" size="sm" className="me-2">
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" size="sm">
                  <FaTrashAlt /> Delete
                </Button>
              </Card.Body>*/} 
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categorylist;
