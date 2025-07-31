import React, { useState, useRef, useEffect } from 'react';

const ChannelDropdown = ({ 
  channel, 
  onRename, 
  onRemove, 
  isRemovable = true, 
  isRenamable = true, 
  isActive = false, 
  onSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRename = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRename(channel);
    setIsOpen(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(channel);
    setIsOpen(false);
  };

  const handleChannelSelect = (e) => {
    e.stopPropagation();
    onSelect && onSelect(channel.id);
  };

  return (
    <div className="d-flex dropdown btn-group w-100" ref={dropdownRef}>
      {/* Основная кнопка канала */}
      <button
        type="button"
        className={`flex-grow-1 rounded-0 text-start text-truncate btn ${
          isActive ? 'btn-secondary' : ''
        }`}
        onClick={handleChannelSelect}
        name={channel.name}
        aria-label={channel.name}
      >
        {channel.name}
      </button>
      
      {/* Кнопка выпадающего меню только если есть доступные действия */}
      {(isRemovable || isRenamable) && (
        <button
          type="button"
          className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="Управление каналом"
        >
          <span className="visually-hidden">Управление каналом</span>
        </button>
      )}
      
      {/* Выпадающее меню */}
      {isOpen && (isRemovable || isRenamable) && (
        <div className="dropdown-menu show">
          {isRenamable && (
            <button
              className="dropdown-item"
              type="button"
              onClick={handleRename}
            >
              Переименовать
            </button>
          )}
          {isRemovable && (
            <button
              className="dropdown-item text-danger"
              type="button"
              onClick={handleRemove}
            >
              Удалить
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelDropdown; 