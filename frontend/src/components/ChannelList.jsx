import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import ChannelDropdown from './ChannelDropdown';
import './ChannelList.css';

const ChannelList = ({ channels = [], currentChannelId, onChannelSelect }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Проверяем, является ли канал системным (general или random)
  const isSystemChannel = (channelName) => {
    const result = channelName === 'general' || channelName === 'random';
    console.log(`🔍 Channel "${channelName}" isSystemChannel:`, result);
    return result;
  };

  // Дедуплицируем каналы по имени (для системных каналов берем первый)
  const uniqueChannels = channels.reduce((acc, channel) => {
    const normalizedName = channel.name.toLowerCase();
    
    // Для системных каналов берем только первый
    if (isSystemChannel(channel.name)) {
      if (!acc.has(normalizedName)) {
        acc.set(normalizedName, channel);
      }
    } else {
      // Для пользовательских каналов дедуплицируем по ID
      if (!acc.has(channel.id)) {
        acc.set(channel.id, channel);
      }
    }
    return acc;
  }, new Map()).values();

  const uniqueChannelsArray = Array.from(uniqueChannels);
  console.log('📋 All channels:', uniqueChannelsArray.map(c => c.name));

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setShowAddModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {uniqueChannelsArray.length === 0 ? (
          <li className="nav-item w-100 text-muted text-center">
            Нет доступных каналов
          </li>
        ) : (
          uniqueChannelsArray.map(channel => {
            const shouldShowDropdown = !isSystemChannel(channel.name);
            console.log(`🎯 Channel "${channel.name}" (ID: ${channel.id}): shouldShowDropdown = ${shouldShowDropdown}`);
            
            return (
              <li key={`${channel.id}-${channel.name}`} className="nav-item w-100">
                {shouldShowDropdown ? (
                  <div role="group" className="d-flex dropdown btn-group">
                    <Button
                      type="button"
                      className={`w-100 rounded-0 text-start text-truncate btn ${channel.id === currentChannelId ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => onChannelSelect(channel.id)}
                      aria-label={channel.name}
                    >
                      <span aria-hidden="true" className="me-1">#</span>
                      {channel.name}
                    </Button>
                    <ChannelDropdown 
                      channel={channel} 
                    />
                  </div>
                ) : (
                  <Button
                    type="button"
                    className={`w-100 rounded-0 text-start btn ${channel.id === currentChannelId ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => onChannelSelect(channel.id)}
                    aria-label={channel.name}
                  >
                    <span aria-hidden="true" className="me-1">#</span>
                    {channel.name}
                  </Button>
                )}
              </li>
            );
          })
        )}
      </ul>

      <AddChannelModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </>
  );
};

export default ChannelList; 