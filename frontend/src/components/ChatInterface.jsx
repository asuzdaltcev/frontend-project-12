import { useSelector, useDispatch } from 'react-redux'
import { setCurrentChannel } from '../slices/channelsSlice'
import ChannelList from './ChannelList'
import Messages from './Messages'
import MessageForm from './MessageForm'

const ChatInterface = ({ channels, messages }) => {
  const dispatch = useDispatch()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = channels.find(channel => channel.id === currentChannelId)

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId))
  }

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <ChannelList
          channels={channels}
          currentChannelId={currentChannelId}
          onChannelSelect={handleChannelSelect}
        />
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <Messages messages={messages} activeChannelId={currentChannelId} channels={channels} />
          <div className="mt-auto px-5 py-3">
            <MessageForm channelId={currentChannelId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatInterface
