import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import socketService from '../services/socketService';

// Асинхронное действие для получения каналов
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // Проверяем тип ошибки для более точного сообщения
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        return rejectWithValue('network_error');
      }
      return rejectWithValue(error.response?.data || 'Ошибка загрузки каналов');
    }
  }
);

// Асинхронное действие для добавления канала
export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (channelName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/v1/channels', 
        { name: channelName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        return rejectWithValue('network_error');
      }
      return rejectWithValue(error.response?.data || 'Ошибка добавления канала');
    }
  }
);

// Асинхронное действие для удаления канала
export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (channelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return channelId;
    } catch (error) {
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        return rejectWithValue('network_error');
      }
      return rejectWithValue(error.response?.data || 'Ошибка удаления канала');
    }
  }
);

// Асинхронное действие для переименования канала
export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`/api/v1/channels/${id}`, 
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        return rejectWithValue('network_error');
      }
      return rejectWithValue(error.response?.data || 'Ошибка переименования канала');
    }
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    loading: false,
    error: null,
    socketConnected: false,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannelOptimistic: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannelOptimistic: (state, action) => {
      state.channels = state.channels.filter(channel => channel.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
    renameChannelOptimistic: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find(ch => ch.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    // Обновление каналов через WebSocket
    updateChannelsFromSocket: (state, action) => {
      const updatedChannels = action.payload;
      state.channels = updatedChannels;
      
      // Если текущий канал был удален, переключаемся на первый доступный
      if (!state.channels.find(ch => ch.id === state.currentChannelId)) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
    // Обновляем статус WebSocket соединения
    setSocketStatus: (state, action) => {
      state.socketConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchChannels
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addChannel
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload);
        // Автоматически переключаемся на новый канал
        state.currentChannelId = action.payload.id;
      })
      // removeChannel
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(channel => channel.id !== action.payload);
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = state.channels[0]?.id || null;
        }
      })
      // renameChannel
      .addCase(renameChannel.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const channel = state.channels.find(ch => ch.id === id);
        if (channel) {
          channel.name = name;
        }
      });
  },
});

export const { 
  setCurrentChannel, 
  addChannelOptimistic, 
  removeChannelOptimistic, 
  renameChannelOptimistic,
  updateChannelsFromSocket,
  setSocketStatus
} = channelsSlice.actions;

export default channelsSlice.reducer; 