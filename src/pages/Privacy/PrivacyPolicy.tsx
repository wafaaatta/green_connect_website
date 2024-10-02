import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaLeaf, FaHandshake, FaUserShield, FaBalanceScale, FaSeedling, FaRecycle, FaGlobeAmericas, FaTree, FaShieldAlt } from 'react-icons/fa'

const PolicyPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaLeaf className="w-24 h-24 text-green-700 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-green-800 mb-4">{t('policyPage.title')}</h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">{t('policyPage.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PolicySection
            title={t('policyPage.communityGuidelines.title')}
            icon={<FaHandshake size={40} className=" text-green-700" />}
            content={t('policyPage.communityGuidelines.content', { returnObjects: true }) as string[]}
          />

          <PolicySection
            title={t('policyPage.privacyPolicy.title')}
            icon={<FaUserShield size={40} className=" text-green-700" />}
            content={t('policyPage.privacyPolicy.content', { returnObjects: true }) as string[]}
          />

          <PolicySection
            title={t('policyPage.rightsObligations.title')}
            icon={<FaBalanceScale size={40} className=" text-green-700" />}
            content={t('policyPage.rightsObligations.content', { returnObjects: true }) as string[]}
          />

          <PolicySection
            title={t('policyPage.sustainabilityCommitment.title')}
            icon={<FaGlobeAmericas size={40} className=" text-green-700" />}
            content={t('policyPage.sustainabilityCommitment.content', { returnObjects: true }) as string[]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-8">{t('policyPage.greenPledge.title')}</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <PledgeItem icon={<FaSeedling className="w-16 h-16 text-green-700 mb-4" />} text={t('policyPage.greenPledge.biodiversity')} />
            <PledgeItem icon={<FaRecycle className="w-16 h-16 text-green-700 mb-4" />} text={t('policyPage.greenPledge.sustainablePractices')} />
            <PledgeItem icon={<FaTree className="w-16 h-16 text-green-700 mb-4" />} text={t('policyPage.greenPledge.environmentalEducation')} />
            <PledgeItem icon={<FaShieldAlt className="w-16 h-16 text-green-700 mb-4" />} text={t('policyPage.greenPledge.userDataProtection')} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 bg-green-100 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-4">{t('policyPage.importantNotice.title')}</h2>
          <p className="text-green-700 mb-4">
            {t('policyPage.importantNotice.content')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

const PolicySection: React.FC<{ title: string; icon: React.ReactNode; content: string[] }> = ({ title, icon, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow rounded p-4"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-bold text-green-800 ml-4">{title}</h2>
    </div>
    <ul className="space-y-4">
      {content.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-start"
        >
          <FaLeaf className="w-5 h-5 text-green-700 mr-3 mt-1 flex-shrink-0" />
          <span className="text-green-700">{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
)

const PledgeItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-xl font-semibold text-green-700">{text}</p>
  </div>
)

export default PolicyPage