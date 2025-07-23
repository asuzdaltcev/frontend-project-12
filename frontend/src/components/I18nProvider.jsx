import React, { useEffect, useState } from 'react';
import i18n from '../i18n.js';

const I18nProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      if (i18n.isInitialized) {
        setIsReady(true);
        return;
      }

      try {
        // Ждем инициализации i18next
        await i18n.init();
        setIsReady(true);
      } catch (error) {
        console.error('Ошибка инициализации i18n:', error);
        setIsReady(true); // Все равно показываем приложение
      }
    };

    initI18n();
  }, []);

  if (!isReady) {
    return <div>Загрузка переводов...</div>;
  }

  return children;
};

export default I18nProvider; 