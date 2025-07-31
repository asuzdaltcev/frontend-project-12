import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addMessageFromSocket, setSocketStatus } from '../slices/messagesSlice'
import {
  updateChannelsFromSocket,
  addChannelFromSocket,
  removeChannelFromSocket,
  renameChannelFromSocket,
  setSocketStatus as setChannelSocketStatus,
} from '../slices/channelsSlice'
import socketService from '../services/socketService'

const WebSocketManager = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    // Подключаемся к WebSocket
    const socket = socketService.connect(token)

    // Обработчик новых сообщений - обновляем состояние React
    const handleNewMessage = (message) => {
      dispatch(addMessageFromSocket(message))
    }

    // Обработчик обновлений каналов
    const handleChannelUpdate = (channels) => {
      dispatch(updateChannelsFromSocket(channels))
    }

    // Обработчик нового канала
    const handleNewChannel = (channel) => {
      dispatch(addChannelFromSocket(channel))
    }

    // Обработчик удаления канала
    const handleRemoveChannel = (channelId) => {
      dispatch(removeChannelFromSocket(channelId))
    }

    // Обработчик переименования канала
    const handleRenameChannel = (channelData) => {
      dispatch(renameChannelFromSocket(channelData))
    }

    // Подписываемся на события
    socketService.onNewMessage(handleNewMessage)
    socketService.onChannelUpdate(handleChannelUpdate)
    socketService.onNewChannel(handleNewChannel)
    socketService.onRemoveChannel(handleRemoveChannel)
    socketService.onRenameChannel(handleRenameChannel)

    // Обработчики событий соединения
    const handleConnect = () => {
      dispatch(setSocketStatus(true))
      dispatch(setChannelSocketStatus(true))
    }

    const handleDisconnect = () => {
      dispatch(setSocketStatus(false))
      dispatch(setChannelSocketStatus(false))
    }

    const handleReconnect = () => {
      // Переподключение обработано автоматически
    }

    // Обновляем статус при подключении/отключении
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('reconnect', handleReconnect)

    // Очистка при размонтировании
    return () => {
      socketService.off('newMessage', handleNewMessage)
      socketService.off('channelUpdate', handleChannelUpdate)
      socketService.off('newChannel', handleNewChannel)
      socketService.off('removeChannel', handleRemoveChannel)
      socketService.off('renameChannel', handleRenameChannel)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('reconnect', handleReconnect)
    }
  }, [dispatch])

  // Компонент не рендерит ничего видимого
  return null
}

export default WebSocketManager
