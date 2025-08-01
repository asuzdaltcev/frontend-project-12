# Chat Application

[![Actions Status](https://github.com/asuzdaltcev/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-12/actions)
[![Maintainability](https://qlty.sh/gh/asuzdaltcev/projects/frontend-project-12/maintainability.svg)](https://qlty.sh/gh/asuzdaltcev/projects/frontend-project-12)

Современное React приложение для чата с полным набором функций.

## 🚀 Возможности

- ✅ **Аутентификация** - регистрация и вход пользователей
- ✅ **Чат в реальном времени** - WebSocket интеграция
- ✅ **Управление каналами** - создание, переименование, удаление
- ✅ **Интернационализация** - поддержка русского и английского языков
- ✅ **Фильтрация контента** - защита от нецензурной лексики
- ✅ **Уведомления** - toast уведомления для пользователя
- ✅ **Мониторинг ошибок** - интеграция с Rollbar
- ✅ **Адаптивный дизайн** - React Bootstrap компоненты

## 🛠️ Технологии

- **Frontend**: React 18, Redux Toolkit, React Router
- **UI**: React Bootstrap, Bootstrap 5
- **Сборка**: Vite
- **Языки**: i18next для интернационализации
- **WebSocket**: Socket.io для real-time чата
- **Мониторинг**: Rollbar для отслеживания ошибок
- **Фильтрация**: leo-profanity для защиты контента

## 📦 Установка и запуск

### **Локальная разработка:**

```bash
# Установка зависимостей
npm install

# Сборка frontend
make build

# Запуск сервера
make start
```

Приложение будет доступно по адресу: http://localhost:5001

### **Переменные окружения:**

Создайте файл `frontend/.env.local`:
```bash
REACT_APP_ROLLBAR_ACCESS_TOKEN=your_rollbar_token_here
NODE_ENV=development
REACT_APP_VERSION=1.0.0
REACT_APP_GIT_BRANCH=main
```

## 🌐 Деплой

### **Render (рекомендуется):**

1. Загрузите код в GitHub
2. Перейдите в [Render Dashboard](https://dashboard.render.com/)
3. Создайте новый Web Service
4. Подключите ваш GitHub репозиторий
5. Настройте переменные окружения

Подробная инструкция: [RENDER_SETUP.md](RENDER_SETUP.md)

### **Другие платформы:**

- **Heroku**: используйте `Procfile`
- **Docker**: используйте `Dockerfile` (если есть)

## 📚 Документация

- [Rollbar интеграция](ROLLBAR_FINAL_INTEGRATION.md) - мониторинг ошибок
- [Настройка Render](RENDER_SETUP.md) - деплой на Render

## 🔧 API Endpoints

- `GET /api/v1/channels` - получение каналов (требует аутентификации)
- `POST /api/v1/signup` - регистрация нового пользователя
- `POST /api/v1/login` - вход пользователя
- `GET /api/v1/messages` - получение сообщений (требует аутентификации)

## 🎯 Структура проекта

```
frontend-project-12/
├── frontend/                 # React приложение
│   ├── src/                 # Исходный код
│   ├── dist/                # Собранные файлы
│   ├── public/              # Статические файлы
│   └── package.json         # Зависимости frontend
├── package.json             # Зависимости проекта
├── Makefile                 # Команды сборки
├── README.md               # Документация
└── health.js               # Health check
```

## 🔒 Безопасность

- Токены хранятся в переменных окружения
- Фильтрация нецензурной лексики
- Валидация входных данных
- Защищенные маршруты

## 📈 Мониторинг

- Автоматический захват ошибок через Rollbar
- Логирование пользовательских действий
- Source maps для отладки в продакшене

---

**Готово к продакшену!** 🚀