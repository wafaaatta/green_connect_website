import { FC } from "react"
import Event from "../../../interfaces/Event"
import Button from "../../../components/Button"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card } from "../../../components/Card"
import { getFileUrl } from "../../../utils/laravel_storage"
import { useTranslation } from "react-i18next"

interface EventComponentProps {
    event: Event,
    openEventDetails: (event: Event) => void
}

const EventComponent:FC<EventComponentProps> = ({ event, openEventDetails }) => {
    const { t } = useTranslation()
  return (
    <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => openEventDetails(event)}
              >
                <Card
                  className="shadow transition-shadow duration-300 bg-green-100"
                >
                  <div className="flex flex-col md:flex-row ">
                    <img
                      aria-hidden="true"
                      loading='lazy'
                      src={getFileUrl(event.image)}
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
                      <Button aria-label="View details" className="bg-green-800 hover:bg-green-700 text-white">{t('eventsPage.viewDetails')}</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
  )
}

export default EventComponent