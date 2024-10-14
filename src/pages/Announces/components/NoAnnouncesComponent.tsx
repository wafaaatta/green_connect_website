import { motion } from "framer-motion"
import Button from "../../../components/Button"
import { useTranslation } from "react-i18next"
import { FC } from "react"

interface NoAnnouncesComponentProps {
    resetFilters: () => void
}

const NoAnnouncesComponent: FC<NoAnnouncesComponentProps> = ({ resetFilters }) => {
    const { t } = useTranslation()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
        >
            <p className="text-xl text-gray-700">{t('postsPage.noPlants')}</p>
            <Button aria-label="Reset filters" className="mt-4 bg-green-800 rounded px-2 py-2 hover:bg-green-700 text-white" onClick={resetFilters}>{t('postsPage.resetFilters')}</Button>
        </motion.div>
    )
}

export default NoAnnouncesComponent