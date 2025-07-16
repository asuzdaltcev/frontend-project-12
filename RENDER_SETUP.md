# Настройка деплоя на Render

## Build Command (Команда сборки)

Используйте следующую команду для сборки:

```bash
npm install && cd frontend && npm install && npm run build
```

Эта команда:
1. Устанавливает зависимости в корневой директории
2. Переходит в директорию frontend
3. Устанавливает зависимости frontend
4. Собирает React приложение

## Start Command (Команда запуска)

Используйте следующую команду для запуска:

```bash
npx @hexlet/chat-server -s ./frontend/dist -p $PORT -a 0.0.0.0
```

Эта команда:
1. Запускает сервер @hexlet/chat-server
2. Раздает статические файлы из ./frontend/dist
3. Использует порт из переменной окружения $PORT
4. Привязывается ко всем интерфейсам (0.0.0.0)

## Environment Variables (Переменные окружения)

Добавьте следующие переменные:

- `NODE_ENV`: `production`
- `PORT`: `10000`

## Пошаговая настройка в Render Dashboard

1. **Создание сервиса:**
   - New + → Web Service
   - Подключите GitHub репозиторий

2. **Настройка:**
   - Name: `chat-app`
   - Environment: `Node`
   - Region: выберите ближайший
   - Branch: `main`
   - Build Command: `npm install && cd frontend && npm install && npm run build`
   - Start Command: `npx @hexlet/chat-server -s ./frontend/dist -p $PORT -a 0.0.0.0`
   - Plan: `Free`

3. **Переменные окружения:**
   - NODE_ENV: production
   - PORT: 10000

4. **Создание:**
   - Нажмите "Create Web Service"

## Альтернативная конфигурация

Если основная конфигурация не работает, используйте файл `render-simple.yaml`:

```yaml
services:
  - type: web
    name: chat-app-simple
    env: node
    plan: free
    buildCommand: npm install && cd frontend && npm install && npm run build
    startCommand: npx @hexlet/chat-server -s ./frontend/dist -p $PORT -a 0.0.0.0
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

## Проверка деплоя

После успешного деплоя:

1. **Фронтенд:** `https://your-app-name.onrender.com/`
2. **API:** `https://your-app-name.onrender.com/api/v1/channels`
3. **Health check:** `https://your-app-name.onrender.com/health`

## Устранение неполадок

### Ошибка "Module Not Found"
- Убедитесь, что все зависимости установлены
- Проверьте, что package.json содержит все необходимые зависимости

### Ошибка "Invalid build command"
- Проверьте синтаксис команды сборки
- Убедитесь, что все пути корректны

### Ошибка "Invalid start command"
- Проверьте, что сервер привязывается к 0.0.0.0
- Убедитесь, что используется переменная $PORT

### Ошибка "Bind"
- Убедитесь, что сервер привязывается к 0.0.0.0, а не localhost
- Проверьте, что используется правильный порт 