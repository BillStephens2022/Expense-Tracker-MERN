import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <Navbar collapseOnSelect variant='dark' expand='lg' className="navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
                
              <Nav.Link eventKey="1" as={Link} to='/'>
                Home
              </Nav.Link>
              {/* if user is logged in show and Enter Transactions and Logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link eventKey="2" as={Link} to='/transactions'>
                    Transactions
                  </Nav.Link>
                  <Nav.Link eventKey="3" as={Link} to='/analysis'>
                    Analysis
                  </Nav.Link>
                  <Nav.Link eventKey="4" onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link eventKey="5" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
