interface Events {
    id: number
    title: string
    description: string
    location: string
    image: string
    organized_by: string
    event_date: string
    status: 'pending' | 'accepted' | 'rejected'
}

export default Events