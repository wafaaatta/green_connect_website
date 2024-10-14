import { motion } from 'framer-motion'
import { FaSeedling, FaRecycle, FaTree, FaShieldAlt } from 'react-icons/fa'
import PledgeItem from './BledgeItem'
import { useTranslation } from 'react-i18next'

const Bledges = () => {
    const { t } = useTranslation()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-20 text-center"
        >
            <h2 className="text-3xl font-bold text-green-800 mb-8">{t('policyPage.greenPledge.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <PledgeItem icon={<FaSeedling className="w-16 h-16 text-green-800 mb-4" />} text={t('policyPage.greenPledge.biodiversity')} />
                <PledgeItem icon={<FaRecycle className="w-16 h-16 text-green-800 mb-4" />} text={t('policyPage.greenPledge.sustainablePractices')} />
                <PledgeItem icon={<FaTree className="w-16 h-16 text-green-800 mb-4" />} text={t('policyPage.greenPledge.environmentalEducation')} />
                <PledgeItem icon={<FaShieldAlt className="w-16 h-16 text-green-800 mb-4" />} text={t('policyPage.greenPledge.userDataProtection')} />
            </div>
        </motion.div>
    )
}

export default Bledges