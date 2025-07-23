# Тестирование интернационализации (i18n)

## Обзор

Реализована полная интернационализация приложения с использованием библиотеки `react-i18next`. Все тексты интерфейса вынесены из кода в отдельные файлы переводов.

## Конфигурация

### Основные файлы
- **`frontend/src/i18n.js`** - конфигурация i18next
- **`frontend/src/main.jsx`** - инициализация i18n

### Настройки
- **Дефолтная локаль**: `ru` (русский)
- **Автоопределение языка**: отключено
- **Fallback**: `ru`
- **Suspense**: отключен для совместимости

## Структура переводов

### Навигация (`nav.*`)
```javascript
'nav.brand': 'Hexlet Chat',
'nav.home': 'Главная',
'nav.login': 'Войти',
'nav.signup': 'Регистрация',
'nav.logout': 'Выйти',
```

### Страница входа (`login.*`)
```javascript
'login.title': 'Вход в чат',
'login.subtitle': 'Введите свои данные для авторизации',
'login.username': 'Имя пользователя',
'login.password': 'Пароль',
'login.submit': 'Войти',
'login.submitting': 'Вход...',
'login.noAccount': 'Нет аккаунта?',
'login.signupLink': 'Зарегистрироваться',
```

### Страница регистрации (`signup.*`)
```javascript
'signup.title': 'Регистрация',
'signup.subtitle': 'Создайте новый аккаунт для входа в чат',
'signup.username': 'Имя пользователя',
'signup.password': 'Пароль',
'signup.confirmPassword': 'Подтверждение пароля',
'signup.submit': 'Зарегистрироваться',
'signup.submitting': 'Регистрация...',
'signup.hasAccount': 'Уже есть аккаунт?',
'signup.loginLink': 'Войти',
```

### Каналы (`channels.*`)
```javascript
'channels.title': 'Каналы',
'channels.add': 'Добавить канал',
'channels.rename': 'Переименовать канал',
'channels.remove': 'Удалить канал',
'channels.name': 'Имя канала',
'channels.namePlaceholder': 'Введите имя канала',
'channels.confirmRemove': 'Удалить канал "{{name}}"?',
'channels.confirmRemoveText': 'Это действие нельзя отменить.',
```

### Сообщения (`messages.*`)
```javascript
'messages.title': 'Сообщения',
'messages.placeholder': 'Введите сообщение...',
'messages.send': 'Отправить',
'messages.error.send': 'Ошибка отправки сообщения',
```

### Чат (`chat.*`)
```javascript
'chat.title': 'Hexlet Chat',
'chat.placeholder': 'Введите сообщение...',
'chat.send': 'Отправить',
'chat.loading': 'Загрузка...',
'chat.noMessages': 'Сообщений пока нет',
'chat.error.loading': 'Ошибка загрузки сообщений',
```

### Статус соединения (`connection.*`)
```javascript
'connection.connected': 'Подключено',
'connection.disconnected': 'Отключено',
'connection.connecting': 'Подключение...',
'connection.error': 'Ошибка соединения',
```

### Общие элементы (`common.*`)
```javascript
'common.loading': 'Загрузка...',
'common.error': 'Ошибка',
'common.success': 'Успешно',
'common.cancel': 'Отмена',
'common.confirm': 'Подтвердить',
'common.save': 'Сохранить',
'common.delete': 'Удалить',
'common.edit': 'Редактировать',
'common.close': 'Закрыть',
```

### Страница 404 (`notFound.*`)
```javascript
'notFound.title': 'Страница не найдена',
'notFound.text': 'Запрашиваемая страница не существует',
'notFound.back': 'Вернуться на главную',
```

## Обновленные компоненты

### 1. Навигация (`Navigation.jsx`)
- Брендинг: `{t('nav.brand')}`
- Ссылки: `{t('nav.home')}`, `{t('nav.login')}`, `{t('nav.signup')}`
- Кнопка выхода: `{t('nav.logout')}`

### 2. Страница входа (`Login.jsx`)
- Заголовок: `{t('login.title')}`
- Подзаголовок: `{t('login.subtitle')}`
- Поля формы: `{t('login.username')}`, `{t('login.password')}`
- Плейсхолдеры: `{t('login.usernamePlaceholder')}`, `{t('login.passwordPlaceholder')}`
- Кнопка: `{t('login.submit')}`, `{t('login.submitting')}`
- Ссылка на регистрацию: `{t('login.noAccount')}`, `{t('login.signupLink')}`

### 3. Страница регистрации (`Signup.jsx`)
- Заголовок: `{t('signup.title')}`
- Подзаголовок: `{t('signup.subtitle')}`
- Поля формы: `{t('signup.username')}`, `{t('signup.password')}`, `{t('signup.confirmPassword')}`
- Плейсхолдеры: `{t('signup.usernamePlaceholder')}`, `{t('signup.passwordPlaceholder')}`, `{t('signup.confirmPasswordPlaceholder')}`
- Кнопка: `{t('signup.submit')}`, `{t('signup.submitting')}`
- Ссылка на вход: `{t('signup.hasAccount')}`, `{t('signup.loginLink')}`

### 4. Модальные окна каналов
- **AddChannelModal**: `{t('channels.add')}`, `{t('channels.name')}`, `{t('channels.namePlaceholder')}`
- **RenameChannelModal**: `{t('channels.rename')}`, `{t('channels.name')}`, `{t('channels.namePlaceholder')}`
- **RemoveChannelModal**: `{t('channels.remove')}`, `{t('channels.confirmRemove', { name: channel.name })}`

### 5. Форма сообщений (`MessageForm.jsx`)
- Плейсхолдер: `{t('messages.placeholder')}`
- Кнопка отправки: `{t('messages.send')}`
- Сообщение о выборе канала: `{t('chat.noMessages')}`

### 6. Статус соединения (`ConnectionStatus.jsx`)
- Статус: `{t('connection.connected')}`, `{t('connection.disconnected')}`

### 7. Страница 404 (`NotFound.jsx`)
- Заголовок: `{t('notFound.title')}`
- Текст: `{t('notFound.text')}`
- Кнопки: `{t('notFound.back')}`, `{t('nav.login')}`

## Валидация

### Клиентская валидация (Yup)
Все сообщения валидации переведены:

```javascript
// Страница входа
username: Yup.string()
  .min(3, t('login.validation.username.min'))
  .max(20, t('login.validation.username.max'))
  .required(t('login.validation.username.required')),

// Страница регистрации
username: Yup.string()
  .min(3, t('signup.validation.username.min'))
  .max(20, t('signup.validation.username.max'))
  .required(t('signup.validation.username.required')),
password: Yup.string()
  .min(6, t('signup.validation.password.min'))
  .required(t('signup.validation.password.required')),
confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], t('signup.validation.confirmPassword.match'))
  .required(t('signup.validation.confirmPassword.required')),

// Каналы
name: Yup.string()
  .min(3, t('channels.error.nameLength'))
  .max(20, t('channels.error.nameLength'))
  .required(t('channels.error.nameRequired'))
  .test('unique', t('channels.error.nameUnique'), function(value) {
    // логика валидации
  }),
```

## Обработка ошибок

### Серверные ошибки
```javascript
// Страница входа
if (error.response && error.response.status === 401) {
  setAuthError(t('login.error.invalidCredentials'));
} else {
  setAuthError(t('login.error.general'));
}

// Страница регистрации
if (error.response && error.response.status === 409) {
  setAuthError(t('signup.error.userExists'));
} else if (error.response && error.response.status === 400) {
  setAuthError(t('signup.error.validation'));
} else {
  setAuthError(t('signup.error.general'));
}

// Каналы
if (error?.message?.includes('уже существует')) {
  setFieldError('name', t('channels.error.nameUnique'));
} else {
  setFieldError('name', error?.message || t('channels.error.add'));
}
```

## Интерполяция

Поддержка интерполяции для динамических значений:

```javascript
// Удаление канала с именем
t('channels.confirmRemove', { name: channel.name })
// Результат: "Удалить канал "general"?"
```

## Тестирование

### 1. Проверка переводов
1. Откройте приложение
2. Проверьте, что все тексты отображаются на русском языке
3. Убедитесь, что нет "сырых" ключей переводов

### 2. Навигация
1. Проверьте брендинг "Hexlet Chat"
2. Проверьте ссылки навигации
3. Проверьте кнопку "Выйти" для авторизованных пользователей

### 3. Формы
1. Проверьте заголовки и подзаголовки страниц
2. Проверьте лейблы полей и плейсхолдеры
3. Проверьте кнопки и их состояния загрузки
4. Проверьте сообщения валидации

### 4. Модальные окна
1. Проверьте заголовки модальных окон
2. Проверьте тексты подтверждений
3. Проверьте кнопки действий

### 5. Ошибки
1. Попробуйте войти с неверными данными
2. Попробуйте зарегистрировать существующего пользователя
3. Попробуйте создать канал с существующим именем
4. Проверьте, что все ошибки переведены

### 6. Статус соединения
1. Проверьте отображение статуса "Подключено"/"Отключено"
2. Проверьте, что статус обновляется при изменении состояния

## Преимущества реализации

1. **Централизованное управление текстами** - все переводы в одном месте
2. **Легкость добавления новых языков** - достаточно добавить новые ресурсы
3. **Типобезопасность** - использование ключей переводов
4. **Интерполяция** - поддержка динамических значений
5. **Валидация** - переводы сообщений валидации
6. **Обработка ошибок** - переводы серверных ошибок
7. **Производительность** - загрузка только нужных переводов

## Возможные улучшения

1. **Добавление других языков** (en, es, fr, etc.)
2. **Автоопределение языка браузера**
3. **Переключение языка в интерфейсе**
4. **Ленивая загрузка переводов**
5. **Плюрализация** для разных форм множественного числа
6. **Контекстные переводы** для разных ситуаций 