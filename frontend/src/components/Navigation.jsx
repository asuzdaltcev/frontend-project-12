import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Проверяем, авторизован ли пользователь
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Функция для выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="md" className="mb-4 shadow-sm w-100">
      <div className="w-100 justify-content-between align-items-center px-3">
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                  Главная
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={location.pathname === '/login'}>
                  Войти
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" active={location.pathname === '/signup'}>
                  Регистрация
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation; 