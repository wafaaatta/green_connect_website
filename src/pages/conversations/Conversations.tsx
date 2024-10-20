import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllConversations, pushConversation } from '../../redux/stores/conversation_store'
import { subscribeToChannel, unsubscribeFromChannel } from '../../services/pusher'
import PusherBroadcasts from '../../constants/pusher_broadcasts'
import Conversation from '../../interfaces/Conversation'
import ConversationList from './components/ConversationList'
import ChatArea from './components/ChatArea'
import SideMenu from './components/SideMenu'
import User from '../../interfaces/User'

export default function Component() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isConversationListOpen, setIsConversationListOpen] = useState(true)

  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector(state => state.conversation_store)
  const { user } = useAppSelector(state => state.auth_store)

  useEffect(() => {
    dispatch(getAllConversations())
  }, [dispatch])

  useEffect(() => {
    const channel = PusherBroadcasts.channels.conversations
    const event = PusherBroadcasts.events.conversations.created

    subscribeToChannel(channel, event, (data) => {
      dispatch(pushConversation(
        (data as { message: Conversation }).message
      ))
    })

    return () => unsubscribeFromChannel(channel)
  }, [dispatch])

  const isMobile = () => {
    return window.innerWidth < 768
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-112px)]">
      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        isOpen={isConversationListOpen}
        setIsOpen={setIsConversationListOpen}
        isMobile={isMobile}
      />
      <ChatArea
        selectedConversation={selectedConversation}
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
        isConversationListOpen={isConversationListOpen}
        setIsConversationListOpen={setIsConversationListOpen}
        isMobile={isMobile}
        user={user as User}
      />
      <SideMenu
        isOpen={isSideMenuOpen}
        setIsOpen={setIsSideMenuOpen}
        selectedConversation={selectedConversation}
        isMobile={isMobile}
      />
    </div>
  )
}