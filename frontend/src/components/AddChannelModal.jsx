import React, { useMemo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import { useNotifications } from './NotificationManager';
import profanityFilter from '../utils/profanityFilter';

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showChannelCreated, showError, showWarning } = useNotifications();
  const existingChannels = useSelector(state => state.channels.channels);

  const validationSchema = useMemo(() => Yup.object({
    name: Yup.string()
      .min(3, t('channels.validation.nameLength'))
      .max(20, t('channels.validation.nameLength'))
      .matches(/^[a-zA-Z0-9\s-]+$/, t('channels.validation.nameFormat'))
      .required(t('channels.validation.nameRequired'))
      .test('unique', t('channels.validation.nameUnique'), function(value) {
        if (!value) return true; // Пропускаем пустые значения, их обработает required
        const normalizedValue = value.trim().toLowerCase();
        const isDuplicate = existingChannels.some(channel => 
          channel.name.toLowerCase() === normalizedValue
        );
        return !isDuplicate;
      })
      .test('profanity', t('profanity.error.channelNameProfanity'), function(value) {
        if (!value) return true; // Пропускаем пустые значения
        return !profanityFilter.check(value);
      }),
  }), [t, existingChannels]);

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      // Проверяем на нецензурные слова перед отправкой
      const profanityResult = profanityFilter.process(values.name);
      
      if (profanityResult.hasProfanity) {
        setFieldError('name', t('profanity.error.channelNameProfanity'));
        showError(t('profanity.error.channelNameProfanity'));
        return;
      }

      const result = await dispatch(addChannel(values.name)).unwrap();
      showChannelCreated(values.name);
      resetForm();
      onHide();
    } catch (error) {
      console.error('Ошибка создания канала:', error);
      // Обрабатываем серверные ошибки
      if (error?.message?.includes('уже существует')) {
        setFieldError('name', t('channels.validation.nameUnique'));
      } else {
        setFieldError('name', error?.message || t('channels.error.add'));
        showError(error?.message || t('channels.error.add'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm as={Form}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>{t('channels.name')}</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="name"
                  placeholder={t('channels.namePlaceholder')}
                  autoFocus
                />
                <ErrorMessage name="name" component={Form.Text} className="text-danger" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t('common.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('common.loading') : t('channels.add')}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal; 