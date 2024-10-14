import React from 'react'
import { Send, X, Reply, ImageIcon, Text } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Message from '../../../interfaces/Message'

interface MessageInputProps {
  message: string
  setMessage: (message: string) => void
  replyTo: Message | null
  setReplyTo: (message: Message | null) => void
  imagePreview: string | null
  setImagePreview: (preview: string | null) => void
  handleSendMessage: (e: React.FormEvent) => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement>
  fileInputRef: React.RefObject<HTMLInputElement>
}

export default function MessageInput({
  message,
  setMessage,
  replyTo,
  setReplyTo,
  imagePreview,
  setImagePreview,
  handleSendMessage,
  handleFileUpload,
  fileInputRef
}: MessageInputProps) {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-gray-200">
      {replyTo && (
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
          <div className="flex items-center">
            <Reply size={16} className="mr-2 text-gray-600" />
            <span className="text-sm text-gray-600">{replyTo.content}</span>
          </div>
          <Button aria-label="Close modal" variant="ghost" onClick={() => setReplyTo(null)}>
            <X size={16} />
          </Button>
        </div>
      )}
      {imagePreview && (
        <div className="relative mb-2">
          <img loading='lazy' src={imagePreview} alt={t('conversationsPage.preview')} className="w-20 h-20 object-cover rounded" />
          <Button
            aria-label="Close modal"
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
            aria-label="Type your message"
            icon={Text as IconType}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('conversationsPage.typeYourMessage')}
          />
        </div>
        <Button
          aria-label="Send message"
          variant="outline"
          size='md'
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={20} />
        </Button>
        <input
          aria-label="File upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <Button aria-label="Send message" type="submit" size='md'>
          <Send size={20} />
        </Button>
      </div>
    </form>
  )
}