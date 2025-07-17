import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
      .min(6, 'Пароль должен содержать минимум 6 символов')
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
    <div className="login-page">
      <div className="login-container">
        <h1>Вход в чат</h1>
        <p>Введите свои данные для авторизации</p>
        {authError && <div className="error-message" style={{ textAlign: 'center', marginBottom: 10 }}>{authError}</div>}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Имя пользователя</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Введите имя пользователя"
                  className="form-input"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Введите пароль"
                  className="form-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Вход...' : 'Войти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login; 