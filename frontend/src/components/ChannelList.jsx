import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import ChannelDropdown from './ChannelDropdown';

const ChannelList = ({ channels = [], currentChannelId, onChannelSelect }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
        <h6 className="mb-0">Каналы</h6>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="add-channel-btn"
        >
          +
        </Button>
      </div>
      
      <ListGroup variant="flush" className="channel-list">
        {channels.length === 0 ? (
          <ListGroup.Item className="text-muted text-center">
            Нет доступных каналов
          </ListGroup.Item>
        ) : (
          channels.map(channel => (
            <ListGroup.Item
              key={channel.id}
              action
              active={channel.id === currentChannelId}
              onClick={() => onChannelSelect(channel.id)}
              className="d-flex align-items-center justify-content-between channel-item"
            >
              <span className="channel-name text-truncate"># {channel.name}</span>
              <ChannelDropdown 
                channel={channel} 
                onClick={(e) => e.stopPropagation()}
              />
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      <AddChannelModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </>
  );
};

export default ChannelList; 