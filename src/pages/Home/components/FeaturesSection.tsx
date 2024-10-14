import { motion } from "framer-motion"
import { Leaf, Users, Calendar, BookOpen } from "lucide-react"
import { useTranslation } from "react-i18next"

const FeaturesSection = () => {
    const {t} = useTranslation()
  return (
    <section className="py-12">
        <div className=" mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">{t('homePage.featuresTitle')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
             { icon: Leaf, title: t('homePage.feature1Title'), description: t('homePage.feature1Description') },
             { icon: Users, title: t('homePage.feature2Title'), description: t('homePage.feature2Description') },
             { icon: Calendar, title: t('homePage.feature3Title'), description: t('homePage.feature3Description') },
             { icon: BookOpen, title: t('homePage.feature4Title'), description: t('homePage.feature4Description') },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-green-100 p-4 border rounded shadow transition-shadow duration-300"
              >
                <feature.icon size={48} className="text-green-800 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-md">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection