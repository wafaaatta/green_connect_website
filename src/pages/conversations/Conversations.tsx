import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, MapPin, Calendar, X, Copy, Reply, Trash, Menu, SignpostIcon, Image as ImageIcon, Text } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllConversations } from '../../redux/stores/conversation_store'
import axiosHttp from '../../utils/axios_client'
import ApiError from '../../interfaces/ApiError'
import { AxiosError } from 'axios'
import { subscribeToChannel, unsubscribeFromChannel } from '../../services/pusher'
import PusherBroadcasts from '../../constants/pusher_broadcasts'
import { getFileUrl } from '../../utils/laravel_storage'
import Conversation from '../../interfaces/Conversation'
import moment from 'moment'
import Message from '../../interfaces/Message'
import ContactMap from '../Posts/ContactMap'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { IconType } from 'react-icons'

const ConversationsPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isConversationListOpen, setIsConversationListOpen] = useState(true)
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean
    x: number
    y: number
    messageId: number | null
  }>({ visible: false, x: 0, y: 0, messageId: 0 })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector(state => state.conversation_store)
  const { user } = useAppSelector(state => state.auth_store)

  useEffect(() => {
    dispatch(getAllConversations())
  }, [dispatch])

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedConversation) return

    try {
      const formData = new FormData()
      formData.append('conversation_id', selectedConversation.id.toString())
      formData.append('content', message)
      formData.append('type', uploadedImage ? 'image' : 'text')

      if (uploadedImage) {
        formData.append('image', uploadedImage as File)
      }

      await axiosHttp.post(`messages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setMessage('')
      setImagePreview(null)
      inputRef.current?.focus()
    } catch (error) {
      console.error(ApiError.from(error as AxiosError))
    }
  }

  useEffect(() => {
    const channel = PusherBroadcasts.channels.message_creation
    const event = PusherBroadcasts.events.messages.created

    subscribeToChannel(channel, event, (data) => {
      console.log(data);
      
      if ((data as { message: Message }).message.conversation_id == selectedConversation?.id) {
        setMessages(prevMessages => [...prevMessages, (data as { message: Message }).message])
      }
    })

    return () => {
      unsubscribeFromChannel(channel)
    }
  }, [selectedConversation])


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContextMenu = (e: React.MouseEvent, messageId: number) => {
    e.preventDefault()
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, messageId })
  }

  const handleContextMenuAction = (action: string) => {
    const targetMessage = messages.find(msg => msg.id === contextMenu.messageId)
    if (!targetMessage) return

    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(targetMessage.content)
        break
      case 'reply':
        setReplyTo(targetMessage)
        inputRef.current?.focus()
        break
      case 'delete':
        setMessages(messages.filter(msg => msg.id !== contextMenu.messageId))
        break
    }
    setContextMenu({ ...contextMenu, visible: false })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu.visible && !(event.target as Element).closest('.context-menu')) {
        setContextMenu({ ...contextMenu, visible: false })
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const isMobile = () => {
    return window.innerWidth < 768
  }

  useEffect(() => {
    const channel = PusherBroadcasts.channels.conversations
    const event = PusherBroadcasts.events.conversations.created

    subscribeToChannel(channel, event, () => {
      dispatch(getAllConversations())
    })

    return () => unsubscribeFromChannel(channel)
  }, [dispatch])

  const loadConversationMessages = async (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setMessages([])
    try {
      const response = await axiosHttp.get(`/conversations/${conversation.id}/messages`)
      setMessages(response.data)
    } catch (error) {
      console.error(ApiError.from(error as AxiosError))
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-112px)] bg-gray-100">
      {/* Conversation list */}
      <AnimatePresence>
        {(isConversationListOpen || !isMobile()) && (
          <motion.div
            initial={{ x: isMobile() ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile() ? -300 : 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0"
          >
            <h1 className="text-xl font-bold text-green-800 p-4 border-b border-gray-200">Your Conversations</h1>
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-green-50' : ''}`}
                onClick={() => loadConversationMessages(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <img src={getFileUrl(conversation.announce?.image)} alt={conversation.announce?.title} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold text-green-700">{conversation.announce?.title}</h2>
                    <p className="text-xs text-gray-600">with {user?.id === conversation.receiver?.id ? conversation.creator?.name : conversation.receiver?.name}</p>
                    <p className="text-sm text-gray-800 mt-1 truncate">{conversation.last_message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{conversation.last_sent_at && moment(conversation.last_sent_at).fromNow()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat area */}
      <div className="flex-grow flex flex-col">
        {selectedConversation ? (
          <>
            <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
              {isMobile() && (
                <Button
                  variant="ghost"
                  onClick={() => setIsConversationListOpen(true)}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <img src={getFileUrl(selectedConversation.announce.image)} alt={selectedConversation.announce.title} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h2 className="text-lg font-semibold text-green-800">{selectedConversation.announce.title}</h2>
                  <p className="text-sm text-gray-600">with {user?.id == selectedConversation.creator.id ? selectedConversation.receiver.name : selectedConversation.creator.name}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              >
                {isSideMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg: Message) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender_id != user?.id ? 'justify-end' : 'justify-start'}`}
                  onContextMenu={(e) => handleContextMenu(e, msg.id)}
                >
                  <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender_id == user?.id ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {msg.reply_message && (
                      <div className="bg-gray-200 p-2 rounded mb-2 text-xs">
                        <p className="font-semibold">{msg.reply_message.sender_id == selectedConversation.creator.id ? selectedConversation.creator.name : selectedConversation.receiver.name}</p>
                        <p>{msg.reply_message.content}</p>
                      </div>
                    )}
                    <p className="font-semibold text-sm">{msg.sender_id == user?.id ? 'You' : msg.sender_id == selectedConversation.creator.id ? selectedConversation.creator.name : selectedConversation.receiver.name}</p>
                    {msg.message_type == 'image' ? (
                      <img src={getFileUrl(msg.image_url ?? '')} alt="Uploaded" className="w-full h-auto rounded-lg mt-2 mb-2" />
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{moment(msg.created_at).format('hh:mm A')}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-gray-200">
              {replyTo && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                  <div className="flex items-center">
                    <Reply size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm text-gray-600">{replyTo.content}</span>
                  </div>
                  <Button variant="ghost" onClick={() => setReplyTo(null)}>
                    <X size={16} />
                  </Button>
                </div>
              )}
              {imagePreview && (
                <div className="relative mb-2">
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  <Button
                    variant="outline"
                    className="absolute top-0 right-0"
                    onClick={() => setImagePreview(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-2 w-full">
                <div className="w-full">
                <Input
                icon={Text as IconType}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                </div>
                  <Button
                    variant="outline"
                    size='md'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon size={20} />
                  </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button type="submit" size='md'>
                  <Send size={20} />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <img src="/src/assets/green_connect.png" alt="Default Plant" className=" h-32 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No conversation selected</h2>
              <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Side menu */}
      <AnimatePresence>
        {isSideMenuOpen && selectedConversation && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile() ? '100%' : '320px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 bg-white border-l border-gray-200 overflow-hidden md:relative md:w-80 flex-shrink-0"
          >
            <div className="p-4 overflow-y-auto h-full">
              {isMobile() && (
                <Button
                  variant="ghost"
                  className="absolute top-4 left-4"
                  onClick={() => setIsSideMenuOpen(false)}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              <h3 className="text-lg font-semibold mb-4 text-center">Plant Details</h3>
              <img src={getFileUrl(selectedConversation.announce.image)} alt={selectedConversation.announce.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="font-semibold text-center">{selectedConversation.announce.title}</h4>
              <p className="text-sm text-gray-600 mb-4 text-center">Owner: {selectedConversation.receiver.name}</p>
              <div className="mb-4 h-48 rounded-lg overflow-hidden">
                <ContactMap 
                  city={'paris'}
                  country={'france'}
                />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">{selectedConversation.announce.city}, {selectedConversation.announce.country}</span>
                </div>
                <div className="flex items-center">
                  <SignpostIcon size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">{selectedConversation.announce.postal_code}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">{moment(selectedConversation.announce.created_at).format('DD MMM YYYY')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context menu */}
      {contextMenu.visible && (
        <div
          className="fixed bg-white rounded-lg shadow-lg z-50 context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleContextMenuAction('copy')}>
              <Copy size={16} className="mr-2" /> Copy
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleContextMenuAction('reply')}>
              <Reply size={16} className="mr-2" /> Reply
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-red-600" onClick={() => handleContextMenuAction('delete')}>
              <Trash size={16} className="mr-2" /> Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ConversationsPage