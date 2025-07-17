import React from 'react';
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
    <div className="chat-interface">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Каналы</h3>
        </div>
        <ChannelList 
          channels={channels} 
          currentChannelId={currentChannelId}
          onChannelSelect={handleChannelSelect}
        />
      </div>
      
      <div className="chat-main">
        <div className="chat-header">
          <h2>{currentChannel ? `# ${currentChannel.name}` : 'Выберите канал'}</h2>
        </div>
        
        <div className="chat-content">
          <MessageList messages={currentMessages} />
          <MessageForm channelId={currentChannelId} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 