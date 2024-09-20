import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Leaf, DollarSign, Share2 } from 'lucide-react'
import AppImages from '../../../constants/app_images'

const EventDetailsPage = () => {
  const event = {
    id: 1,
    title: 'Annual Exotic Plant Exhibition and Sale',
    date: '2023-07-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Botanical Gardens, 1234 Green Street, Plantville, PL 12345',
    attendees: 500,
    image: AppImages.visuals.background,
    description: 'Join us for the most anticipated plant event of the year! Our Annual Exotic Plant Exhibition and Sale brings together plant enthusiasts, collectors, and experts from around the world. Discover rare and unique plant species, attend expert talks, and participate in hands-on workshops.',
    organizer: 'Plantville Horticultural Society',
    price: 25,
    tags: ['Exotic Plants', 'Exhibition', 'Workshops', 'Plant Sale']
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-md shadow-md overflow-hidden"
      >
        <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
        <div className="p-4">
          <h1 className="text-3xl font-bold text-green-800 mb-4">{event.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-5 w-5 text-green-700" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2 h-5 w-5 text-green-700" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5 text-green-700" />
                <span>{event.location}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Leaf className="mr-2 h-5 w-5 text-green-700" />
                <span>Organized by {event.organizer}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="mr-2 h-5 w-5 text-green-700" />
                <span>${event.price} per person</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-8">{event.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {event.tags.map(tag => (
              <span key={tag} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            
            <button className="text-green-700 hover:text-green-800 flex items-center">
              <Share2 className="mr-2 h-5 w-5" />
              Share Event
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EventDetailsPage