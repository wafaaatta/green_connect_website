interface Announce {
    id: number
    title: string
    description: string
    location: string
    image: string
    status: 'pending' | 'accepted' | 'rejected'
}

export default Announce