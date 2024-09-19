import React from 'react'
import { motion } from 'framer-motion'
import { Send, Clock } from 'lucide-react'
import AppImages from '../constants/app_images'

const ChatRoomsPage = () => {
  const chatRooms = [
    {
      id: 1,
      senderName: 'Alice Green',
      postImage: AppImages.visuals.holder,
      lastMessage: 'Hi, I\'m interested in your Monstera Deliciosa cutting. Is it still available?',
      time: '10:30 AM'
    },
    {
      id: 2,
      senderName: 'Bob Plant',
      postImage: AppImages.visuals.holder,
      lastMessage: 'Thanks for the succulent propagation tips! They\'re really helpful.',
      time: 'Yesterday'
    },
    {
      id: 3,
      senderName: 'Charlie Bloom',
      postImage: AppImages.visuals.holder,
      lastMessage: 'I\'d love to exchange some cuttings from my tropical plants. What do you have available?',
      time: '2 days ago'
    }
  ]

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex">
        
      <div className="bg-white rounded-md shadow-md overflow-hidden mr-4 h-[520px]">
        <div className="divide-y divide-gray-200">
          {chatRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img src={room.postImage} alt="Post" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{room.senderName}</h2>
                  <p className="text-gray-600 truncate">{room.lastMessage}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {room.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md p-4 flex-grow h-[520px]">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Active Chat</h2>
        <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
          {/* Chat messages would go here */}
          <div className="text-center text-gray-500">Select a chat to start messaging</div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded-r-md hover:bg-green-900 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoomsPage