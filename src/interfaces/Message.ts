import User from "./User"

interface Message {
    id: number
    sender: User
    content: string
    message_type: 'text' | 'image',
    image_url?: string
}

export default Message