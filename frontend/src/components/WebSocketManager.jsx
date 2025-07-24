import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageFromSocket, setSocketStatus } from '../slices/messagesSlice';
import { updateChannelsFromSocket } from '../slices/channelsSlice';
import socketService from '../services/socketService';
import { useNotifications } from './NotificationManager';

const WebSocketManager = () => {
  const dispatch = useDispatch();
  const { showConnected, showDisconnected, showConnecting } = useNotifications();
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

    // Обработчики событий соединения с уведомлениями
    const handleConnect = () => {
      updateConnectionStatus();
      showConnected();
    };

    const handleDisconnect = () => {
      updateConnectionStatus();
      showDisconnected();
    };

    const handleConnecting = () => {
      updateConnectionStatus();
      showConnecting();
    };

    // Обновляем статус при подключении/отключении
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connecting', handleConnecting);

    // Очистка при размонтировании
    return () => {
      socketService.off('newMessage', handleNewMessage);
      socketService.off('channelUpdate', handleChannelUpdate);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connecting', handleConnecting);
    };
  }, [dispatch, token, showConnected, showDisconnected, showConnecting]);

  // Компонент не рендерит ничего видимого
  return null;
};

export default WebSocketManager; 