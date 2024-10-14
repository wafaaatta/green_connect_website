import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, MapPin, SignpostIcon, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Button from '../../../components/Button'
import Conversation from '../../../interfaces/Conversation'
import { getFileUrl } from '../../../utils/laravel_storage'

interface SideMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedConversation: Conversation | null
  isMobile: () => boolean
}

export default function SideMenu({
  isOpen,
  setIsOpen,
  selectedConversation,
  isMobile
}: SideMenuProps) {
  const { t } = useTranslation()

  if (!selectedConversation) return null

  return (
    <AnimatePresence>
      {isOpen && (
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
                aria-label="Close modal"
                variant="ghost"
                className="absolute top-4 left-4"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            <h3 className="text-lg font-semibold mb-4 text-center">{t('conversationsPage.plantDetails')}</h3>
            <img aria-hidden="true" loading='lazy' src={getFileUrl(selectedConversation.announce.image)} alt={selectedConversation.announce.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="font-semibold text-center">{selectedConversation.announce.title}</h4>
            <p className="text-sm text-gray-600 mb-4 text-center">{t('conversationsPage.owner')}: {selectedConversation.receiver.name}</p>
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
  )
}