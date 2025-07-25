import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, setCurrentChannel, addChannel } from '../slices/channelsSlice';
import { fetchMessages } from '../slices/messagesSlice';
import ChatInterface from '../components/ChatInterface';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useNotifications } from '../components/NotificationManager';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showNetworkError, showLoadingError } = useNotifications();
  const { channels, loading: channelsLoading, error: channelsError } = useSelector(state => state.channels);
  const { messages, loading: messagesLoading, error: messagesError } = useSelector(state => state.messages);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  // Создаем канал General по умолчанию, если каналов нет
  useEffect(() => {
    if (channels.length === 0 && !channelsLoading && !channelsError) {
      dispatch(addChannel('general'));
    }
  }, [channels.length, channelsLoading, channelsError, dispatch]);

  // Обработка ошибок загрузки данных
  useEffect(() => {
    if (channelsError) {
      if (channelsError === 'network_error') {
        showNetworkError();
      } else {
        showLoadingError();
      }
    }
  }, [channelsError, showNetworkError, showLoadingError]);

  useEffect(() => {
    if (messagesError) {
      if (messagesError === 'network_error') {
        showNetworkError();
      } else {
        showLoadingError();
      }
    }
  }, [messagesError, showNetworkError, showLoadingError]);

  // Автоматически выбираем канал General при загрузке
  useEffect(() => {
    if (channels.length > 0) {
      const generalChannel = channels.find(channel => 
        channel.name.toLowerCase() === 'general'
      );
      if (generalChannel) {
        dispatch(setCurrentChannel(generalChannel.id));
      } else if (channels.length > 0) {
        // Если канала General нет, выбираем первый доступный
        dispatch(setCurrentChannel(channels[0].id));
      }
    }
  }, [channels, dispatch]);

  if (channelsLoading || messagesLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('common.loading')}</span>
        </Spinner>
      </Container>
    );
  }

  if (channelsError || messagesError) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>{t('common.error')}</h4>
          <div>{t('notifications.error.loading')}</div>
          <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>
            {t('common.loading')}
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="chat-page">
      <ChatInterface channels={channels} messages={messages} />
    </div>
  );
};

export default Home; 