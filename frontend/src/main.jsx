import './i18n.js' // Инициализация i18n должна быть первой
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import store from './store/index.js'
import rollbarConfig, { rollbarUtils } from './utils/rollbar.js'

// Генерируем уникальный ID сессии
if (!sessionStorage.getItem('sessionId')) {
  sessionStorage.setItem('sessionId', Math.random().toString(36).substring(2, 15))
}

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

// Экспортируем утилиты для использования в других компонентах
window.rollbarUtils = rollbarUtils
window.store = store
