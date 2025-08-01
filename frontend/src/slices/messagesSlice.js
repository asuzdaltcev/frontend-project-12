import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import socketService from '../services/socketService'
import profanityFilter from '../utils/profanityFilter'

// Асинхронное действие для получения сообщений
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Фильтруем нецензурные слова в полученных сообщениях
      const filteredMessages = response.data.map(message => ({
        ...message,
        body: profanityFilter.clean(message.body),
      }))

      return filteredMessages
    }
    catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки сообщений')
    }
  },
)

// Асинхронное действие для добавления сообщения через WebSocket
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ body, channelId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')

      if (!token || !username) {
        return rejectWithValue('Не авторизован')
      }

      // Используем HTTP API как основной способ (надежнее)
      const response = await axios.post('/api/v1/messages',
        { body, channelId, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    }
    catch (error) {
      // Если HTTP не работает, пробуем WebSocket как fallback
      try {
        if (!socketService.getConnectionStatus()) {
          socketService.connect(localStorage.getItem('token'))
        }

        const message = {
          body,
          channelId,
          username: localStorage.getItem('username'),
        }

        const response = await socketService.sendMessage(message)
        return response
      }
      catch {
        return rejectWithValue(error.response?.data || 'Ошибка отправки сообщения')
      }
    }
  },
)

// Асинхронное действие для редактирования сообщения
export const editMessage = createAsyncThunk(
  'messages/editMessage',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.patch(`/api/v1/messages/${id}`,
        { body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка редактирования сообщения')
    }
  },
)

// Асинхронное действие для удаления сообщения
export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/v1/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return messageId
    }
    catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка удаления сообщения')
    }
  },
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
    socketConnected: false,
  },
  reducers: {
    addMessageOptimistic: (state, action) => {
      state.messages.push(action.payload)
    },
    removeMessageOptimistic: (state, action) => {
      state.messages = state.messages.filter(message => message.id !== action.payload)
    },
    editMessageOptimistic: (state, action) => {
      const { id, body } = action.payload
      const message = state.messages.find(msg => msg.id === id)
      if (message) {
        message.body = body
      }
    },
    // Добавляем сообщение через WebSocket
    addMessageFromSocket: (state, action) => {
      const newMessage = action.payload

      // Проверяем дублирование по ID или по содержимому + пользователю + каналу
      const exists = state.messages.find(msg =>
        msg.id === newMessage.id
        || (msg.body === newMessage.body
          && msg.username === newMessage.username
          && msg.channelId === newMessage.channelId
          // Проверяем что сообщения были отправлены примерно в одно время (в пределах 5 секунд)
          && Math.abs(new Date(msg.createdAt || Date.now()).getTime() - new Date(newMessage.createdAt || Date.now()).getTime()) < 5000),
      )

      if (!exists) {
        // Фильтруем нецензурные слова в сообщении
        const filteredMessage = {
          ...newMessage,
          body: profanityFilter.clean(newMessage.body),
        }
        state.messages.push(filteredMessage)
      }
    },
    // Обновляем статус WebSocket соединения
    setSocketStatus: (state, action) => {
      state.socketConnected = action.payload
    },
    // Удаляем все сообщения канала
    removeChannelMessages: (state, action) => {
      const channelId = action.payload
      state.messages = state.messages.filter(message => message.channelId !== channelId)
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // addMessage
      .addCase(addMessage.fulfilled, (state, action) => {
        const newMessage = action.payload

        // Проверяем, нет ли уже такого сообщения (может прийти через WebSocket быстрее)
        const exists = state.messages.find(msg =>
          msg.id === newMessage.id
          || (msg.body === newMessage.body
            && msg.username === newMessage.username
            && msg.channelId === newMessage.channelId
            // Проверяем что сообщения были отправлены недавно (в пределах 5 секунд)
            && Math.abs(new Date(msg.createdAt || Date.now()).getTime() - new Date(newMessage.createdAt || Date.now()).getTime()) < 5000),
        )

        if (!exists) {
          // Фильтруем нецензурные слова в сообщении
          const filteredMessage = {
            ...newMessage,
            body: profanityFilter.clean(newMessage.body),
          }
          state.messages.push(filteredMessage)
        }
      })
      // editMessage
      .addCase(editMessage.fulfilled, (state, action) => {
        const { id, body } = action.payload
        const message = state.messages.find(msg => msg.id === id)
        if (message) {
          // Фильтруем нецензурные слова при редактировании
          message.body = profanityFilter.clean(body)
        }
      })
      // removeMessage
      .addCase(removeMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(message => message.id !== action.payload)
      })
  },
})

export const {
  addMessageOptimistic,
  removeMessageOptimistic,
  editMessageOptimistic,
  addMessageFromSocket,
  setSocketStatus,
  removeChannelMessages,
} = messagesSlice.actions

export default messagesSlice.reducer
