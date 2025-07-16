build:
	cd frontend && npm install && npm run build

start:
	npx @hexlet/chat-server -s ./frontend/dist -p $${PORT:-5001} 