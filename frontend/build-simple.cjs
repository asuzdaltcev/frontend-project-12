const fs = require('fs');
const path = require('path');

// Создаем простой HTML файл
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App</title>
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #333;
        text-align: center;
      }
      .status {
        text-align: center;
        color: #666;
        margin: 20px 0;
      }
      .api-test {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Chat Application</h1>
      <div class="status">
        <p>✅ Frontend is running successfully!</p>
        <p>🚀 Backend server is available at /api/v1/*</p>
      </div>
      <div class="api-test">
        <h3>API Endpoints:</h3>
        <ul>
          <li><code>GET /api/v1/channels</code> - Get channels (requires auth)</li>
          <li><code>POST /api/v1/signup</code> - Register new user</li>
          <li><code>POST /api/v1/login</code> - Login user</li>
          <li><code>GET /api/v1/messages</code> - Get messages (requires auth)</li>
        </ul>
      </div>
    </div>
  </body>
</html>`;

// Создаем директорию dist если её нет
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Записываем HTML файл
fs.writeFileSync(path.join(distDir, 'index.html'), html);

// Копируем vite.svg если он существует
const viteSvgPath = path.join(__dirname, 'public', 'vite.svg');
if (fs.existsSync(viteSvgPath)) {
  fs.copyFileSync(viteSvgPath, path.join(distDir, 'vite.svg'));
}

console.log('✅ Simple build completed!');
console.log('📁 Files created in frontend/dist/'); 