import React from 'react';

const ChannelList = ({ channels, currentChannelId, onChannelSelect }) => {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div
          key={channel.id}
          className={`channel-item ${channel.id === currentChannelId ? 'active' : ''}`}
          onClick={() => onChannelSelect(channel.id)}
        >
          <span className="channel-name"># {channel.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChannelList; 