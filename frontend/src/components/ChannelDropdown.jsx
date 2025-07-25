import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const ChannelDropdown = ({ channel }) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Проверяем, можно ли удалить канал (только вновь созданные)
  const canRemove = channel && !channel.removable === false; // По умолчанию разрешаем удаление

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle 
          as="div"
          variant="light" 
          size="sm"
          className="channel-dropdown-toggle"
        >
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Управление каналом
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={() => setShowRenameModal(true)}
            className="d-flex align-items-center"
          >
            ✏️ Переименовать
          </Dropdown.Item>
          
          {canRemove && (
            <Dropdown.Item 
              onClick={() => setShowRemoveModal(true)}
              className="d-flex align-items-center text-danger"
            >
              🗑️ Удалить
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

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