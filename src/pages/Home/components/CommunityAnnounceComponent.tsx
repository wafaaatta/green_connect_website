import { FC } from "react"
import Announce from "../../../interfaces/Announce"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface CommunityAnnounceComponentProps {
    announce: Announce
}
const CommunityAnnounceComponent: FC<CommunityAnnounceComponentProps> = ({ announce }) => {
    const { t } = useTranslation()
    return (
        <motion.div
            key={announce.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded overflow-hidden shadow border border-shadow duration-300"
        >
            <img  aria-hidden="true" loading='lazy' src={'/src/assets/images/plants/bamboo.png'} alt={announce.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">{announce.title}</h3>
                <p className="text-gray-600">{t('homePage.by')} {announce?.user?.name}</p>
            </div>
        </motion.div>
    )
}

export default CommunityAnnounceComponent