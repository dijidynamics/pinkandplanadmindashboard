import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import EditCategoryModal from './EditCategoryModal';

const Admincategorylist = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4001/categorylist');
            setCategoryList(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <Container className="mt-3">
            <h3 className="text-center mb-4">Category List</h3>
            <Row>
                {categoryList.map((category) => (
                    <Col key={category._id} md={3} sm={6} xs={12} className="mb-3">
                        <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                            <Card.Img 
                                variant="top" 
                                src={`http://localhost:4001${category.image}`} 
                                alt={category.categoryname} 
                                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>{category.categoryname}</Card.Title>
   <Button
    variant="primary"
    size="sm"
    className="me-2"
    onClick={() => { 
        console.log("Opening modal for category:", category); // Debugging log
        setSelectedCategory(category);
        setShowModal(true);
    }}
>
    <FaEdit /> Edit
</Button>

                                <Button variant="info" size="sm">
                                    View
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedCategory && (
                <EditCategoryModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    category={selectedCategory}
                    refreshCategories={fetchCategories}
                />
            )}
        </Container>
    );
};

export default Admincategorylist;
