import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChannelList = ({ channels, currentChannelId, onChannelSelect }) => {
  return (
    <ListGroup variant="flush" className="channel-list">
      {channels.map(channel => (
        <ListGroup.Item
          key={channel.id}
          action
          active={channel.id === currentChannelId}
          onClick={() => onChannelSelect(channel.id)}
          className="d-flex align-items-center"
        >
          <span className="channel-name"># {channel.name}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChannelList; 