import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1>Добро пожаловать в чат!</h1>
        <p>Для участия в чате необходимо авторизоваться.</p>
        <div className="features">
          <div className="feature">
            <h3>💬 Общение</h3>
            <p>Общайтесь в реальном времени с другими пользователями</p>
          </div>
          <div className="feature">
            <h3>📝 Сообщения</h3>
            <p>Отправляйте и получайте сообщения в различных каналах</p>
          </div>
          <div className="feature">
            <h3>🔐 Безопасность</h3>
            <p>Ваши данные защищены современными методами шифрования</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 