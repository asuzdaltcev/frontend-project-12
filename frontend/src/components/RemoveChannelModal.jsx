import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeChannel } from '../slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import { useNotifications } from './NotificationManager';

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showChannelRemoved, showError } = useNotifications();

  const handleRemove = async () => {
    try {
      await dispatch(removeChannel(channel.id)).unwrap();
      showChannelRemoved(channel.name);
      onHide();
    } catch (error) {
      console.error('Ошибка удаления канала:', error);
      showError(error?.message || t('channels.error.remove'));
    }
  };

  if (!channel) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('channels.confirmRemove', { name: channel.name })}
        </p>
        <p className="text-muted">
          {t('channels.confirmRemoveText')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('common.cancel')}
        </Button>
        <Button variant="danger" className="btn-danger" onClick={handleRemove}>
          {t('common.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal; 