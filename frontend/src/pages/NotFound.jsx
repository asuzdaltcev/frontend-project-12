import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>К сожалению, запрашиваемая страница не существует.</p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Вернуться на главную
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Войти в чат
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 