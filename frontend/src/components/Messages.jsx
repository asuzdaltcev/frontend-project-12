import { useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

const Messages = ({ messages = [], activeChannelId, channels = [] }) => {
  const messagesRef = useRef(null)

  // Мемоизируем отфильтрованные сообщения для текущего канала
  const channelMessages = useMemo(() => {
    if (!activeChannelId) return []
    // Приводим оба значения к строке для надежного сравнения
    const activeChannelIdStr = String(activeChannelId)
    const filtered = messages.filter(message => String(message.channelId) === activeChannelIdStr)
    return filtered
  }, [messages, activeChannelId])

  // Находим текущий канал
  const currentChannel = useMemo(() => {
    return channels.find(channel => String(channel.id) === String(activeChannelId))
  }, [channels, activeChannelId])

  useEffect(() => {
    messagesRef.current?.lastChild?.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessages])

  // Проверяем, что messages является массивом
  if (!Array.isArray(messages)) {
    console.warn('Messages: messages должен быть массивом')
    return (
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        <div className="text-muted text-center">Ошибка загрузки сообщений</div>
      </div>
    )
  }

  if (!currentChannel) {
    return (
      <div className="d-flex flex-column h-100">
        <div className="text-muted text-center py-4">
          Выберите канал для просмотра сообщений
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {currentChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {channelMessages.length}
          {' '}
          сообщений
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesRef}>
        {channelMessages.length === 0
          ? (
              <div className="text-muted text-center py-4">
                Нет сообщений в этом канале
              </div>
            )
          : (
              channelMessages.map(message => (
                <div className="text-break mb-2" key={message.id}>
                  <b>{message.username}</b>
                  :
                  {' '}
                  {message.body}
                </div>
              ))
            )}
      </div>
    </>
  )
}

Messages.propTypes = {
  messages: PropTypes.array,
  activeChannelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channels: PropTypes.array,
}

export default Messages
