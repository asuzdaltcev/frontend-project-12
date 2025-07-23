import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

const ConnectionStatus = () => {
  const socketConnected = useSelector(state => state.messages.socketConnected);

  return (
    <Badge 
      bg={socketConnected ? 'success' : 'warning'} 
      className="connection-status"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.3s ease'
      }}
    >
      {socketConnected ? '🟢 Подключено' : '🟡 Отключено'}
    </Badge>
  );
};

export default ConnectionStatus; 