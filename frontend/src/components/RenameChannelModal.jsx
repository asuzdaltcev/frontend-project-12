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
    .test('unique', 'Канал с таким именем уже существует', function(value) {
      const channels = this.options.context?.channels || [];
      const currentChannelId = this.options.context?.currentChannelId;
      return !channels.some(channel => 
        channel.name === value && channel.id !== currentChannelId
      );
    }),
});

const RenameChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const loading = useSelector(state => state.channels.loading);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(renameChannel({ id: channel.id, name: values.name })).unwrap();
      resetForm();
      onHide();
    } catch (error) {
      console.error('Ошибка при переименовании канала:', error);
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