import React, { useState } from 'react';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import ChannelDropdown from './ChannelDropdown';
import './ChannelList.css';

const ChannelList = ({ channels = [], currentChannelId, onChannelSelect }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [channelToRename, setChannelToRename] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [channelToRemove, setChannelToRemove] = useState(null);
  
  // Проверяем, является ли канал системным (general или random)
  const isSystemChannel = (channelName) => {
    return channelName === 'general' || channelName === 'random';
  };

  // Дедуплицируем каналы по имени (для системных каналов берем системный)
  const uniqueChannels = channels.reduce((acc, channel) => {
    const normalizedName = channel.name.toLowerCase();
    
    // Для системных каналов берем только системный (removable: false)
    if (isSystemChannel(channel.name)) {
      if (!acc.has(normalizedName)) {
        acc.set(normalizedName, channel);
      } else {
        // Если уже есть канал с таким именем, заменяем на системный
        const existingChannel = acc.get(normalizedName);
        if (channel.removable === false && existingChannel.removable !== false) {
          acc.set(normalizedName, channel);
        }
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

  // Обработчики для действий с каналами
  const handleRenameChannel = (channel) => {
    setChannelToRename(channel);
    setShowRenameModal(true);
  };

  const handleRemoveChannel = (channel) => {
    setChannelToRemove(channel);
    setShowRemoveModal(true);
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => setShowAddModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {uniqueChannelsArray.length === 0 ? (
          <li className="nav-item w-100 text-muted text-center">
            Нет доступных каналов
          </li>
        ) : (
          uniqueChannelsArray.map(channel => {
            const isSystem = isSystemChannel(channel.name);
            const isActive = channel.id === currentChannelId;
            
            // Отладка убрана, используем общий alert выше
    
            
            return (
              <li key={`${channel.id}-${channel.name}`} className="nav-item w-100">
{(() => {
                  if (isSystem) {
                    return (
                      <button
                        type="button"
                        className={`w-100 rounded-0 text-start btn ${isActive ? 'btn-secondary' : ''}`}
                        onClick={() => onChannelSelect(channel.id)}
                        name={channel.name}
                        aria-label={channel.name}
                        role="button"
                      >
                        {channel.name}
                      </button>
                    );
                  } else {
                    return (
                      <ChannelDropdown 
                        channel={channel}
                        isActive={isActive}
                        isRemovable={channel.removable !== false}
                        isRenamable={channel.removable !== false}
                        onSelect={onChannelSelect}
                        onRename={handleRenameChannel}
                        onRemove={handleRemoveChannel}
                      />
                    );
                  }
                })()}
              </li>
            );
          })
        )}
      </ul>

      <AddChannelModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />

      <RenameChannelModal
        show={showRenameModal}
        onHide={() => {
          setShowRenameModal(false);
          setChannelToRename(null);
        }}
        channel={channelToRename}
      />

      <RemoveChannelModal
        show={showRemoveModal}
        onHide={() => {
          setShowRemoveModal(false);
          setChannelToRemove(null);
        }}
        channel={channelToRemove}
      />
    </>
  );
};

export default ChannelList; 