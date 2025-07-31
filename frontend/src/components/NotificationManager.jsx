import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

// Хук для управления уведомлениями
export const useNotifications = () => {
  const { t } = useTranslation();

  const showSuccess = (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  };

  // Специализированные методы для каналов
  const showChannelCreated = (channelName) => {
    showSuccess(t('notifications.success.channelCreated'));
  };

  const showChannelRenamed = (channelName) => {
    showSuccess(t('notifications.success.channelRenamed'));
  };

  const showChannelRemoved = (channelName) => {
    showSuccess(t('notifications.success.channelRemoved', { name: channelName }));
  };

  const showMessageSent = () => {
    showSuccess(t('notifications.success.messageSent'));
  };

  // Специализированные методы для ошибок
  const showNetworkError = () => {
    showError(t('notifications.error.network'));
  };

  const showLoadingError = () => {
    showError(t('notifications.error.loading'));
  };

  const showUnknownError = () => {
    showError(t('notifications.error.unknown'));
  };

  // Специализированные методы для соединения
  const showConnecting = () => {
    showInfo(t('notifications.info.connecting'));
  };

  const showConnected = () => {
    showInfo(t('notifications.info.connected'));
  };

  const showDisconnected = () => {
    showWarning(t('notifications.warning.disconnected'));
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showChannelCreated,
    showChannelRenamed,
    showChannelRemoved,
    showMessageSent,
    showNetworkError,
    showLoadingError,
    showUnknownError,
    showConnecting,
    showConnected,
    showDisconnected,
  };
};

// Компонент контейнера уведомлений
const NotificationManager = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default NotificationManager; 