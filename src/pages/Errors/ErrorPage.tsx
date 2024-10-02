import React from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AppImages from '../../constants/app_images'

interface ErrorPageProps {
  statusCode: 404 | 500
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  const { t } = useTranslation()
  const is404 = statusCode === 404

  const title = is404 ? t('errorPage.notFoundTitle') : t('errorPage.serverErrorTitle')
  const description = is404
    ? t('errorPage.notFoundDescription')
    : t('errorPage.serverErrorDescription')
  const imageSrc = is404
    ? AppImages.errors.notFound
    : AppImages.errors.serverError

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            className="mx-auto h-60 w-auto"
            src={imageSrc}
            alt={t('errorPage.imageAlt', { statusCode })}
          />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm text-white bg-green-700 hover:bg-green-900"
          >
            <Home className="mr-2 h-5 w-5" />
            {t('errorPage.returnHome')}
          </motion.button>
          {!is404 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              {t('errorPage.tryAgain')}
            </motion.button>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="mt-4 text-sm text-gray-600">
            {is404 ? (
              <>
                {t('errorPage.contactSupportPrefix')}{' '}
                <a href="/contact" className="font-medium text-green-700 hover:text-green-900">
                  {t('errorPage.contactSupport')}
                </a>
                {t('errorPage.contactSupportSuffix')}
              </>
            ) : (
              t('errorPage.apology')
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ErrorPage