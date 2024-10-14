import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Conversation from '../../../interfaces/Conversation'
import { getFileUrl } from '../../../utils/laravel_storage'

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  setSelectedConversation: (conversation: Conversation) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: () => boolean
}

export default function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
  isOpen,
  isMobile
}: ConversationListProps) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {(isOpen || !isMobile()) && (
        <motion.div
          initial={{ x: isMobile() ? -300 : 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isMobile() ? -300 : 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0"
        >
          <h1 className="text-xl heading-font font-bold text-green-800 p-4 border-b border-gray-200">{t('conversationsPage.yourConversations')}</h1>
          {conversations.map((conversation: Conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-green-50' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center space-x-3">
                <img aria-hidden="true" loading='lazy' src={getFileUrl(conversation.announce?.image)} alt={conversation.announce?.title} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-grow">
                  <h2 className="text-sm font-semibold text-green-700">{conversation.announce?.title}</h2>
                  <p className="text-xs text-gray-600">{t('conversationsPage.with')} {conversation.receiver?.name}</p>
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
  )
}