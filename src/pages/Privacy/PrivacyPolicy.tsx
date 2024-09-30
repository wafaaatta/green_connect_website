import React from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaHandshake, FaUserShield, FaBalanceScale, FaSeedling, FaRecycle, FaGlobeAmericas, FaTree, FaShieldAlt } from 'react-icons/fa'

const PolicyPage: React.FC = () => {
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
          <h1 className="text-5xl font-extrabold text-green-800 mb-4">GreenConnect Policies</h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">Nurturing a safe, sustainable, and thriving community of plant enthusiasts while protecting our users and the environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PolicySection
            title="Community Guidelines"
            icon={<FaHandshake size={40} className=" text-green-700" />}
            content={[
              "Respect all members of the GreenConnect community, regardless of their experience level or background.",
              "Share knowledge, experiences, and tips openly to help others grow in their plant care journey.",
              "Avoid promotional or spam content that doesn't contribute to meaningful discussions.",
              "Report any inappropriate behavior, harassment, or content that violates our guidelines.",
              "Be patient, supportive, and encouraging, especially with new plant enthusiasts.",
              "Use inclusive language and avoid discriminatory comments or posts.",
              "Give credit when sharing others' content or photos.",
              "Engage in constructive discussions and provide helpful feedback when possible."
            ]}
          />

          <PolicySection
            title="Privacy Policy"
            icon={<FaUserShield size={40} className=" text-green-700" />}
            content={[
              "We collect minimal personal information necessary for account creation and platform functionality.",
              "Your plant data and personal information are kept confidential and never sold to third parties.",
              "You can request the deletion of your account and associated data at any time through our support channels.",
              "We use cookies to enhance your browsing experience and provide personalized content.",
              "We may send occasional emails about important updates, new features, or community events. You can opt-out at any time.",
              "Your profile information is visible to other users by default, but you can adjust your privacy settings.",
              "We use industry-standard security measures to protect your data from unauthorized access.",
              "In case of a data breach, we will notify affected users promptly and take necessary steps to secure the platform."
            ]}
          />

          <PolicySection
            title="Vos droits et obligations"
            icon={<FaBalanceScale size={40} className=" text-green-700" />}
            content={[
              "Droit d'accès et de rectification de vos données personnelles à tout moment.",
              "Obligation de respecter les droits d'auteur des contenus partagés sur la plateforme.",
              "Droit à la suppression de votre compte et de vos données, conformément aux lois en vigueur.",
              "Obligation de ne pas utiliser la plateforme à des fins illégales ou nuisibles.",
              "Droit de contester toute décision automatisée vous concernant et de demander une intervention humaine.",
              "Obligation de maintenir la confidentialité de vos informations de connexion.",
              "Droit à la portabilité de vos données vers d'autres services, dans la mesure du possible.",
              "Obligation de signaler tout contenu inapproprié ou violation des conditions d'utilisation."
            ]}
          />

          <PolicySection
            title="Sustainability Commitment"
            icon={<FaGlobeAmericas size={40} className=" text-green-700" />}
            content={[
              "We use eco-friendly hosting solutions powered by 100% renewable energy for our servers.",
              "Our office operations are carbon-neutral, utilizing energy-efficient equipment and practices.",
              "We organize annual tree-planting events in local communities to offset our carbon footprint.",
              "We actively promote sustainable gardening practices through educational content and workshops.",
              "We partner with organizations dedicated to biodiversity conservation and environmental protection.",
              "Our merchandise is made from sustainable materials and shipped using eco-friendly packaging.",
              "We encourage users to trade or donate plants locally to reduce transportation emissions.",
              "We're committed to continuous improvement in our sustainability efforts and welcome user suggestions."
            ]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-8">Our Green Pledge</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <PledgeItem icon={<FaSeedling className="w-16 h-16 text-green-700 mb-4" />} text="Promote Biodiversity" />
            <PledgeItem icon={<FaRecycle className="w-16 h-16 text-green-700 mb-4" />} text="Sustainable Practices" />
            <PledgeItem icon={<FaTree className="w-16 h-16 text-green-700 mb-4" />} text="Environmental Education" />
            <PledgeItem icon={<FaShieldAlt className="w-16 h-16 text-green-700 mb-4" />} text="User Data Protection" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 bg-green-100 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-4">Important Notice</h2>
          <p className="text-green-700 mb-4">
            By using GreenConnect, you agree to abide by these policies and contribute to our growing, eco-conscious community. We reserve the right to update these policies as needed to ensure the best experience for all users and to comply with changing regulations.
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