import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()
  const [error, setError] = useState('')

  // Схема валидации с использованием переводов
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('login.validation.username.min'))
      .max(20, t('login.validation.username.max'))
      .required(t('login.validation.username.required')),
    password: Yup.string()
      .required(t('login.validation.password.required')),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('')

    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', values.username)
        // Принудительное обновление для обновления состояния авторизации
        window.location.href = '/'
      }
      else {
        await response.json()
        if (response.status === 401) {
          setError(t('login.error.invalidCredentials'))
        }
        else {
          setError(t('login.error.general'))
        }
      }
    }
    catch {
      setError(t('login.error.general'))
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="/login.jpg"
                  className="rounded-circle"
                  alt="Войти"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>

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
                      <div className="form-floating mb-3">
                        <input
                          name="username"
                          autoComplete="username"
                          required
                          placeholder="Ваш ник"
                          id="username"
                          className="form-control"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="username">Ваш ник</label>
                        {touched.username && errors.username && (
                          <div className="text-danger small mt-1">{errors.username}</div>
                        )}
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          name="password"
                          autoComplete="current-password"
                          required
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          className="form-control"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-label" htmlFor="password">Пароль</label>
                        {touched.password && errors.password && (
                          <div className="text-danger small mt-1">{errors.password}</div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('login.submitting') : 'Войти'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
