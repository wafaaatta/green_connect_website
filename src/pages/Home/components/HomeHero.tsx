import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Routes from "../../../constants/routes"
import { useTranslation } from "react-i18next"

const HomeHero = () => {
    const { t } = useTranslation()
  return (
    <section className="relative bg-gradient-to-r from-green-500 to-green-800 text-white overflow-hidden">
        <div className='inset-0 absolute w-full h-full bg-gray-900 opacity-50'></div>
        <div className=" mx-auto px-4 py-12 relative mr-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                className="text-4xl md:text-7xl font-bold mb-6 heading-font"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t('homePage.heroTitle')}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 body-font"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('homePage.heroSubtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                    aria-label={t('homePage.joinCommunityAriaLabel')}
                  to={Routes.PAGES.ABOUT}
                  className="bg-white text-green-800 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-100 transition duration-300 inline-block"
                >
                  {t('homePage.joinCommunity')}
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                aria-label={t('homePage.heroImageAlt')}
                loading='lazy'
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt={t('homePage.heroImageAlt')}
                className="rounded shadow"
              />
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default HomeHero