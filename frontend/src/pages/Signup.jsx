import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Схема валидации для формы регистрации
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('signup.validation.username.min'))
      .max(20, t('signup.validation.username.max'))
      .required(t('signup.validation.username.required')),
    password: Yup.string()
      .min(6, t('signup.validation.password.min'))
      .required(t('signup.validation.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.validation.confirmPassword.match'))
      .required(t('signup.validation.confirmPassword.required')),
  });

  // Обработчик отправки формы
  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });
      const { token, username } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAuthError(t('signup.error.userExists'));
      } else if (error.response && error.response.status === 400) {
        setAuthError(t('signup.error.validation'));
      } else {
        setAuthError(t('signup.error.general'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="signup-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="signup-container p-4 bg-white rounded shadow">
          <h1 className="text-center mb-3">{t('signup.title')}</h1>
          <p className="text-center text-muted mb-4">{t('signup.subtitle')}</p>
          {authError && <Alert variant="danger" className="text-center">{authError}</Alert>}
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm as={Form} className="signup-form">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('signup.username')}</Form.Label>
                  <Field
                    as={Form.Control}
                    type="text"
                    name="username"
                    placeholder={t('signup.usernamePlaceholder')}
                    autoComplete="username"
                  />
                  <ErrorMessage name="username" component={Form.Text} className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('signup.password')}</Form.Label>
                  <Field
                    as={Form.Control}
                    type="password"
                    name="password"
                    placeholder={t('signup.passwordPlaceholder')}
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="password" component={Form.Text} className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>{t('signup.confirmPassword')}</Form.Label>
                  <Field
                    as={Form.Control}
                    type="password"
                    name="confirmPassword"
                    placeholder={t('signup.confirmPasswordPlaceholder')}
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="confirmPassword" component={Form.Text} className="text-danger" />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner animation="border" size="sm" /> {t('signup.submitting')}</> : t('signup.submit')}
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    {t('signup.hasAccount')}{' '}
                    <a href="/login" className="text-decoration-none">{t('signup.loginLink')}</a>
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

export default Signup; 