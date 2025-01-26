import React from 'react'
import { Container, Row, Col, Nav, NavItem, NavLink, Card, Button } from 'react-bootstrap'
import { FaHome, FaUser, FaChartLine, FaCogs } from 'react-icons/fa';

function Dashboard() {
  return (
    <Container fluid>
        {/* Main Row */}
        <Row className='h-100'>
            {/* Left sidebar */}
            <Col xs={12} md={3} className="bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
          <h4 className="text-center mb-4">Dashboard</h4>
          <Nav className="flex-column">
            <NavItem>
              <NavLink className="text-white" href="#">
                <FaHome /> Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="#">
                <FaUser /> Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="#">
                <FaChartLine /> Analytics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="#">
                <FaCogs /> Settings
              </NavLink>
            </NavItem>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} className="p-4">
          <h3>Welcome to the Dashboard</h3>
          <Row>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Sales Overview</Card.Title>
                  <Card.Text>Graph or statistics go here.</Card.Text>
                  <Button variant="primary">View More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Activity</Card.Title>
                  <Card.Text>Recent updates or actions go here.</Card.Text>
                  <Button variant="secondary">See Details</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        </Row>
    </Container>
  )
}

export default Dashboard
