install:
	npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	npx @hexlet/chat-server -s ./frontend/dist -p $${PORT:-5001} 