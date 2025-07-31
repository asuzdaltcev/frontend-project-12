import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessageFromSocket, setSocketStatus } from '../slices/messagesSlice';
import { updateChannelsFromSocket } from '../slices/channelsSlice';
import socketService from '../services/socketService';

const WebSocketManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return;
    }

    // Подключаемся к WebSocket
    const socket = socketService.connect(token);

    // Обработчик новых сообщений - обновляем состояние React
    const handleNewMessage = (message) => {
      dispatch(addMessageFromSocket(message));
    };

    // Обработчик обновлений каналов
    const handleChannelUpdate = (channels) => {
      dispatch(updateChannelsFromSocket(channels));
    };

    // Подписываемся на события
    socketService.onNewMessage(handleNewMessage);
    socketService.onChannelUpdate(handleChannelUpdate);

    // Обработчики событий соединения
    const handleConnect = () => {
      dispatch(setSocketStatus(true));
    };

    const handleDisconnect = () => {
      dispatch(setSocketStatus(false));
    };

    const handleReconnect = () => {
      // Переподключение обработано автоматически
    };

    // Обновляем статус при подключении/отключении
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('reconnect', handleReconnect);

    // Очистка при размонтировании
    return () => {
      socketService.off('newMessage', handleNewMessage);
      socketService.off('channelUpdate', handleChannelUpdate);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('reconnect', handleReconnect);
    };
  }, [dispatch]);

  // Компонент не рендерит ничего видимого
  return null;
};

export default WebSocketManager; 