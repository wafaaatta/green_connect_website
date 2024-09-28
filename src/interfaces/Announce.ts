import User from "./User"

interface Announce {
    id: number
    title: string
    description: string
    country: string
    city: string
    postal_code: string
    image: string
    status: 'pending' | 'accepted' | 'rejected'
    created_at: string

    user: User
}

export default Announce