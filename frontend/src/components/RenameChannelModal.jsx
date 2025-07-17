import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../slices/channelsSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле')
    .trim()
    .test('unique', 'Канал с таким именем уже существует', function(value) {
      if (!value || !value.trim()) return true;
      const channels = this.options.context?.channels || [];
      const currentChannelId = this.options.context?.currentChannelId;
      const normalizedValue = value.trim().toLowerCase();
      const isDuplicate = channels.some(channel => 
        channel.name.trim().toLowerCase() === normalizedValue && 
        channel.id !== currentChannelId
      );
      return !isDuplicate;
    }),
});

const RenameChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const loading = useSelector(state => state.channels.loading);

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const normalizedName = values.name.trim();
      
      // Дополнительная проверка на клиенте перед отправкой
      const normalizedValue = normalizedName.toLowerCase();
      const isDuplicate = channels.some(ch => 
        ch.name.trim().toLowerCase() === normalizedValue && ch.id !== channel.id
      );
      
      if (isDuplicate) {
        setFieldError('name', 'Канал с таким именем уже существует');
        return;
      }
      
      await dispatch(renameChannel({ id: channel.id, name: normalizedName })).unwrap();
      resetForm();
      onHide();
    } catch (error) {
      console.error('Ошибка при переименовании канала:', error);
      // Обработка ошибки дублирования имени с сервера
      if (error?.message?.includes('уже существует') || error?.message?.includes('already exists')) {
        setFieldError('name', 'Канал с таким именем уже существует');
      } else {
        setFieldError('name', error?.message || 'Ошибка при переименовании канала');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!channel) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: channel.name }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        context={{ channels, currentChannelId: channel.id }}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="name">Имя канала</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && errors.name}
                  placeholder="Введите новое имя канала"
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
                Отмена
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? 'Переименование...' : 'Переименовать'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal; 