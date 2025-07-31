import { Row, Col, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentChannel } from '../slices/channelsSlice'
import ChannelList from './ChannelList'
import Messages from './Messages'
import MessageForm from './MessageForm'

const ChatInterface = ({ channels, messages }) => {
  const dispatch = useDispatch()
  const currentChannelId = useSelector((state) => state.channels.currentChannelId)
  const currentChannel = channels.find((channel) => channel.id === currentChannelId)

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId))
  }

  return (
    <div className="chat-interface w-100 h-100">
      <Row className="h-100">
        <Col md={3} className="chat-sidebar p-0">
          <Card className="h-100 rounded-0 border-end">
            <Card.Header className="sidebar-header bg-white">
              <h3 className="mb-0 fs-5">Каналы</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <ChannelList
                channels={channels}
                currentChannelId={currentChannelId}
                onChannelSelect={handleChannelSelect}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} className="chat-main p-0">
          <Card className="h-100 rounded-0">
            <Card.Header className="chat-header bg-white">
              <h2 className="mb-0 fs-5">{currentChannel ? `# ${currentChannel.name}` : 'Выберите канал'}</h2>
            </Card.Header>
            <Card.Body className="chat-content d-flex flex-column p-0">
              <Messages messages={messages} activeChannelId={currentChannelId} channels={channels} />
              <MessageForm channelId={currentChannelId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChatInterface 