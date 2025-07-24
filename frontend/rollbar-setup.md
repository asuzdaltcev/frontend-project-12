# 🐛 Настройка Rollbar для мониторинга ошибок

## 📋 Пошаговая инструкция

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

### 5. Пересборка приложения
```bash
cd frontend
npm run build
```

### 6. Тестирование интеграции
1. Запустите приложение: `make start`
2. Войдите в систему
3. Перейдите по ссылке "🐛 Rollbar Test" в навигации
4. Нажмите кнопки для тестирования различных типов ошибок
5. Проверьте, что ошибки появляются в Rollbar Dashboard

## 🔧 Конфигурация Rollbar

### Основные настройки
- **Environment**: development/production
- **Capture Uncaught**: автоматический захват необработанных ошибок
- **Capture Unhandled Rejections**: автоматический захват отклонений промисов
- **Source Maps**: для точного определения места ошибки

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

## 📊 Типы ошибок

### 1. Error (Ошибка)
```javascript
rollbar.error('Сообщение об ошибке', error, extraData);
```

### 2. Warning (Предупреждение)
```javascript
rollbar.warning('Предупреждение', extraData);
```

### 3. Info (Информация)
```javascript
rollbar.info('Информационное сообщение', extraData);
```

### 4. Critical (Критическая ошибка)
```javascript
rollbar.critical('Критическая ошибка', error, extraData);
```

## 🚀 Продакшен настройки

### Source Maps
Для продакшена обязательно настройте source maps:

1. В `vite.config.js`:
```javascript
export default {
  build: {
    sourcemap: true
  }
}
```

2. Загрузите source maps в Rollbar через API или CLI

### Environment Variables
```bash
NODE_ENV=production
REACT_APP_ROLLBAR_ACCESS_TOKEN=your_production_token
REACT_APP_VERSION=1.0.0
REACT_APP_GIT_BRANCH=main
```

## 📈 Мониторинг

### Dashboard
- Просмотр всех ошибок в реальном времени
- Группировка похожих ошибок
- Статистика по времени и частоте

### Уведомления
Настройте уведомления для:
- Критических ошибок
- Новых типов ошибок
- Повторяющихся ошибок

### Интеграции
Rollbar поддерживает интеграции с:
- Slack
- Email
- PagerDuty
- Jira
- GitHub

## 🔍 Отладка

### Проверка подключения
1. Откройте консоль браузера (F12)
2. Проверьте наличие ошибок подключения к Rollbar
3. Убедитесь, что access token корректный

### Тестирование
Используйте компонент RollbarTest для проверки:
- Ручного логирования ошибок
- Автоматического захвата ошибок
- Контекста пользователя
- Отклонений промисов

## 📚 Дополнительные ресурсы

- [Rollbar React Documentation](https://docs.rollbar.com/docs/react)
- [Rollbar JavaScript SDK](https://docs.rollbar.com/docs/javascript)
- [Source Maps Setup](https://docs.rollbar.com/docs/source-maps)
- [Error Filtering](https://docs.rollbar.com/docs/ignoring-errors) 