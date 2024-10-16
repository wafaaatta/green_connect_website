import { motion } from 'framer-motion'
import { MapPin, Badge, FolderTree } from 'lucide-react'
import Button from '../../../components/Button'
import { Card } from '../../../components/Card'
import { useTranslation } from 'react-i18next'
import Announce from '../../../interfaces/Announce'
import { FC } from 'react'
import { getFileUrl } from '../../../utils/laravel_storage'

interface AnnounceComponentProps {
    announce: Announce
    navigateToAnnounceDetails: (announce: Announce) => void
}

const AnnounceComponent: FC<AnnounceComponentProps> = ({
    announce, navigateToAnnounceDetails
}) => {
    const { t } = useTranslation()
    return (
        <motion.div
            key={announce.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateToAnnounceDetails(announce)}
        >
            <Card
                className="h-full cursor-pointer transition-shadow duration-300 bg-green-100"
            >
                <img
                    src={getFileUrl(announce.image)}
                    alt={announce.title}
                    className="w-full rounded-t object-cover"
                />
                <div className="mt-2">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">{announce.title}</h2>
                    <div className="flex items-center mb-2 text-green-800">
                        <MapPin size={16} className="mr-1" />
                        <span>{announce.city}, {announce.postal_code}</span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-green-800">
                        <FolderTree size={16} className="mr-1" />
                        <span> {announce.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                            {new Date(announce.created_at).toLocaleDateString()}
                        </span>
                        <Button aria-label="View details" size="sm" className="bg-green-800 hover:bg-green-700 text-white">{t('postsPage.viewDetails')}</Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export default AnnounceComponent