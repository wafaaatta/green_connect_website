import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllEvents } from '../../redux/stores/event_store'
import Event from '../../interfaces/Event'
import Button from '../../components/Button'
import EventComponent from './components/EventComponent'
import EventDetailsComponent from './components/EventDetailsComponent'
import EventActionbar from './components/EventActionbar'

const ITEMS_PER_PAGE = 10

const EventsPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { events } = useAppSelector(state => state.event_store)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('upcoming')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'upcoming') return new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    if (sortBy === 'latest') return new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    return 0
  })

  const paginatedEvents = sortedEvents.slice(0, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setHasMore(paginatedEvents.length < sortedEvents.length)
  }, [paginatedEvents, sortedEvents])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event)
  }

  const closeEventDetails = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="w-full min-h-screen">
      <EventActionbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          <motion.div layout className="space-y-4">
            {paginatedEvents.map((event) => <EventComponent event={event} openEventDetails={openEventDetails} />)}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              aria-label="Load more"
              size="lg"
              onClick={loadMore}
              className="px-8 py-3 bg-green-800 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t('eventsPage.loadMore')}
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsComponent event={selectedEvent} closeEventDetails={closeEventDetails} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventsPage