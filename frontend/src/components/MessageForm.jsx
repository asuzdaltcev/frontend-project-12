import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addMessage } from '../slices/messagesSlice';

const MessageForm = ({ channelId }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    body: Yup.string()
      .trim()
      .min(1, 'Сообщение не может быть пустым')
      .max(1000, 'Сообщение слишком длинное')
      .required('Введите сообщение'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!channelId) {
      setSubmitting(false);
      return;
    }

    try {
      await dispatch(addMessage({ body: values.body, channelId })).unwrap();
      resetForm();
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!channelId) {
    return (
      <div className="message-form disabled">
        <p>Выберите канал для отправки сообщения</p>
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
          <Form className="form">
            <div className="form-group">
              <Field
                as="textarea"
                name="body"
                placeholder="Введите сообщение..."
                className="message-input"
                rows="3"
              />
              <ErrorMessage name="body" component="div" className="error-message" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="send-button"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm; 