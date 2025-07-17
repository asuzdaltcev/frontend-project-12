import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="not-found-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Alert variant="warning" className="not-found-container text-center w-100 p-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-3">Страница не найдена</h2>
        <p className="mb-4">К сожалению, запрашиваемая страница не существует.</p>
        <div className="actions d-flex gap-2 justify-content-center flex-wrap">
          <Button as={Link} to="/" variant="primary">
            Вернуться на главную
          </Button>
          <Button as={Link} to="/login" variant="secondary">
            Войти в чат
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default NotFound; 