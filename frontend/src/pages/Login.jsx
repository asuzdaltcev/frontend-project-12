import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Схема валидации с использованием переводов
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('login.validation.username.min'))
      .max(20, t('login.validation.username.max'))
      .required(t('login.validation.username.required')),
    password: Yup.string()
      .required(t('login.validation.password.required')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', values.username);
        // Принудительное обновление для обновления состояния авторизации
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          setError(t('login.error.invalidCredentials'));
        } else {
          setError(t('login.error.general'));
        }
      }
    } catch (err) {
      setError(t('login.error.general'));
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body className="p-4">
          <Card.Title className="text-center mb-4">
            {t('login.title')}
          </Card.Title>
          <Card.Subtitle className="text-center text-muted mb-4">
            {t('login.subtitle')}
          </Card.Subtitle>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    placeholder={t('login.usernamePlaceholder')}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t('login.passwordPlaceholder')}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                  disabled={isSubmitting || isSubmitting}
                >
                  {isSubmitting || isSubmitting ? t('login.submitting') : t('login.submit')}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center">
            <span className="text-muted">{t('login.noAccount')} </span>
            <Link to="/signup">{t('login.signupLink')}</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login; 