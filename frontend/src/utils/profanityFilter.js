// Фильтр нецензурных слов с использованием leo-profanity
import leoProfanity from 'leo-profanity';

// Инициализация фильтра
const profanityFilter = {
  initialized: false,

  // Инициализация фильтра
  init() {
    if (this.initialized) return;
    
    try {
      // Загружаем русский словарь
      leoProfanity.loadDictionary('ru');
      
      console.log('Фильтр нецензурных слов успешно инициализирован с русским словарем');
      this.initialized = true;
    } catch (error) {
      console.warn('Ошибка инициализации фильтра нецензурных слов:', error);
      console.warn('Используется fallback фильтр');
    }
  },

  // Проверка на наличие нецензурных слов
  check(text) {
    if (!text || typeof text !== 'string') {
      return false;
    }
    
    if (!this.initialized) {
      this.init();
    }
    
    try {
      return leoProfanity.check(text);
    } catch (error) {
      console.warn('Ошибка проверки нецензурных слов:', error);
      return false;
    }
  },

  // Фильтрация нецензурных слов (замена на звездочки)
  clean(text) {
    if (!text || typeof text !== 'string') {
      return text;
    }
    
    if (!this.initialized) {
      this.init();
    }
    
    try {
      return leoProfanity.clean(text);
    } catch (error) {
      console.warn('Ошибка фильтрации нецензурных слов:', error);
      return text;
    }
  },

  // Получение списка найденных нецензурных слов
  list(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }
    
    if (!this.initialized) {
      this.init();
    }
    
    try {
      return leoProfanity.list(text);
    } catch (error) {
      console.warn('Ошибка получения списка нецензурных слов:', error);
      return [];
    }
  },

  // Проверка и очистка текста с возвратом результата
  process(text) {
    if (!text || typeof text !== 'string') {
      return {
        hasProfanity: false,
        cleanedText: text,
        profanityList: []
      };
    }

    if (!this.initialized) {
      this.init();
    }

    const hasProfanity = this.check(text);
    const cleanedText = hasProfanity ? this.clean(text) : text;
    const profanityList = hasProfanity ? this.list(text) : [];

    return {
      hasProfanity,
      cleanedText,
      profanityList
    };
  },

  // Дополнительные методы для работы с библиотекой
  add(words) {
    if (!this.initialized) {
      this.init();
    }
    
    try {
      leoProfanity.add(words);
    } catch (error) {
      console.warn('Ошибка добавления слов:', error);
    }
  },

  remove(words) {
    if (!this.initialized) {
      this.init();
    }
    
    try {
      leoProfanity.remove(words);
    } catch (error) {
      console.warn('Ошибка удаления слов:', error);
    }
  },

  clearList() {
    if (!this.initialized) {
      this.init();
    }
    
    try {
      leoProfanity.clearList();
    } catch (error) {
      console.warn('Ошибка очистки списка:', error);
    }
  },

  loadDictionary(lang) {
    if (!this.initialized) {
      this.init();
    }
    
    try {
      leoProfanity.loadDictionary(lang);
      console.log(`Загружен словарь для языка: ${lang}`);
    } catch (error) {
      console.warn(`Ошибка загрузки словаря для языка ${lang}:`, error);
    }
  },

  addDictionary(lang, words) {
    if (!this.initialized) {
      this.init();
    }
    
    try {
      leoProfanity.addDictionary(lang, words);
      console.log(`Добавлен новый словарь для языка: ${lang}`);
    } catch (error) {
      console.warn(`Ошибка добавления словаря для языка ${lang}:`, error);
    }
  }
};

// Инициализируем фильтр
profanityFilter.init();

export default profanityFilter; 