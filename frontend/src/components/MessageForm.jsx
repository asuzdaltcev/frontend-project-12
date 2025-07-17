import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addMessage } from '../slices/messagesSlice';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';

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
      // Можно добавить Alert
    } finally {
      setSubmitting(false);
    }
  };

  if (!channelId) {
    return (
      <div className="message-form disabled text-center text-muted py-3">
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
          <FormikForm as={Form} className="form d-flex gap-2 align-items-end">
            <InputGroup>
              <Field
                as={Form.Control}
                name="body"
                placeholder="Введите сообщение..."
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
                {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Отправить'}
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