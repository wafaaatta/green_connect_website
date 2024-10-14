import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, X, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import Button from '../../../components/Button'
import PusherBroadcasts from '../../../constants/pusher_broadcasts'
import ApiError from '../../../interfaces/ApiError'
import Conversation from '../../../interfaces/Conversation'
import Message from '../../../interfaces/Message'
import { subscribeToChannel, unsubscribeFromChannel } from '../../../services/pusher'
import axiosHttp from '../../../utils/axios_client'
import { getFileUrl } from '../../../utils/laravel_storage'
import User from '../../../interfaces/User'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

interface ChatAreaProps {
  selectedConversation: Conversation | null
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isSideMenuOpen: boolean
  setIsSideMenuOpen: (isOpen: boolean) => void
  isConversationListOpen: boolean
  setIsConversationListOpen: (isOpen: boolean) => void
  isMobile: () => boolean
  user: User
}

export default function ChatArea({
  selectedConversation,
  messages,
  setMessages,
  isSideMenuOpen,
  setIsSideMenuOpen,
  setIsConversationListOpen,
  isMobile,
  user
}: ChatAreaProps) {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  useEffect(() => {
    if (selectedConversation) {
      const channel = PusherBroadcasts.channels.message_creation
      const event = PusherBroadcasts.events.messages.created

      subscribeToChannel(channel, event, (data) => {
        if ((data as { message: Message }).message.conversation_id == selectedConversation?.id) {
          setMessages(prevMessages => [...prevMessages, (data as { message: Message }).message])
        }
      })

      return () => {
        unsubscribeFromChannel(channel)
      }
    }
  }, [selectedConversation, setMessages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

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

  if (!selectedConversation) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <img aria-hidden="true" loading='lazy' src="/assets/green_connect.png" alt={t('conversationsPage.defaultPlant')} className=" h-32 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2 heading-font">{t('conversationsPage.noConversationSelected')}</h2>
          <p className="text-gray-500 body-font">{t('conversationsPage.chooseConversation')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-grow flex flex-col">
      <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
        {isMobile() && (
          <Button
            aria-label="Back"
            variant="ghost"
            onClick={() => setIsConversationListOpen(true)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center space-x-3">
          <img loading='lazy' src={getFileUrl(selectedConversation.announce.image)} alt={selectedConversation.announce.title} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-semibold text-green-800">{selectedConversation.announce.title}</h2>
            <p className="text-sm text-gray-600">{t('conversationsPage.with')} {user?.id == selectedConversation.creator.id ? selectedConversation.receiver.name : selectedConversation.creator.name}</p>
          </div>
        </div>
        <Button
          aria-label="Menu"
          variant="ghost"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          {isSideMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <MessageList
        messages={messages}
        user={user}
        selectedConversation={selectedConversation}
        chatContainerRef={chatContainerRef}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleSendMessage={handleSendMessage}
        handleFileUpload={handleFileUpload}
        inputRef={inputRef}
        fileInputRef={fileInputRef}
      />
    </div>
  )
}