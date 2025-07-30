import React from 'react';

function Channels({ channels = [], currentChannelId, onSelectChannel }) {
  console.log('Channels render:', channels);

  // Проверяем, что channels является массивом
  if (!Array.isArray(channels)) {
    console.warn('Channels: channels должен быть массивом');
    return null;
  }

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      role="list"
      aria-label="Список каналов"
    >
      {channels.length === 0 ? (
        <li className="nav-item w-100 text-muted text-center">
          Нет доступных каналов
        </li>
      ) : (
        channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                channel.id === currentChannelId ? 'btn-secondary' : 'btn-outline-secondary'
              }`}
              onClick={() => onSelectChannel(channel.id)}
              aria-label={`Канал ${channel.name}`}
              aria-pressed={channel.id === currentChannelId}
            >
              <span className="me-1" aria-hidden="true">#</span>
              {channel.name}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default Channels; 