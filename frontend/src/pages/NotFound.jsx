import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <Container className="not-found-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Alert variant="warning" className="not-found-container text-center w-100 p-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-3">{t('notFound.title')}</h2>
        <p className="mb-4">{t('notFound.text')}</p>
        <div className="actions d-flex gap-2 justify-content-center flex-wrap">
          <Button as={Link} to="/" variant="primary">
            {t('notFound.back')}
          </Button>
          <Button as={Link} to="/login" variant="secondary">
            {t('nav.login')}
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default NotFound; 