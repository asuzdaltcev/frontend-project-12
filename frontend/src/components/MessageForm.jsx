import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addMessage, addMessageOptimistic } from '../slices/messagesSlice';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNotifications } from './NotificationManager';
import profanityFilter from '../utils/profanityFilter';

const MessageForm = ({ channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showMessageSent, showError, showWarning } = useNotifications();

  const validationSchema = useMemo(() => Yup.object({
    body: Yup.string()
      .trim()
      .min(1, t('messages.validation.empty'))
      .max(1000, t('messages.validation.tooLong'))
      .required(t('messages.validation.required'))
      .test('profanity', t('profanity.error.messageProfanity'), function(value) {
        if (!value) return true; // Пропускаем пустые значения
        return !profanityFilter.check(value);
      }),
  }), [t]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!channelId) {
      setSubmitting(false);
      return;
    }

    const username = localStorage.getItem('username');
    
    // Проверяем и фильтруем нецензурные слова
    const profanityResult = profanityFilter.process(values.body);
    
    // Если есть нецензурные слова, показываем предупреждение
    if (profanityResult.hasProfanity) {
      showWarning(t('profanity.warning.filtered'));
    }
    
    // Используем очищенный текст для отправки
    const cleanedMessage = profanityResult.cleanedText;
    
    // Создаем временное сообщение для оптимистичного обновления
    const tempMessage = {
      id: `temp-${Date.now()}`,
      body: cleanedMessage, // Используем очищенный текст
      channelId,
      username,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    try {
      // Оптимистично добавляем сообщение в UI
      dispatch(addMessageOptimistic(tempMessage));
      
      // Сбрасываем форму сразу для лучшего UX
      resetForm();
      
      // Отправляем очищенное сообщение через WebSocket/HTTP
      await dispatch(addMessage({ body: cleanedMessage, channelId })).unwrap();
      
      // Показываем уведомление об успешной отправке
      showMessageSent();
      
    } catch (error) {
      // В случае ошибки показываем уведомление
      console.error('Ошибка отправки сообщения:', error);
      showError(t('messages.error.send'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!channelId) {
    return (
      <div className="message-form disabled text-center text-muted py-3">
        <p>{t('messages.selectChannel')}</p>
      </div>
    );
  }

  return (
    <div className="message-form">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm as={Form} className="form d-flex gap-2 align-items-end">
            <InputGroup>
              <Field
                as={Form.Control}
                name="body"
                placeholder={t('messages.placeholder')}
                className="message-input"
                rows="2"
                disabled={isSubmitting}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="send-button"
              >
                {isSubmitting ? <Spinner animation="border" size="sm" /> : t('messages.send')}
              </Button>
            </InputGroup>
            <ErrorMessage name="body" component={Form.Text} className="text-danger" />
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm; 