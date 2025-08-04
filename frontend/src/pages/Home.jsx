import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannels, setCurrentChannel } from '../slices/channelsSlice'
import { fetchMessages } from '../slices/messagesSlice'
import ChatInterface from '../components/ChatInterface'
import { useNotifications } from '../components/NotificationManager'
import { Container, Alert, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { showNetworkError, showLoadingError } = useNotifications()
  const { channels, currentChannelId, loading: channelsLoading, error: channelsError } = useSelector(state => state.channels)
  const { messages, loading: messagesLoading, error: messagesError } = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  // Обработка ошибок загрузки данных
  useEffect(() => {
    if (channelsError) {
      if (channelsError === 'network_error') {
        showNetworkError()
      }
      else {
        showLoadingError()
      }
    }
  }, [channelsError, showNetworkError, showLoadingError])

  useEffect(() => {
    if (messagesError) {
      if (messagesError === 'network_error') {
        showNetworkError()
      }
      else {
        showLoadingError()
      }
    }
  }, [messagesError, showNetworkError, showLoadingError])

  // Автоматически выбираем канал по умолчанию при загрузке
  useEffect(() => {
    // Выбираем канал только если он еще не выбран И каналы загружены
    if (channels.length > 0 && !currentChannelId) {
      // Сначала ищем канал general
      const generalChannel = channels.find(channel =>
        channel.name.toLowerCase() === 'general',
      )
      if (generalChannel) {
        dispatch(setCurrentChannel(generalChannel.id))
      }
      else {
        // Если канала general нет, выбираем первый доступный
        dispatch(setCurrentChannel(channels[0].id))
      }
    }
  }, [channels, currentChannelId, dispatch])

  if (channelsLoading || messagesLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('common.loading')}</span>
        </Spinner>
      </Container>
    )
  }

  if (channelsError || messagesError) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>{t('common.error')}</h4>
          <div>{t('notifications.error.loading')}</div>
          <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>
            {t('common.loading')}
          </button>
        </Alert>
      </Container>
    )
  }

  return (
    <div className="row h-100 bg-white flex-md-row">
      <ChatInterface channels={channels} messages={messages} />
    </div>
  )
}

export default Home
