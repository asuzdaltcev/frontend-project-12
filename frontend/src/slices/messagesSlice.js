import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронное действие для получения сообщений
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки сообщений');
    }
  }
);

// Асинхронное действие для добавления сообщения
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ body, channelId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await axios.post('/api/v1/messages', 
        { body, channelId, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка отправки сообщения');
    }
  }
);

// Асинхронное действие для редактирования сообщения
export const editMessage = createAsyncThunk(
  'messages/editMessage',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`/api/v1/messages/${id}`, 
        { body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка редактирования сообщения');
    }
  }
);

// Асинхронное действие для удаления сообщения
export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return messageId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка удаления сообщения');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessageOptimistic: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessageOptimistic: (state, action) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
    editMessageOptimistic: (state, action) => {
      const { id, body } = action.payload;
      const message = state.messages.find(msg => msg.id === id);
      if (message) {
        message.body = body;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addMessage
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      // editMessage
      .addCase(editMessage.fulfilled, (state, action) => {
        const { id, body } = action.payload;
        const message = state.messages.find(msg => msg.id === id);
        if (message) {
          message.body = body;
        }
      })
      // removeMessage
      .addCase(removeMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(message => message.id !== action.payload);
      });
  },
});

export const { 
  addMessageOptimistic, 
  removeMessageOptimistic, 
  editMessageOptimistic 
} = messagesSlice.actions;

export default messagesSlice.reducer; 