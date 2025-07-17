import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const MessageList = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="message-list empty text-center text-muted py-4">
        <p>Нет сообщений в этом канале. Начните общение!</p>
      </div>
    );
  }

  return (
    <ListGroup className="message-list">
      {messages.map(message => (
        <ListGroup.Item key={message.id} className="border-0 px-0">
          <Card className="mb-2 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-primary">{message.username}</span>
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
  );
};

export default MessageList; 