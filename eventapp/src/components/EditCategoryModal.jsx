import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditCategoryModal = ({ show, handleClose, category, refreshCategories }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (category) {
            console.log("Category received in modal:", category); // Debugging log
            setCategoryName(category.categoryname || '');
            setCategoryId(category.categoryid || '');
        }
    }, [category]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('categoryname', categoryName);
        if (image) formData.append('image', image);
    
        try {
            const response = await axios.post('http://147.93.96.202:4001/categorylist', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Response:', response.data); // Log success response
            refreshCategories();
            handleClose();
        } catch (error) {
            console.error('Error updating category:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="categoryId">
                        <Form.Label>Category ID</Form.Label>
                        <Form.Control type="text" value={categoryId} readOnly />
                    </Form.Group>

                    <Form.Group controlId="categoryName" className="mt-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="imageUpload" className="mt-3">
                        <Form.Label>Upload New Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCategoryModal;
