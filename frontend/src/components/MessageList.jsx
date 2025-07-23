import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Card, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MessageList = ({ messages }) => {
  const socketConnected = useSelector(state => state.messages.socketConnected);
  const { t } = useTranslation();

  if (messages.length === 0) {
    return (
      <div className="message-list empty text-center text-muted py-4">
        <p>{t('messages.noMessages')}</p>
        <div className="mt-2">
          <Badge bg={socketConnected ? 'success' : 'warning'} className="me-2">
            {socketConnected ? t('connection.online') : t('connection.offline')}
          </Badge>
          <small className="text-muted">
            {socketConnected ? t('messages.realTime') : t('messages.reloadRequired')}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        <small className="text-muted">{t('messages.title')}</small>
        <Badge bg={socketConnected ? 'success' : 'warning'} className="fs-6">
          {socketConnected ? t('connection.online') : t('connection.offline')}
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
                      <Badge bg="secondary" className="ms-2 fs-6">{t('messages.sending')}</Badge>
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