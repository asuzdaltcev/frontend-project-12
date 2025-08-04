import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import WebSocketManager from './components/WebSocketManager'
import ConnectionStatus from './components/ConnectionStatus'
import I18nProvider from './components/I18nProvider'
import NotificationManager from './components/NotificationManager'
import { Spinner } from 'react-bootstrap'
import './App.css'

// Lazy loading для страниц
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

// Компонент загрузки
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </div>
)

function App() {
  return (
    <I18nProvider>
      <Router>
        <div className="h-100 bg-light">
          <div className="h-100">
            <div className="h-100" id="chat">
              <div className="d-flex flex-column h-100">
                <Navigation />
                <WebSocketManager />
                <ConnectionStatus />
                <NotificationManager />
                <main className="container h-100 my-4 overflow-hidden rounded shadow">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route
                        path="/"
                        element={(
                          <PrivateRoute>
                            <Home />
                          </PrivateRoute>
                        )}
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </I18nProvider>
  )
}

export default App
