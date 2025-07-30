import React, { useState, useRef, useEffect } from 'react';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const ChannelDropdown = ({ channel }) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log(`🔧 ChannelDropdown для канала "${channel.name}" (ID: ${channel.id})`);

  // Закрываем dropdown при клике вне его
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
    console.log(`🖱️ Клик по кнопке управления канала "${channel.name}"`);
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRenameClick = (e) => {
    console.log(`📝 Открываем модал переименования для канала "${channel.name}"`);
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setShowRenameModal(true);
  };

  const handleRemoveClick = (e) => {
    console.log(`🗑️ Открываем модал удаления для канала "${channel.name}"`);
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setShowRemoveModal(true);
  };

  return (
    <>
      <div className="dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          className="btn btn-secondary dropdown-toggle dropdown-toggle-split flex-grow-0"
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="Управление каналом"
        >
          <span className="visually-hidden">Управление каналом</span>
        </button>

        <ul 
          className={`dropdown-menu ${isOpen ? 'show' : ''}`}
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            zIndex: 1000,
            minWidth: '200px'
          }}
        >
          <li>
            <a
              className="dropdown-item d-flex align-items-center text-danger"
              href="#"
              role="button"
              tabIndex="0"
              onClick={handleRemoveClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRemoveClick(e);
                }
              }}
            >
              🗑️ Удалить
            </a>
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center"
              href="#"
              role="button"
              tabIndex="0"
              onClick={handleRenameClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRenameClick(e);
                }
              }}
            >
              ✏️ Переименовать
            </a>
          </li>
        </ul>
      </div>

      <RenameChannelModal
        show={showRenameModal}
        onHide={() => setShowRenameModal(false)}
        channel={channel}
      />

      <RemoveChannelModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        channel={channel}
      />
    </>
  );
};

export default ChannelDropdown; 