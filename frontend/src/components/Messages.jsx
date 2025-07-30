import React, { useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const Messages = ({ messages = [], currentChannelId }) => {
  const messagesEndRef = useRef(null);

  // Мемоизируем отфильтрованные сообщения для текущего канала
  const channelMessages = useMemo(() => {
    return messages.filter(message => message.channelId === currentChannelId);
  }, [messages, currentChannelId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  // Проверяем, что messages является массивом
  if (!Array.isArray(messages)) {
    console.warn('Messages: messages должен быть массивом');
    return (
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        <div className="text-muted text-center">Ошибка загрузки сообщений</div>
      </div>
    );
  }

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages.length === 0 ? (
        <div className="text-muted text-center py-4">
          Нет сообщений в этом канале
        </div>
      ) : (
        channelMessages.map(message => (
          <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            {`: ${message.body}`}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  currentChannelId: PropTypes.number
};

Messages.defaultProps = {
  messages: [],
  currentChannelId: null
};

export default Messages; 