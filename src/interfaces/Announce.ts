import User from "./User"

interface Announce {
    id: number
    title: string
    description: string
    location: string
    image: string
    status: 'pending' | 'accepted' | 'rejected'

    user: User
}

export default Announce