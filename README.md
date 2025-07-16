# Chat Application

React chat application with backend server.

## Local Development

```bash
# Install dependencies
npm install

# Build frontend
make build

# Start server
make start
```

## Deployment on Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: chat-app
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

The application will be available at your Render URL.

## API Endpoints

- `GET /api/v1/channels` - Get channels (requires auth)
- `POST /api/v1/signup` - Register new user
- `POST /api/v1/login` - Login user
- `GET /api/v1/messages` - Get messages (requires auth)