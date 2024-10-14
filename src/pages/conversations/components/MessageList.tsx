import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import User from '../../../interfaces/User'
import Conversation from '../../../interfaces/Conversation'
import Message from '../../../interfaces/Message'
import { getFileUrl } from '../../../utils/laravel_storage'

interface MessageListProps {
  messages: Message[]
  user: User
  selectedConversation: Conversation
  chatContainerRef: React.RefObject<HTMLDivElement>
}

export default function MessageList({
  messages,
  user,
  selectedConversation,
  chatContainerRef
}: MessageListProps) {
  const { t } = useTranslation()

  return (
    <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((msg: Message) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${msg.sender_id != user?.id ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender_id == user?.id ? 'bg-green-100 text-green-800' : 'bg-blue-100  text-blue-800'}`}>
            {msg.reply_message && (
              <div className="bg-gray-200 p-2 rounded mb-2 text-xs">
                <p className="font-semibold">{msg.reply_message.sender_id == selectedConversation.creator.id ? selectedConversation.creator.name : selectedConversation.receiver.name}</p>
                <p>{msg.reply_message.content}</p>
              </div>
            )}
            <p className="font-semibold text-sm">{msg.sender_id == user?.id ? t('conversationsPage.you') : msg.sender_id == selectedConversation.creator.id ? selectedConversation.creator.name : selectedConversation.receiver.name}</p>
            {msg.message_type == 'image' ? (
              <img aria-hidden="true" loading='lazy' src={getFileUrl(msg.image_url ?? '')} alt={t('conversationsPage.uploadedImage')} className="w-full h-auto rounded-lg mt-2 mb-2" />
            ) : (
              <p className="text-sm">{msg.content}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">{moment(msg.created_at).format('hh:mm A')}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}