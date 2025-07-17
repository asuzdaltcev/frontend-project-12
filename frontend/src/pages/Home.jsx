import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import { fetchMessages } from '../slices/messagesSlice';
import ChatInterface from '../components/ChatInterface';

const Home = () => {
  const dispatch = useDispatch();
  const { channels, loading: channelsLoading, error: channelsError } = useSelector(state => state.channels);
  const { messages, loading: messagesLoading, error: messagesError } = useSelector(state => state.messages);

  useEffect(() => {
    // Загружаем данные при монтировании компонента
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  if (channelsLoading || messagesLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Загрузка чата...</div>
      </div>
    );
  }

  if (channelsError || messagesError) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки данных</h2>
        <p>{channelsError || messagesError}</p>
        <button onClick={() => window.location.reload()}>Обновить страницу</button>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <ChatInterface channels={channels} messages={messages} />
    </div>
  );
};

export default Home; 