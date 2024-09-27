interface Message {
    id: number
    sender: string
    content: string
    message_type: 'text' | 'image',
    image_url?: string
}

export default Message