import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    sourcemap: true, // Включаем source maps для Rollbar
    rollupOptions: {
      external: ['crypto'],
      output: {
        // Разделяем бандл на чанки
        manualChunks: {
          // Вендорные библиотеки
          vendor: ['react', 'react-dom'],
          // Redux и связанные библиотеки
          redux: ['@reduxjs/toolkit', 'react-redux'],
          // Bootstrap и UI библиотеки
          ui: ['react-bootstrap', 'bootstrap'],
          // Роутинг
          router: ['react-router-dom'],
          // Интернационализация
          i18n: ['react-i18next', 'i18next'],
          // WebSocket
          socket: ['socket.io-client'],
          // HTTP клиент
          http: ['axios'],
          // Валидация
          validation: ['yup'],
        },
        // Оптимизация имен файлов
        chunkFileNames: () => {
          return `js/[name]-[hash].js`
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Увеличиваем лимит предупреждения о размере чанка
    chunkSizeWarningLimit: 1000,
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в продакшене
        drop_debugger: true,
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-bootstrap',
      'bootstrap',
      '@reduxjs/toolkit',
      'react-redux',
      'react-router-dom',
      'axios',
      'socket.io-client',
      'react-i18next',
      'i18next',
      'yup',
    ],
  },
})
