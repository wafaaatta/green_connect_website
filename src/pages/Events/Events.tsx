import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MapPin, Calendar, X, User, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllEvents } from '../../redux/stores/event_store'
import Event from '../../interfaces/Event'
import { Card } from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { IconType } from 'react-icons'

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
      <div className="z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center max-md:items-start  space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="text-3xl font-bold text-green-800 max-md:text-center max-md:w-full">{t('eventsPage.title')}</h1>
            <div className="flex justify-between flex-grow items-center gap-4 max-md:w-full">
              <div className="w-full">
                <Input
                  icon={Search as IconType}
                  placeholder={t('eventsPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Select
                  icon={Filter as IconType}
                  value={sortBy}
                  onChange={(value) => setSortBy(value as string)}
                  options={[
                    { value: 'upcoming', label: t('eventsPage.sortUpcoming') },
                    { value: 'latest', label: t('eventsPage.sortLatest') },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          <motion.div layout className="space-y-4">
            {paginatedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => openEventDetails(event)}
              >
                <Card 
                  className="shadow transition-shadow duration-300 bg-green-100"
                >
                  <div className="flex flex-col md:flex-row ">
                    <img 
                      src={'/assets/images/plants-workshop/workshop-group.jpg'} 
                      alt={event.title} 
                      className="w-full md:w-48 h-48 object-cover rounded-t md:rounded-l md:rounded-t-none" 
                    />
                    <div className="flex-grow md:ml-4 max-md:mt-4">
                      <h2 className="text-3xl font-semibold mb-2 text-green-800">{event.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center text-green-800">
                          <Calendar size={18} className="mr-2" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-green-800">
                          <MapPin size={18} className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <Button className="bg-green-800 hover:bg-green-700 text-white">{t('eventsPage.viewDetails')}</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeEventDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={'/assets/images/plants-workshop/workshop-group.jpg'} 
                  alt={selectedEvent.title} 
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeEventDetails}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-green-800">{selectedEvent.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-green-800">
                    <Calendar size={20} className="mr-2" />
                    <span>{new Date(selectedEvent.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <MapPin size={20} className="mr-2" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <User size={20} className="mr-2" />
                    <span>{selectedEvent.organized_by}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <Mail size={20} className="mr-2" />
                    <span>{selectedEvent.organizer_email}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventsPage