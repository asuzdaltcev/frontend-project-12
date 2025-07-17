import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="md" className="mb-4 shadow-sm w-100">
      <div className="w-100 justify-content-between align-items-center px-3">
        <Navbar.Brand as={Link} to="/">
          💬 Chat App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/login" active={location.pathname === '/login'}>
              Войти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation; 