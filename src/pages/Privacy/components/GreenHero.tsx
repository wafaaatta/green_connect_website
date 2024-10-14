import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaLeaf } from 'react-icons/fa'

const GreenHero = () => {
    const { t } = useTranslation()
  return (
    <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaLeaf className="w-24 h-24 text-green-800 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-green-800 mb-4 heading-font">{t('policyPage.title')}</h1>
          <p className="text-xl text-green-800 max-w-3xl mx-auto body-font">{t('policyPage.subtitle')}</p>
        </div>
  )
}

export default GreenHero