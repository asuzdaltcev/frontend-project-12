# 🐛 Интеграция Rollbar для мониторинга ошибок

## ✅ Что реализовано

### 📦 Установленные пакеты
- `@rollbar/react@1.0.0` - React SDK для Rollbar
- `rollbar@2.26.4` - Основной JavaScript SDK

### 🔧 Конфигурация
- **Файл конфигурации:** `frontend/src/utils/rollbar.js`
- **Интеграция в приложение:** `frontend/src/main.jsx`
- **Компонент тестирования:** `frontend/src/components/RollbarTest.jsx`
- **Source maps:** включены в `vite.config.js`

### 🛡️ Функциональность

#### **Автоматический захват ошибок:**
- ✅ Необработанные ошибки JavaScript
- ✅ Отклонения промисов (unhandled rejections)
- ✅ Ошибки React компонентов (через ErrorBoundary)

#### **Ручное логирование:**
- ✅ `rollbar.error()` - ошибки
- ✅ `rollbar.warning()` - предупреждения  
- ✅ `rollbar.info()` - информационные сообщения
- ✅ `rollbar.critical()` - критические ошибки

#### **Контекст и метаданные:**
- ✅ Информация о пользователе (username, email)
- ✅ ID сессии
- ✅ Временные метки
- ✅ Версия приложения
- ✅ Git ветка

#### **Фильтрация ошибок:**
- ✅ Игнорирование ошибок браузерных расширений
- ✅ Фильтрация сетевых ошибок
- ✅ Игнорирование ResizeObserver ошибок

## 🚀 Пошаговая настройка

### 1. Создание аккаунта Rollbar
1. Перейдите на [Rollbar.com](https://rollbar.com)
2. Зарегистрируйтесь для получения бесплатного аккаунта
3. Подтвердите email

### 2. Создание проекта
1. Войдите в Rollbar Dashboard
2. Нажмите "Create Project"
3. Выберите "React" как платформу
4. Введите название проекта (например, "Chat App")
5. Выберите "JavaScript" как язык

### 3. Получение Access Token
1. В настройках проекта найдите раздел "Access Tokens"
2. Скопируйте "Client-side access token" (начинается с `post_client_item`)
3. Этот токен будет использоваться в приложении

### 4. Настройка переменных окружения
Создайте файл `.env` в папке `frontend/`:

```bash
# Rollbar Configuration
REACT_APP_ROLLBAR_ACCESS_TOKEN=your_rollbar_access_token_here

# Application Version
REACT_APP_VERSION=1.0.0

# Git Branch
REACT_APP_GIT_BRANCH=main

# Environment
NODE_ENV=development
```

### 5. Пересборка и запуск
```bash
make build
make start
```

### 6. Тестирование интеграции
1. Откройте приложение: http://localhost:5001
2. Войдите в систему
3. Перейдите по ссылке "🐛 Rollbar Test" в навигации
4. Нажмите кнопки для тестирования различных типов ошибок
5. Проверьте, что ошибки появляются в Rollbar Dashboard

## 📊 Типы ошибок и их обработка

### 1. Автоматический захват
```javascript
// Необработанные ошибки автоматически отправляются в Rollbar
throw new Error('Тестовая ошибка');

// Отклонения промисов также автоматически захватываются
Promise.reject(new Error('Ошибка промиса'));
```

### 2. Ручное логирование
```javascript
import { useRollbar } from '@rollbar/react';

const MyComponent = () => {
  const rollbar = useRollbar();
  
  const handleError = () => {
    rollbar.error('Произошла ошибка', error, {
      component: 'MyComponent',
      action: 'handleError'
    });
  };
  
  return <button onClick={handleError}>Тест ошибки</button>;
};
```

### 3. Использование утилит
```javascript
// Глобальные утилиты доступны через window.rollbarUtils
window.rollbarUtils.error('Ошибка', error, { context: 'additional' });
window.rollbarUtils.setUser({ username: 'john', email: 'john@example.com' });
```

## 🔍 Тестирование

### Компонент RollbarTest
Доступен по адресу: http://localhost:5001/rollbar-test

**Функции тестирования:**
- ✅ Тест ручного логирования ошибок
- ✅ Тест необработанных ошибок
- ✅ Тест отклонений промисов
- ✅ Тест контекста пользователя
- ✅ Тест React Error Boundary
- ✅ Отображение результатов тестирования

### Проверка в консоли браузера
1. Откройте DevTools (F12)
2. Перейдите на вкладку Console
3. Проверьте наличие ошибок подключения к Rollbar
4. Убедитесь, что access token корректный

## 🚀 Продакшен настройки

### Source Maps
Source maps уже включены в `vite.config.js`:
```javascript
build: {
  sourcemap: true, // Включаем source maps для Rollbar
}
```

### Environment Variables для продакшена
```bash
NODE_ENV=production
REACT_APP_ROLLBAR_ACCESS_TOKEN=your_production_token
REACT_APP_VERSION=1.0.0
REACT_APP_GIT_BRANCH=main
```

### Загрузка Source Maps в Rollbar
Для продакшена рекомендуется загрузить source maps в Rollbar:
1. Через Rollbar CLI
2. Через API
3. Через веб-интерфейс

## 📈 Мониторинг и аналитика

### Rollbar Dashboard
- **Items** - все ошибки и предупреждения
- **Occurrences** - отдельные случаи ошибок
- **Trends** - статистика по времени
- **Environments** - ошибки по окружениям

### Группировка ошибок
Rollbar автоматически группирует похожие ошибки по:
- Стеку вызовов
- Сообщению об ошибке
- Файлу и строке

### Уведомления
Настройте уведомления для:
- Критических ошибок
- Новых типов ошибок
- Повторяющихся ошибок

## 🔧 Дополнительные настройки

### Интеграции
Rollbar поддерживает интеграции с:
- ✅ Slack
- ✅ Email
- ✅ PagerDuty
- ✅ Jira
- ✅ GitHub
- ✅ Discord

### Фильтрация ошибок
Настроены фильтры для игнорирования:
- Ошибки от браузерных расширений
- Сетевые ошибки
- ResizeObserver ошибки
- Script error (без деталей)

### Контекст пользователя
Автоматически добавляется информация о:
- Имени пользователя
- Email (если доступен)
- ID сессии
- Временной метке

## 📚 Полезные ссылки

- [Rollbar React Documentation](https://docs.rollbar.com/docs/react)
- [Rollbar JavaScript SDK](https://docs.rollbar.com/docs/javascript)
- [Source Maps Setup](https://docs.rollbar.com/docs/source-maps)
- [Error Filtering](https://docs.rollbar.com/docs/ignoring-errors)
- [12 Factor App](https://12factor.net/ru/)

## 🎯 Результат

**Rollbar полностью интегрирован в приложение согласно официальной документации!**

✅ Автоматический мониторинг ошибок  
✅ Ручное логирование  
✅ Контекст пользователя  
✅ Source maps  
✅ Фильтрация ошибок  
✅ Компонент тестирования  
✅ React Error Boundary  
✅ Готов к продакшену  

**Теперь все ошибки будут отслеживаться в реальном времени!** 🚀

## 🔄 Обновления

### Версия 2.0 (Текущая)
- ✅ Обновлена интеграция согласно официальной документации Rollbar React SDK
- ✅ Использование `Provider` с `config` вместо `instance`
- ✅ Добавлен тест React Error Boundary
- ✅ Улучшена обработка ошибок через `window.rollbar`
- ✅ Обновлены утилиты для совместимости с новым API 