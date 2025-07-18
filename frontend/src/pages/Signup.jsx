import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Signup = () => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // Схема валидации для формы регистрации
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно содержать минимум 3 символа')
      .max(20, 'Имя пользователя не должно превышать 20 символов')
      .required('Имя пользователя обязательно'),
    password: Yup.string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Пароль обязателен'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно'),
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
        setAuthError('Пользователь с таким именем уже существует');
      } else if (error.response && error.response.status === 400) {
        setAuthError('Ошибка валидации данных. Проверьте введенные данные.');
      } else {
        setAuthError('Ошибка регистрации. Попробуйте позже.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="signup-page d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="signup-container p-4 bg-white rounded shadow">
          <h1 className="text-center mb-3">Регистрация</h1>
          <p className="text-center text-muted mb-4">Создайте новый аккаунт для входа в чат</p>
          {authError && <Alert variant="danger" className="text-center">{authError}</Alert>}
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm as={Form} className="signup-form">
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
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="password" component={Form.Text} className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Подтверждение пароля</Form.Label>
                  <Field
                    as={Form.Control}
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="confirmPassword" component={Form.Text} className="text-danger" />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner animation="border" size="sm" /> Регистрация...</> : 'Зарегистрироваться'}
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Уже есть аккаунт?{' '}
                    <a href="/login" className="text-decoration-none">Войти</a>
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