import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // Схема валидации для формы
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно содержать минимум 3 символа')
      .max(20, 'Имя пользователя не должно превышать 20 символов')
      .required('Имя пользователя обязательно'),
    password: Yup.string()
      .min(1, 'Пароль обязателен')
      .required('Пароль обязателен'),
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
        setAuthError('Неверное имя пользователя или пароль');
      } else {
        setAuthError('Ошибка авторизации. Попробуйте позже.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="login-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="login-container p-4 bg-white rounded shadow">
          <h1 className="text-center mb-3">Вход в чат</h1>
          <p className="text-center text-muted mb-4">Введите свои данные для авторизации</p>
          {authError && <Alert variant="danger" className="text-center">{authError}</Alert>}
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm as={Form} className="login-form">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Field
                    as={Form.Control}
                    type="text"
                    name="username"
                    placeholder="Введите имя пользователя"
                    autoComplete="username"
                  />
                  <ErrorMessage name="username" component={Form.Text} className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Field
                    as={Form.Control}
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" component={Form.Text} className="text-danger" />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner animation="border" size="sm" /> Вход...</> : 'Войти'}
                  </Button>
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