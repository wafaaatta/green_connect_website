import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const GreenConnectNotice = () => {
    const { t } = useTranslation()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-20 bg-green-100 rounded-lg p-4"
        >
            <h2 className="text-2xl font-bold text-green-800 mb-4 heading-font">{t('policyPage.importantNotice.title')}</h2>
            <p className="text-green-800 mb-4 body-font">
                {t('policyPage.importantNotice.content')}
            </p>
        </motion.div>
    )
}

export default GreenConnectNotice