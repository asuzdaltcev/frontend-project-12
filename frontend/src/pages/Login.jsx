import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Схема валидации для формы
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('login.validation.username.min'))
      .max(20, t('login.validation.username.max'))
      .required(t('login.validation.username.required')),
    password: Yup.string()
      .min(1, t('login.validation.password.required'))
      .required(t('login.validation.password.required')),
  });

  // Обработчик отправки формы
  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token, username } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuthError(t('login.error.invalidCredentials'));
      } else {
        setAuthError(t('login.error.general'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="login-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="login-container p-4 bg-white rounded shadow">
          <h1 className="text-center mb-3">{t('login.title')}</h1>
          <p className="text-center text-muted mb-4">{t('login.subtitle')}</p>
          {authError && <Alert variant="danger" className="text-center">{authError}</Alert>}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm as={Form} className="login-form">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('login.username')}</Form.Label>
                  <Field
                    as={Form.Control}
                    type="text"
                    name="username"
                    placeholder={t('login.usernamePlaceholder')}
                    autoComplete="username"
                  />
                  <ErrorMessage name="username" component={Form.Text} className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('login.password')}</Form.Label>
                  <Field
                    as={Form.Control}
                    type="password"
                    name="password"
                    placeholder={t('login.passwordPlaceholder')}
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" component={Form.Text} className="text-danger" />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner animation="border" size="sm" /> {t('login.submitting')}</> : t('login.submit')}
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    {t('login.noAccount')}{' '}
                    <a href="/signup" className="text-decoration-none">{t('login.signupLink')}</a>
                  </p>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login; 