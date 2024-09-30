import User from "./User"

interface Message {
    id: number
    sender: User
    content: string
    message_type: 'text' | 'image',
    image_url?: string
    conversation_id: number
    reply_message: Message | null
    sender_id: number
    created_at: string
}

export default Message