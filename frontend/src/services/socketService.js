import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Подключение к серверу
  connect(token) {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    // Создаем соединение с сервером
    this.socket = io(window.location.origin, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    // Обработчики событий соединения
    this.socket.on('connect', () => {
      console.log('WebSocket подключен');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket отключен');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Ошибка подключения WebSocket:', error);
      this.isConnected = false;
    });

    return this.socket;
  }

  // Отключение от сервера
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Отправка сообщения
  sendMessage(message) {
    if (this.socket && this.isConnected) {
      return new Promise((resolve, reject) => {
        this.socket.emit('newMessage', message, (response) => {
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response);
          }
        });
      });
    } else {
      return Promise.reject(new Error('WebSocket не подключен'));
    }
  }

  // Подписка на новые сообщения
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  // Подписка на обновления каналов
  onChannelUpdate(callback) {
    if (this.socket) {
      this.socket.on('channelUpdate', callback);
    }
  }

  // Подписка на новые каналы
  onNewChannel(callback) {
    if (this.socket) {
      this.socket.on('newChannel', callback);
    }
  }

  // Подписка на удаление каналов
  onRemoveChannel(callback) {
    if (this.socket) {
      this.socket.on('removeChannel', callback);
    }
  }

  // Подписка на переименование каналов
  onRenameChannel(callback) {
    if (this.socket) {
      this.socket.on('renameChannel', callback);
    }
  }

  // Отписка от событий
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Получение статуса соединения
  getConnectionStatus() {
    return this.isConnected;
  }
}

// Создаем единственный экземпляр сервиса
const socketService = new SocketService();

export default socketService; 