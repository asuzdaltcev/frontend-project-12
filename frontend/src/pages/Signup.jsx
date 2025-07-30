import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Схема валидации с использованием переводов
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

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', values.username);
        // Принудительное обновление для обновления состояния авторизации
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          setError(t('signup.error.userExists'));
        } else if (response.status === 400) {
          setError(t('signup.error.validation'));
        } else {
          setError(t('signup.error.general'));
        }
      }
    } catch (err) {
      setError(t('signup.error.general'));
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
            {t('signup.title')}
          </Card.Title>
          <Card.Subtitle className="text-center text-muted mb-4">
            {t('signup.subtitle')}
          </Card.Subtitle>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('signup.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={t('signup.usernamePlaceholder')}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t('signup.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('signup.passwordPlaceholder')}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={t('signup.confirmPasswordPlaceholder')}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                  disabled={isSubmitting || isSubmitting}
                >
                  {isSubmitting || isSubmitting ? t('signup.submitting') : t('signup.submit')}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center">
            <span className="text-muted">{t('signup.hasAccount')} </span>
            <Link to="/login">{t('signup.loginLink')}</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup; 