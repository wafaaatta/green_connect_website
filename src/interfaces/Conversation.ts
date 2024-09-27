import Announce from "./Announce"
import User from "./User"

interface Conversation {
    id: number
    sender: User
    receiver: User
    last_message: string
    last_sent_at: string
    last_sender_id: number

    announce: Announce
}

export default Conversation