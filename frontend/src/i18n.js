import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ресурсы переводов
const resources = {
  ru: {
    translation: {
      // Навигация
      'nav.brand': 'Hexlet Chat',
      'nav.home': 'Главная',
      'nav.login': 'Войти',
      'nav.signup': 'Регистрация',
      'nav.logout': 'Выйти',

      // Страница входа
      'login.title': 'Вход в чат',
      'login.subtitle': 'Введите свои данные для авторизации',
      'login.username': 'Имя пользователя',
      'login.usernamePlaceholder': 'Введите имя пользователя',
      'login.password': 'Пароль',
      'login.passwordPlaceholder': 'Введите пароль',
      'login.submit': 'Войти',
      'login.submitting': 'Вход...',
      'login.noAccount': 'Нет аккаунта?',
      'login.signupLink': 'Зарегистрироваться',
      'login.error.invalidCredentials': 'Неверное имя пользователя или пароль',
      'login.error.general': 'Ошибка авторизации. Попробуйте позже.',
      'login.validation.username.min': 'Имя пользователя должно содержать минимум 3 символа',
      'login.validation.username.max': 'Имя пользователя не должно превышать 20 символов',
      'login.validation.username.required': 'Имя пользователя обязательно',
      'login.validation.password.required': 'Пароль обязателен',

      // Страница регистрации
      'signup.title': 'Регистрация',
      'signup.subtitle': 'Создайте новый аккаунт для входа в чат',
      'signup.username': 'Имя пользователя',
      'signup.usernamePlaceholder': 'Введите имя пользователя',
      'signup.password': 'Пароль',
      'signup.passwordPlaceholder': 'Введите пароль',
      'signup.confirmPassword': 'Подтверждение пароля',
      'signup.confirmPasswordPlaceholder': 'Подтвердите пароль',
      'signup.submit': 'Зарегистрироваться',
      'signup.submitting': 'Регистрация...',
      'signup.hasAccount': 'Уже есть аккаунт?',
      'signup.loginLink': 'Войти',
      'signup.error.userExists': 'Пользователь с таким именем уже существует',
      'signup.error.validation': 'Ошибка валидации данных. Проверьте введенные данные.',
      'signup.error.general': 'Ошибка регистрации. Попробуйте позже.',
      'signup.validation.username.min': 'Имя пользователя должно содержать минимум 3 символа',
      'signup.validation.username.max': 'Имя пользователя не должно превышать 20 символов',
      'signup.validation.username.required': 'Имя пользователя обязательно',
      'signup.validation.password.min': 'Пароль должен содержать минимум 6 символов',
      'signup.validation.password.required': 'Пароль обязателен',
      'signup.validation.confirmPassword.match': 'Пароли должны совпадать',
      'signup.validation.confirmPassword.required': 'Подтверждение пароля обязательно',

      // Чат
      'chat.title': 'Hexlet Chat',
      'chat.placeholder': 'Введите сообщение...',
      'chat.send': 'Отправить',
      'chat.loading': 'Загрузка...',
      'chat.noMessages': 'Сообщений пока нет',
      'chat.error.loading': 'Ошибка загрузки сообщений',

      // Каналы
      'channels.title': 'Каналы',
      'channels.add': 'Добавить канал',
      'channels.rename': 'Переименовать канал',
      'channels.remove': 'Удалить канал',
      'channels.confirmRemove': 'Удалить канал "{{name}}"?',
      'channels.confirmRemoveText': 'Это действие нельзя отменить.',
      'channels.cancel': 'Отмена',
      'channels.confirm': 'Подтвердить',
      'channels.remove': 'Удалить',
      'channels.rename': 'Переименовать',
      'channels.add': 'Добавить',
      'channels.name': 'Имя канала',
      'channels.namePlaceholder': 'Введите имя канала',
      'channels.error.nameRequired': 'Имя канала обязательно',
      'channels.error.nameLength': 'Имя канала должно быть от 3 до 20 символов',
      'channels.error.nameUnique': 'Канал с таким именем уже существует',
      'channels.error.add': 'Ошибка создания канала',
      'channels.error.rename': 'Ошибка переименования канала',
      'channels.error.remove': 'Ошибка удаления канала',
      'channels.success.add': 'Канал создан',
      'channels.success.rename': 'Канал переименован',
      'channels.success.remove': 'Канал удален',

      // Сообщения
      'messages.title': 'Сообщения',
      'messages.placeholder': 'Введите сообщение...',
      'messages.send': 'Отправить',
      'messages.error.send': 'Ошибка отправки сообщения',

      // Статус соединения
      'connection.connected': 'Подключено',
      'connection.disconnected': 'Отключено',
      'connection.connecting': 'Подключение...',
      'connection.error': 'Ошибка соединения',

      // Общие
      'common.loading': 'Загрузка...',
      'common.error': 'Ошибка',
      'common.success': 'Успешно',
      'common.cancel': 'Отмена',
      'common.confirm': 'Подтвердить',
      'common.save': 'Сохранить',
      'common.delete': 'Удалить',
      'common.edit': 'Редактировать',
      'common.close': 'Закрыть',

      // Страница 404
      'notFound.title': 'Страница не найдена',
      'notFound.text': 'Запрашиваемая страница не существует',
      'notFound.back': 'Вернуться на главную',
    },
  },
};

// Конфигурация i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // дефолтная локаль - русский
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    react: {
      useSuspense: false, // Отключаем Suspense для совместимости
    },
  });

export default i18n; 