import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Alert variant="warning" className="text-center" style={{ maxWidth: '500px' }}>
        <h1 className="display-4">404</h1>
        <h2>{t('notFound.title')}</h2>
        <p className="lead">{t('notFound.text')}</p>
        <Button as={Link} to="/" variant="primary">
          {t('notFound.back')}
        </Button>
      </Alert>
    </Container>
  );
};

export default NotFound; 