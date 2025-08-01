import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Alert, Card, Container } from 'react-bootstrap'
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
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
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
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
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
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('signup.submitting') : t('signup.submit')}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center">
            <span className="text-muted">
              {t('signup.hasAccount')}
              {' '}
            </span>
            <Link to="/login">{t('signup.loginLink')}</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Signup
