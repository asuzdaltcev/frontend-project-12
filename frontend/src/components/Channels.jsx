import PropTypes from 'prop-types'
// Оптимизированные импорты Bootstrap
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function Channels({
  channels = [],
  currentChannel,
  onSelectChannel,
  onChannelDropdown,
  t,
}) {
  // Проверяем, что channels является массивом
  if (!Array.isArray(channels)) {
    console.warn('Channels: channels должен быть массивом')
    return null
  }

  const handleClick = (channel) => {
    onSelectChannel(channel)
  }

  return (
    <Nav
      id="channels-box"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      as="ul"
    >
      {channels.length === 0
        ? (
            <Nav.Item className="w-100 text-muted text-center" as="li">
              Нет доступных каналов
            </Nav.Item>
          )
        : (
            channels.map(channel => (
              <Nav.Item className="w-100" as="li" key={channel.id}>
                {channel.removable
                  ? (
                      <Dropdown as={ButtonGroup} className="d-flex">
                        <Button
                          type="button"
                          variant={
                            channel.id === currentChannel?.id ? 'secondary' : 'light'
                          }
                          className="w-100 rounded-0 text-start text-truncate"
                          onClick={() => handleClick(channel)}
                          aria-label={channel.name}
                        >
                          <span className="me-1"># </span>
                          {channel.name}
                        </Button>

                        <Dropdown.Toggle
                          split
                          id={`dropdown-split-${channel.id}`}
                          variant={
                            channel.id === currentChannel?.id ? 'secondary' : 'light'
                          }
                        >
                          <span className="visually-hidden">
                            {t ? t('mainPage.controlChannel') : 'Управление каналом'}
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            as="button"
                            onClick={() => onChannelDropdown(channel, 'removeChannel')}
                          >
                            {t ? t('mainPage.delete') : 'Удалить'}
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            onClick={() => onChannelDropdown(channel, 'renameChannel')}
                          >
                            {t ? t('mainPage.rename') : 'Переименовать'}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                  : (
                      <Button
                        onClick={() => handleClick(channel)}
                        type="button"
                        variant={channel.id === currentChannel?.id ? 'secondary' : 'light'}
                        className="w-100 rounded-0 text-start"
                      >
                        <span className="me-1"># </span>
                        {channel.name}
                      </Button>
                    )}
              </Nav.Item>
            ))
          )}
    </Nav>
  )
}

Channels.propTypes = {
  channels: PropTypes.array.isRequired,
  currentChannel: PropTypes.object,
  onSelectChannel: PropTypes.func.isRequired,
  onChannelDropdown: PropTypes.func.isRequired,
  t: PropTypes.func,
}

Channels.defaultProps = {
  channels: [],
  currentChannel: null,
  t: null,
}

export default Channels
