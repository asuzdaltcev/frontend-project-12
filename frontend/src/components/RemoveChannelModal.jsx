import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel } from '../slices/channelsSlice';
import { removeChannelMessages } from '../slices/messagesSlice';

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.channels.loading);

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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Удалить канал <strong>#{channel.name}</strong>?
        </p>
        <p className="text-muted">
          Удаление канала приведет к удалению всех сообщений в нем. 
          Пользователи, находящиеся в этом канале, будут перемещены в канал General.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Отмена
        </Button>
        <Button 
          variant="danger" 
          onClick={handleRemove}
          disabled={loading}
        >
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal; 