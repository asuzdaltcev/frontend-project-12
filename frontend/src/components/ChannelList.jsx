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
              as="li"
              key={channel.id}
              className="d-flex align-items-center justify-content-between channel-item"
            >
              <div className="d-flex align-items-center flex-grow-1">
                <button
                  type="button"
                  name={channel.name}
                  className={`channel-name text-truncate btn btn-link p-0 m-0 text-start${channel.id === currentChannelId ? ' active' : ''}`}
                  onClick={() => onChannelSelect(channel.id)}
                  aria-current={channel.id === currentChannelId}
                  style={{ textDecoration: 'none' }}
                >
                  <span>#</span>
                  {channel.name}
                </button>
              </div>
              <div className="ms-2">
                <ChannelDropdown 
                  channel={channel} 
                  onClick={e => e.stopPropagation()}
                />
              </div>
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