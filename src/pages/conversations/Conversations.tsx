import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, Paperclip, MapPin, Calendar, Heart, Flag, X, Copy, Reply, Trash, Menu } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllConversations } from '../../redux/stores/conversation_store'
import axiosHttp from '../../utils/axios_client'
import ApiError from '../../interfaces/ApiError'
import { AxiosError } from 'axios'



const initialMessages = [
  { id: 1, sender: 'You', content: 'Hi Alice, I\'m interested in your Monstera Deliciosa. Is it still available?', timestamp: '2023-06-20T14:30:00Z' },
  { id: 2, sender: 'Alice Green', content: 'Hello! Yes, it\'s still available. Would you like to come see it?', timestamp: '2023-06-20T14:35:00Z' },
  { id: 3, sender: 'You', content: 'That would be great! When would be a good time?', timestamp: '2023-06-20T14:40:00Z' },
  { id: 4, sender: 'Alice Green', content: 'How about tomorrow afternoon around 3 PM?', timestamp: '2023-06-20T14:45:00Z' },
  { id: 5, sender: 'You', content: 'Perfect! I\'ll be there. Can you send me a picture of the plant\'s current condition?', timestamp: '2023-06-20T14:50:00Z' },
  { id: 6, sender: 'Alice Green', content: 'Of course! Here\'s a recent photo:', timestamp: '2023-06-20T14:55:00Z', image: '/src/assets/images/plants/string-of-pearls.png' },
  { id: 7, sender: 'You', content: 'Wow, it looks beautiful! I\'m excited to see it in person.', timestamp: '2023-06-20T15:00:00Z' },
]

const ConversationsPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isConversationListOpen, setIsConversationListOpen] = useState(true)
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null })
  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)

  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector(state => state.conversation_store)

  useEffect(() => {
    dispatch(
        getAllConversations()
    )
  }, [dispatch])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY"
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        timestamp: new Date().toISOString(),
        replyTo: replyTo,
      }
      setMessages([...messages, newMessage])
      setMessage('')
      setReplyTo(null)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    if (file) {
      console.log('Uploading file:', file.name)
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
      if (contextMenu.visible && !event.target.closest('.context-menu')) {
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
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  }


  const loadConversationMessages = async (conversation) => {
    setSelectedConversation(conversation)
    setMessages([])
    try{
        const response = await axiosHttp.get(`/conversations/${conversation.id}/messages`)
        console.log(response.data);
        setMessages(response.data)
        
    }catch(error){
      throw ApiError.from(error as AxiosError)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
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
                className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-green-50' : ''}`}
                onClick={() => loadConversationMessages(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <img src={'/src/assets/images/plants/aloe-vera.png'} alt={'plant'} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold text-green-700">{'conversation.plantName'}</h2>
                    <p className="text-xs text-gray-600">with {'conversation.ownerName'}</p>
                    <p className="text-xs text-gray-800 mt-1 truncate">{'conversation.lastMessage'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date('conversation.lastMessageDate').toLocaleString()}</p>
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
                <button
                  onClick={() => setIsConversationListOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <img src={selectedConversation.plantImage} alt={selectedConversation.plantName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h2 className="text-lg font-semibold text-green-800">{selectedConversation.plantName}</h2>
                  <p className="text-sm text-gray-600">with {selectedConversation.ownerName}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {isSideMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
              </button>
            </div>
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto custom-scroll p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  onContextMenu={(e) => handleContextMenu(e, msg.id)}
                >
                  <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'You' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {msg.replyTo && (
                      <div className="bg-gray-200 p-2 rounded mb-2 text-xs">
                        <p className="font-semibold">{msg.replyTo.sender}</p>
                        <p>{msg.replyTo.content}</p>
                      </div>
                    )}
                    <p className="font-semibold text-sm">{msg.sender}</p>
                    {msg.image ? (
                      <img src={msg.image} alt="Plant" className="w-full h-auto rounded-lg mt-2 mb-2" />
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200 flex flex-col space-y-2">
              {replyTo && (
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <div className="flex items-center">
                    <Reply size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm text-gray-600">{replyTo.content}</span>
                  </div>
                  <button onClick={() => setReplyTo(null)} className="text-gray-600 hover:text-gray-800">
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  ref={inputRef}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Paperclip size={20} className="text-gray-500 hover:text-green-600" />
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <button type="submit" className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <img src="/src/assets/images/plants/default-plant.png" alt="Default Plant" className="w-32 h-32 mx-auto mb-4" />
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
                <button
                  onClick={() => setIsSideMenuOpen(false)}
                  className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
              )}
              <h3 className="text-lg font-semibold mb-4 text-center">Plant Details</h3>
              <img src={selectedConversation.plantImage} alt={selectedConversation.plantName} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="font-semibold text-center">{selectedConversation.plantName}</h4>
              <p className="text-sm text-gray-600 mb-4 text-center">Owner: {selectedConversation.ownerName}</p>
              <div className="mb-4 h-48 rounded-lg overflow-hidden">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={10}
                  >
                    <Marker position={{ lat: 40.7128, lng: -74.0060 }} />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p>Loading map...</p>
                  </div>
                )}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">New York, NY</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-green-600" />
                  <span className="text-sm">Posted on June 15, 2023</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-300 flex items-center justify-center">
                  <Heart size={16} className="mr-2" /> Add to Favorites
                </button>
                <button className="w-full bg-white text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors duration-300 flex items-center justify-center">
                  <Flag size={16} className="mr-2" /> Report Listing
                </button>
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