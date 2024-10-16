import { FC } from "react"
import Event from "../../../interfaces/Event"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { getFileUrl } from "../../../utils/laravel_storage"

interface HomeEventComponentProps {
    event: Event
}

const HomeEventComponent: FC<HomeEventComponentProps> = ({ event }) => {
    return (
        <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-green-100 rounded overflow-hidden shadow border transition-shadow duration-300"
        >
            <img aria-hidden="true" loading='lazy' src={getFileUrl(event.image)} alt={event.title} className="w-full  object-cover" />
            <div className="p-4">
                <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-800" />
                    {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-green-800" />
                    {event.location}
                </p>
            </div>
        </motion.div>
    )
}

export default HomeEventComponent