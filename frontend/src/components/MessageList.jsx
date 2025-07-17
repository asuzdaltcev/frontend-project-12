import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Card, Badge } from 'react-bootstrap';

const MessageList = ({ messages }) => {
  const socketConnected = useSelector(state => state.messages.socketConnected);

  if (messages.length === 0) {
    return (
      <div className="message-list empty text-center text-muted py-4">
        <p>Нет сообщений в этом канале. Начните общение!</p>
        <div className="mt-2">
          <Badge bg={socketConnected ? 'success' : 'warning'} className="me-2">
            {socketConnected ? '🟢 Онлайн' : '🟡 Офлайн'}
          </Badge>
          <small className="text-muted">
            {socketConnected ? 'Сообщения обновляются в реальном времени' : 'Сообщения обновляются при перезагрузке'}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        <small className="text-muted">Сообщения</small>
        <Badge bg={socketConnected ? 'success' : 'warning'} className="fs-6">
          {socketConnected ? '🟢 Онлайн' : '🟡 Офлайн'}
        </Badge>
      </div>
      <ListGroup className="message-list">
        {messages.map(message => (
          <ListGroup.Item key={message.id} className="border-0 px-0">
            <Card className={`mb-2 shadow-sm ${message.isOptimistic ? 'opacity-75' : ''}`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-bold text-primary">
                    {message.username}
                    {message.isOptimistic && (
                      <Badge bg="secondary" className="ms-2 fs-6">Отправка...</Badge>
                    )}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.85em' }}>
                    {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {message.body}
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default MessageList; 