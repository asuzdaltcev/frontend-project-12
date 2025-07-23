import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import WebSocketManager from './components/WebSocketManager';
import ConnectionStatus from './components/ConnectionStatus';
import I18nProvider from './components/I18nProvider';
import './App.css';

function App() {
  return (
    <I18nProvider>
      <Router>
        <div className="App">
          <Navigation />
          <WebSocketManager />
          <ConnectionStatus />
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </I18nProvider>
  );
}

export default App;
