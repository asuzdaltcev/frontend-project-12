# 🐛 Rollbar: React Web vs React Native

## 📋 Обзор

В этом документе объясняются различия между интеграцией Rollbar для **React Web** (наше приложение) и **React Native** (мобильные приложения).

## 🎯 Наше приложение: React Web

### 📦 Установленные пакеты
```bash
npm install @rollbar/react rollbar
```

### 🔧 Конфигурация
```javascript
// frontend/src/utils/rollbar.js
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
  // ... дополнительные настройки
};
```

### 🚀 Интеграция в приложение
```javascript
// frontend/src/main.jsx
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './utils/rollbar.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>,
)
```

### 📊 Использование в компонентах
```javascript
import { useRollbar } from '@rollbar/react';

const MyComponent = () => {
  const rollbar = useRollbar();
  
  const handleError = () => {
    rollbar.error('Ошибка', error, { component: 'MyComponent' });
  };
  
  return <button onClick={handleError}>Тест ошибки</button>;
};
```

## 📱 React Native (для сравнения)

### 📦 Установка
```bash
npm install rollbar-react-native --save
```

### 🔧 Конфигурация JavaScript
```javascript
// App.js
import { Client } from 'rollbar-react-native';

const rollbar = new Client({
  accessToken: "99ebdce68df24116ba4653f96f44eba2",
  captureUncaught: true,
  captureUnhandledRejections: true
});
```

### 🍎 iOS Конфигурация
```objective-c
// AppDelegate.m
#import <RollbarReactNative/RollbarReactNative.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
  [RollbarReactNative initWithAccessToken:@"99ebdce68df24116ba4653f96f44eba2"];
  // ...
}
```

### 🤖 Android Конфигурация
```java
// MainApplication.java
import com.rollbar.RollbarReactNative;

@Override
public void onCreate() {
  super.onCreate();
  RollbarReactNative.init(this, "99ebdce68df24116ba4653f96f44eba2", "production");
  // ...
}
```

## 📊 Сравнительная таблица

| Аспект | React Web (Наше приложение) | React Native |
|--------|------------------------------|--------------|
| **SDK** | `@rollbar/react` | `rollbar-react-native` |
| **Платформа** | Веб-браузер | iOS/Android |
| **Конфигурация** | Только JavaScript | JavaScript + Native |
| **Установка** | `npm install @rollbar/react` | `npm install rollbar-react-native` |
| **Ошибки** | JavaScript + React | Native + JavaScript |
| **Source Maps** | Автоматически | Ручная настройка |
| **Error Boundary** | Встроенный | Встроенный |
| **Контекст** | Автоматический | Автоматический |
| **Фильтрация** | JavaScript | JavaScript + Native |

## 🎯 Ключевые различия

### 1. **Платформа и окружение**
- **React Web**: Работает в браузере, использует веб-API
- **React Native**: Работает на мобильных устройствах, использует нативные API

### 2. **Конфигурация**
- **React Web**: Только JavaScript конфигурация
- **React Native**: Требует настройки в iOS (Objective-C) и Android (Java)

### 3. **Обработка ошибок**
- **React Web**: JavaScript ошибки, сетевые ошибки, React ошибки
- **React Native**: JavaScript ошибки + нативные краши (iOS/Android)

### 4. **Source Maps**
- **React Web**: Автоматически генерируются Vite/Webpack
- **React Native**: Требуют ручной настройки для нативного кода

### 5. **Производительность**
- **React Web**: Ограничена браузером
- **React Native**: Прямой доступ к нативным возможностям

## 🚀 Преимущества нашего подхода (React Web)

### ✅ Простота настройки
- Один файл конфигурации
- Не требует настройки нативных платформ
- Быстрая интеграция

### ✅ Автоматическая обработка
- Source maps генерируются автоматически
- Error Boundary работает из коробки
- Фильтрация ошибок настраивается легко

### ✅ Кроссплатформенность
- Работает на всех устройствах с браузером
- Не требует компиляции для разных платформ
- Единая кодовая база

### ✅ Отладка
- Инструменты разработчика браузера
- Hot reload для быстрой разработки
- Простая отладка JavaScript

## 📱 Когда использовать React Native

### 🎯 Подходящие случаи:
- Мобильные приложения с нативным UI
- Требуется доступ к нативным API
- Высокая производительность критична
- Офлайн функциональность

### ⚠️ Сложности:
- Двойная настройка (iOS + Android)
- Нативная разработка
- Сложная отладка
- Разные API для разных платформ

## 🎯 Заключение

**Наше приложение использует правильный подход для веб-платформы:**

✅ **React Web с @rollbar/react** - оптимальный выбор для веб-приложений  
✅ **Простая настройка** - один файл конфигурации  
✅ **Автоматическая обработка ошибок** - Error Boundary + глобальные обработчики  
✅ **Source maps** - автоматически генерируются Vite  
✅ **Готовность к продакшену** - полная интеграция с мониторингом  

**React Native SDK** подходит только для мобильных приложений и требует значительно больше настройки.

## 🔗 Полезные ссылки

- [Rollbar React Documentation](https://docs.rollbar.com/docs/react)
- [Rollbar React Native Documentation](https://docs.rollbar.com/docs/react-native)
- [Наша интеграция Rollbar](ROLLBAR_INTEGRATION.md)
- [Демонстрация Rollbar](/rollbar-demo)
- [Тестирование Rollbar](/rollbar-test) 