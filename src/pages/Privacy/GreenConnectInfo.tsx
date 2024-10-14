import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaHandshake, FaUserShield, FaBalanceScale, FaGlobeAmericas } from 'react-icons/fa'
import GreenSection from './components/GreenSection'
import Bledges from './components/Bledges'
import GreenConnectNotice from './components/GreenConnectNotice'
import GreenHero from './components/GreenHero'

const PolicyPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <GreenHero />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GreenSection
            title={t('policyPage.communityGuidelines.title')}
            icon={<FaHandshake size={40} className=" text-green-800" />}
            content={t('policyPage.communityGuidelines.content', { returnObjects: true }) as string[]}
          />

          <GreenSection
            title={t('policyPage.privacyPolicy.title')}
            icon={<FaUserShield size={40} className=" text-green-800" />}
            content={t('policyPage.privacyPolicy.content', { returnObjects: true }) as string[]}
          />

          <GreenSection
            title={t('policyPage.rightsObligations.title')}
            icon={<FaBalanceScale size={40} className=" text-green-800" />}
            content={t('policyPage.rightsObligations.content', { returnObjects: true }) as string[]}
          />

          <GreenSection
            title={t('policyPage.sustainabilityCommitment.title')}
            icon={<FaGlobeAmericas size={40} className=" text-green-800" />}
            content={t('policyPage.sustainabilityCommitment.content', { returnObjects: true }) as string[]}
          />
        </div>

        <Bledges />

        <GreenConnectNotice />
      </motion.div>
    </div>
  )
}





export default PolicyPage