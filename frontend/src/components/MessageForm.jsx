import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addMessage, addMessageOptimistic } from '../slices/messagesSlice'
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNotifications } from './NotificationManager'
import profanityFilter from '../utils/profanityFilter'

const MessageForm = ({ channelId }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { showMessageSent, showError, showWarning } = useNotifications()

  const validationSchema = useMemo(() => Yup.object({
    body: Yup.string()
      .trim()
      .min(1, t('messages.validation.empty'))
      .max(1000, t('messages.validation.tooLong'))
      .required(t('messages.validation.required'))
      .test('profanity', t('profanity.error.messageProfanity'), function (value) {
        if (!value) return true // Пропускаем пустые значения
        return !profanityFilter.check(value)
      }),
  }), [t])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!channelId) {
      setSubmitting(false)
      return
    }

    const username = localStorage.getItem('username')

    // Проверяем и фильтруем нецензурные слова
    const profanityResult = profanityFilter.process(values.body)

    // Если есть нецензурные слова, показываем предупреждение
    if (profanityResult.hasProfanity) {
      showWarning(t('profanity.warning.filtered'))
    }

    // Используем очищенный текст для отправки
    const cleanedMessage = profanityResult.cleanedText

    // Создаем временное сообщение для оптимистичного обновления
    const tempMessage = {
      id: `temp-${Date.now()}`,
      body: cleanedMessage, // Используем очищенный текст
      channelId,
      username,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    }

    try {
      // Оптимистично добавляем сообщение в UI
      dispatch(addMessageOptimistic(tempMessage))

      // Сбрасываем форму сразу для лучшего UX
      resetForm()

      // Отправляем очищенное сообщение через WebSocket/HTTP
      await dispatch(addMessage({ body: cleanedMessage, channelId })).unwrap()

      // Показываем уведомление об успешной отправке
      showMessageSent()
    }
    catch (error) {
      // В случае ошибки показываем уведомление
      console.error('Ошибка отправки сообщения:', error)
      showError(t('messages.error.send'))
    }
    finally {
      setSubmitting(false)
    }
  }

  if (!channelId) {
    return (
      <div className="message-form disabled text-center text-muted py-3">
        <p>{t('messages.selectChannel')}</p>
      </div>
    )
  }

  return (
    <div className="message-form">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm as={Form} className="py-1 border rounded-2">
            <InputGroup className="has-validation">
              <Field
                as={Form.Control}
                name="body"
                placeholder={t('messages.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                rows="2"
                disabled={isSubmitting}
                aria-label="Новое сообщение"
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="btn-group-vertical"
              >
                {isSubmitting
                  ? (
                      <Spinner animation="border" size="sm" />
                    )
                  : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                      </svg>
                    )}
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
            <ErrorMessage name="body" component={Form.Text} className="text-danger" />
          </FormikForm>
        )}
      </Formik>
    </div>
  )
}

export default MessageForm
