import React from 'react';

const MessageList = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="message-list empty">
        <p>Нет сообщений в этом канале. Начните общение!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message-item">
          <div className="message-header">
            <span className="message-author">{message.username}</span>
            <span className="message-time">
              {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
            </span>
          </div>
          <div className="message-content">
            {message.body}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 