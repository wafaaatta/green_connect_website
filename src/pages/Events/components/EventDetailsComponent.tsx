import { motion } from "framer-motion"
import { X, Calendar, MapPin, User, Mail } from "lucide-react"
import { FC } from "react"
import Event from "../../../interfaces/Event"

interface EventDetailsComponentProps {
    event: Event
    closeEventDetails: () => void
}

const EventDetailsComponent: FC<EventDetailsComponentProps> = ({
  event,
  closeEventDetails,
}) => {
  return (
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
                  aria-hidden="true"
                  loading='lazy'
                  src={'/assets/images/plants-workshop/workshop-group.jpg'}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  aria-label="Close modal"
                  type="button"
                  onClick={closeEventDetails}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-green-800">{event.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-green-800">
                    <Calendar size={20} className="mr-2" />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <MapPin size={20} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <User size={20} className="mr-2" />
                    <span>{event.organized_by}</span>
                  </div>
                  <div className="flex items-center text-green-800">
                    <Mail size={20} className="mr-2" />
                    <span>{event.organizer_email}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{event.description}</p>
              </div>
            </motion.div>
          </motion.div>
  )
}

export default EventDetailsComponent