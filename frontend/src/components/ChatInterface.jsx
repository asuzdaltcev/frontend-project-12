import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const ChatInterface = ({ channels, messages }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const currentChannel = channels.find(channel => channel.id === currentChannelId);

  // Фильтруем сообщения для текущего канала
  const currentMessages = messages.filter(message => message.channelId === currentChannelId);

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <Container fluid className="chat-interface">
      <Row>
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
              <MessageList messages={currentMessages} />
              <MessageForm channelId={currentChannelId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface; 