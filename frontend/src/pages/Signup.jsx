import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

// Функция для создания системных каналов
const createSystemChannels = async (token) => {
  const systemChannels = ['general', 'random']

  for (const channelName of systemChannels) {
    try {
      const response = await fetch('/api/v1/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: channelName }),
      })

      if (response.ok) {
        // Канал создан успешно
      }
      else if (response.status === 409) {
        // Канал уже существует - это нормально
      }
      else {
        console.warn(`Не удалось создать канал ${channelName}:`, response.status)
      }
    }
    catch (error) {
      console.warn(`Ошибка создания канала ${channelName}:`, error)
    }
  }
}

const Signup = () => {
  const { t } = useTranslation()
  const [error, setError] = useState('')

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
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('')

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
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', values.username)

        // Создаем системные каналы если их нет
        try {
          await createSystemChannels(data.token)
        }
        catch (channelError) {
          console.warn('Не удалось создать системные каналы:', channelError)
        }
        // Принудительное обновление для обновления состояния авторизации
        window.location.href = '/'
      }
      else {
        await response.json()
        if (response.status === 409) {
          setError(t('signup.error.userExists'))
        }
        else if (response.status === 400) {
          setError(t('signup.error.validation'))
        }
        else {
          setError(t('signup.error.general'))
        }
      }
    }
    catch {
      setError(t('signup.error.general'))
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
                  src="/avatar22.jpg" 
                  className="rounded-circle" 
                  alt="Регистрация"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Регистрация</h1>
                
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
                      <div className="form-floating mb-3">
                        <input
                          name="username"
                          autoComplete="username"
                          required
                          placeholder="Имя пользователя"
                          id="username"
                          className="form-control"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="username">Имя пользователя</label>
                        {touched.username && errors.username && (
                          <div className="text-danger small mt-1">{errors.username}</div>
                        )}
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          name="password"
                          autoComplete="new-password"
                          required
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          className="form-control"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="password">Пароль:</label>
                        {touched.password && errors.password && (
                          <div className="text-danger small mt-1">{errors.password}</div>
                        )}
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          name="confirmPassword"
                          autoComplete="new-password"
                          required
                          placeholder="Подтвердите пароль"
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        {touched.confirmPassword && errors.confirmPassword && (
                          <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('signup.submitting') : 'Регистрация'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Есть аккаунт?</span> <Link to="/login">Войти</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
