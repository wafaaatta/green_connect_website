import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import AppImages from '../../constants/app_images'
import Routes from '../../constants/routes'

const EventsPage = () => {
  const events = [
    { id: 1, title: 'Annual Plant Swap Meet', date: '2023-06-15', time: '10:00 AM - 2:00 PM', location: 'Central Park, New York', attendees: 150, image: AppImages.visuals.background },
    { id: 2, title: 'Succulent Care Workshop', date: '2023-06-20', time: '6:00 PM - 8:00 PM', location: 'Green Thumb Nursery, Los Angeles', attendees: 30, image: AppImages.visuals.background },
    { id: 3, title: 'Bonsai Masterclass', date: '2023-06-25', time: '11:00 AM - 3:00 PM', location: 'Japanese Garden, San Francisco', attendees: 20, image: AppImages.visuals.background },
    { id: 4, title: 'Indoor Jungle Design Seminar', date: '2023-07-01', time: '2:00 PM - 5:00 PM', location: 'Botanical Gardens, Chicago', attendees: 50, image: AppImages.visuals.background },
  ]

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Upcoming Green Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-md shadow-md overflow-hidden flex"
          >
            <img src={event.image} alt={event.title} className="w-1/3 object-cover" />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              <div className="flex justify-end">
              <a href={Routes.PAGES.EVENT_DETAILS} className="cursor-pointer mt-4 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                </a>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">
                    Register Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage