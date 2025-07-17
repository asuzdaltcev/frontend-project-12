import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageFromSocket, setSocketStatus } from '../slices/messagesSlice';
import { updateChannelsFromSocket } from '../slices/channelsSlice';
import socketService from '../services/socketService';

const WebSocketManager = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return;
    }

    // Подключаемся к WebSocket
    const socket = socketService.connect(token);

    // Обработчик новых сообщений
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

    // Обновляем статус соединения
    const updateConnectionStatus = () => {
      dispatch(setSocketStatus(socketService.getConnectionStatus()));
    };

    // Обновляем статус при подключении/отключении
    socket.on('connect', updateConnectionStatus);
    socket.on('disconnect', updateConnectionStatus);

    // Очистка при размонтировании
    return () => {
      socketService.off('newMessage', handleNewMessage);
      socketService.off('channelUpdate', handleChannelUpdate);
      socket.off('connect', updateConnectionStatus);
      socket.off('disconnect', updateConnectionStatus);
    };
  }, [dispatch, token]);

  // Компонент не рендерит ничего видимого
  return null;
};

export default WebSocketManager; 