import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../slices/channelsSlice';
import { removeChannelMessages } from '../slices/messagesSlice';

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.channels.loading);
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await dispatch(removeChannel(channel.id)).unwrap();
      // Удаляем сообщения канала
      dispatch(removeChannelMessages(channel.id));
      onHide();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
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
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          {t('common.cancel')}
        </Button>
        <Button 
          variant="danger" 
          onClick={handleRemove}
          disabled={loading}
        >
          {loading ? t('common.loading') : t('channels.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal; 